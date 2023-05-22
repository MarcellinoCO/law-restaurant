# Setup

1. Clone the repository:

```
git clone https://gitlab.cs.ui.ac.id/virdian.harun/law-orchestrator.git
```

2. Change to the project directory:

```
cd law-orchestrator
```

3. Build and start the Docker containers:

```
docker-compose build
docker-compose up -d
```

4. Run database migration:

```
docker-compose exec orchestrator-service python manage.py migrate --noinput
```

# API Documentation

API documentation is generated using Swagger and can be accessed at `http://localhost:8000/docs`.

# USAGE

## Admin

### Create a Coupon

```
POST /coupons
```

### Create a Menu Item

```
POST /menu
```

### Update a Menu Item

```
PUT /menu/:id
```

### Delete a Menu Item

```
DELETE /menu/:id
```

## Courier

### Get all Order as Courier

```
PUT /order/courier
```
### Update Order as Courier by id

```
PUT /order/courier/:id
```

## Kitchen

### Get all Order as Kitchen

```
PUT /order/kitchen
```

### Update Order as Kitchen by id

```
PUT /order/kitchen/:id
```

## Anyone

### Get Coupons by Code

```
GET /coupons/:code
```

### Redeem Coupons

```
PUT /coupons/redeem/:code
```

### Get All Menu Items

```
GET /menu
```

### Get Menu Item by ID

```
GET /menu/:id
```

### Get All Unique Categories

```
GET /menu/categories
```

### Filter Menus by Category

```
GET /menu?category=<category>
```

### Get Your Orders

```
GET /order
```

### Create an Order

```
POST /order
```

### Get Order by id

```
GET /order/:id
```

### Cancel Order by id

```
DELETE /order/:id
```


Access token valid 5 menit, refresh token valid 24 jam

