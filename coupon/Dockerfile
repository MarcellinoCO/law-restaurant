FROM python:3.11.0

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code/app

CMD ["uvicorn", "app.CouponService:app", "--host", "0.0.0.0", "--port", "5433"]