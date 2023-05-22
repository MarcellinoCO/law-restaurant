from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import asyncpg
from typing import Optional
from asyncpg.exceptions import UniqueViolationError


app = FastAPI()


class Coupon(BaseModel):
    code: str
    amount: int
    is_redeemed: Optional[bool] = False


class CouponCreate(BaseModel):
    code: str
    amount: int


async def connect_to_db():
    conn = await asyncpg.connect(user="postgres", password="admin",
                                 database="law_coupon_service", host="coupon-db",
                                 port="5432")
    return conn


async def get_coupon(conn, code: str):
    query = "SELECT * FROM coupons WHERE code = $1;"
    result = await conn.fetchrow(query, code)
    if result is None:
        raise HTTPException(status_code=404, detail="Coupon not found")
    coupon = Coupon(code=result[0], amount=result[1], is_redeemed=result[2])
    return coupon


async def redeem_coupon(conn, code: str):
    query = "UPDATE coupons SET is_redeemed = true WHERE code = $1 AND NOT is_redeemed;"
    result = await conn.execute(query, code)
    if result == "UPDATE 0":
        raise HTTPException(
            status_code=404, detail="Coupon already redeemed or not found")


@app.on_event("startup")
async def startup():
    app.state.db = await connect_to_db()
    # create table if not exists
    query = "CREATE TABLE IF NOT EXISTS coupons (code VARCHAR(255) PRIMARY KEY, amount INT NOT NULL, is_redeemed BOOLEAN NOT NULL DEFAULT false);"
    await app.state.db.execute(query)


@app.on_event("shutdown")
async def shutdown():
    await app.state.db.close()


@app.post("/coupons", response_model=CouponCreate)
async def create_coupon_api(coupon_create: CouponCreate, conn=Depends(connect_to_db)):
    query = "INSERT INTO coupons (code, amount) VALUES ($1, $2) RETURNING code, amount, is_redeemed;"
    try:
        result = await conn.fetchrow(query, coupon_create.code, coupon_create.amount)
    except UniqueViolationError:
        raise HTTPException(
            status_code=400, detail="Coupon code already exists")
    coupon = CouponCreate(code=result[0], amount=result[1])
    return coupon


@app.get("/coupons/{code}", response_model=Coupon)
async def get_coupon_api(code: str, conn=Depends(connect_to_db)):
    return await get_coupon(conn, code)


@app.put("/coupons/redeem/{code}")
async def redeem_coupon_api(code: str, conn=Depends(connect_to_db)):
    await redeem_coupon(conn, code)
    return {"message": "Coupon redeemed successfully"}
