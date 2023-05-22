# Order Service

🍱 Order service built with FastAPI.

## Features

- Create, read, and delete Orders

## Setup

1. Clone the repository:

```
git clone https://gitlab.cs.ui.ac.id/evan.aurelrius/law-order-service
```

2. Change to the project directory:

```
cd law-order-service
```

3. Start service:

```
python manage.py runserver
```

The API should now be running on `http://localhost:8000`.

## API Documentation

API documentation is auto generated using swagger and can be accessed on `http://localhost:8000/api/docs/`.

## Usage

### Get all Order

```
GET /order/
```

### Create an Order

```
POST /order/
```

### Get Order by id

```
GET /order/:id/
```

### Update Order by id

```
PUT /order/:id/
```

### Update Order partially by id

```
PATCH /order/:id/
```

### Cancel Order by id

```
DELETE /order/:id/
```