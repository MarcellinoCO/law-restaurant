import json
from django.shortcuts import render
import requests
from orchestra.endpoints import Endpoints
from authentication.permissions import AdminAccessOrReadOnly, KitchenAccessOrReadOnly, \
  CourierAccessOrReadOnly, CustomerAccessOrReadOnly

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import QueryDict

COUPON_ENDPOINT = Endpoints.COUPON_SERVICE
MENU_ENDPOINT = Endpoints.MENU_SERVICE
ORDER_ENDPOINT = Endpoints.ORDER_SERVICE

# Create your views here.


class CreateCoupon(APIView):
    permission_classes = (AdminAccessOrReadOnly,)

    def post(self, request):
        response = requests.post(f"{COUPON_ENDPOINT}", json=json.loads(request.body))
        data = response.json()
        return Response(data, status=response.status_code)


class GetCoupon(APIView):
    permission_classes = (CustomerAccessOrReadOnly,)

    def get(self, request, code):
        response = requests.get(f"{COUPON_ENDPOINT}/{code}")
        data = response.json()
        return Response(data, status=response.status_code)


class RedeemCoupon(APIView):
    permission_classes = (CustomerAccessOrReadOnly,)

    def put(self, request, code):
        response = requests.put(f"{COUPON_ENDPOINT}/redeem/{code}")
        data = response.json()
        return Response(data, status=response.status_code)


class Menu(APIView):
    permission_classes = (AdminAccessOrReadOnly,)

    def get(self, request):
        category = request.GET.get('category', None)
        url = MENU_ENDPOINT if category is None else f"{MENU_ENDPOINT}?category={category}"
        response = requests.get(url)
        data = response.json()
        return Response(data, status=response.status_code)

    def post(self, request):
        response = requests.post(f"{MENU_ENDPOINT}", json=json.loads(request.body))
        data = response.json()
        return Response(data, status=response.status_code)


class MenuById(APIView):
    permission_classes = (AdminAccessOrReadOnly,)

    def get(self, request, id):
        response = requests.get(f"{MENU_ENDPOINT}/{id}")
        data = response.json()
        return Response(data, status=response.status_code)

    def put(self, request, id):
        response = requests.put(
            f"{MENU_ENDPOINT}/{id}", json=json.loads(request.body))
        data = response.json()
        return Response(data, status=response.status_code)

    def delete(self, request, id):
        response = requests.delete(f"{MENU_ENDPOINT}/{id}")
        return Response(response, status=response.status_code)


class MenuCategory(APIView):
    permission_classes = (CustomerAccessOrReadOnly,)

    def get(self, request):
        response = requests.get(f"{MENU_ENDPOINT}/categories")
        data = response.json()
        return Response(data, status=response.status_code)


    
class Order(APIView):
    permission_classes = (CustomerAccessOrReadOnly,)

    def get(self, request):
        print(request.user.role)
        response = requests.get(f"{ORDER_ENDPOINT}/mine/?owner_id={request.user.id}")
        data = response.json()
        return Response(data, status=response.status_code)
    
    def post(self, request):
        data = json.loads(request.body)
        prices = data.get('price')
        quantities = data.get('quantity')
        total_price = 0
        for i in range(len(prices)):
            total_price += prices[i] * quantities[i]

        data['owner_id'] = request.user.id
        data['total_price'] = total_price
        
        response = requests.post(f"{ORDER_ENDPOINT}/", json=data)
        data = response.json()
        return Response(data, status=response.status_code)
    
class OrderById(APIView):
    permission_classes = (CustomerAccessOrReadOnly,)

    def get(self, request, order_id):
        response = requests.get(f"{ORDER_ENDPOINT}/{order_id}")
        data = response.json()
        return Response(data, status=response.status_code)
    
    def delete(self, request, order_id):
        response = requests.delete(f"{ORDER_ENDPOINT}/{order_id}")
        data = response.json()
        return Response(data, status=response.status_code)
    
class OrderKitchen(APIView):
    permission_classes = (KitchenAccessOrReadOnly,)

    def get(self, request):
        response = requests.get(f"{ORDER_ENDPOINT}/kitchen/")
        data = response.json()
        return Response(data, status=response.status_code)
    
    def put(self, request):
        data = json.loads(request.body)
        data = {
            "order_id": data['order_id']
        }
        response = requests.put(f"{ORDER_ENDPOINT}/kitchen/", data=data)
        data = response.json()
        return Response(data, status=response.status_code)
    
class OrderCourier(APIView):
    permission_classes = (CourierAccessOrReadOnly,)

    def get(self, request):
        response = requests.get(f"{ORDER_ENDPOINT}/courier/")
        data = response.json()
        return Response(data, status=response.status_code)
    
    def put(self, request):
        data = json.loads(request.body)
        data = {
            "order_id": data['order_id']
        }
        response = requests.put(f"{ORDER_ENDPOINT}/courier/", data=data)
        data = response.json()
        return Response(data, status=response.status_code)
