# Coupons Service

🍱 Coupon service built with FastAPI.

## Features

- Create, read, and redeem coupons

## Setup

1. Clone the repository:

```
git clone https://gitlab.cs.ui.ac.id/evan.aurelrius/law-coupon-service
```

2. Change to the project directory:

```
cd law-coupon-service
```

3. Start service:

```
uvicorn CouponService:app --reload --port 8080
```

The API should now be running on `http://localhost:8080`.

## API Documentation

API documentation is auto generated and can be accessed on `http://localhost:8080/docs`.

## Usage

### Create a Menu Item

```
POST /coupons
```

### Get Coupons by Code

```
GET /coupons/:code
```

### Redeem Coupons

```
PUT /coupons/redeem/:code
```