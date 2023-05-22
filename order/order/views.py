from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    UpdateAPIView
)
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class OrderListCreateAPIView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class OrderListMineAPIView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        owner_id = request.query_params.get("owner_id", None)
        if owner_id is None:
            return Response({"error": "Owner ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        queryset = self.get_queryset().filter(owner_id=owner_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class OrderKitchenView(ListAPIView, UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(status="Preparing your order")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def update(self, request):
        order_id = request.POST.get('order_id', None)
        if order_id is None:
            return Response({"error": "Order ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        order = get_object_or_404(Order, pk=order_id)
        if order.status != "Preparing your order":
            return Response({"error": "Cannot update this order."}, status=status.HTTP_400_BAD_REQUEST)
        order.status = "Delivering your order"
        order.save()
        return Response({"message":"Successfully updating this order."}, status=status.HTTP_200_OK)
    
class OrderCourierView(ListAPIView, UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(status="Delivering your order")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def update(self, request):
        order_id = request.POST.get('order_id', None)
        if order_id is None:
            return Response({"error": "Order ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        order = get_object_or_404(Order, pk=order_id)
        if order.status != "Delivering your order":
            return Response({"error": "Cannot update this order."}, status=status.HTTP_400_BAD_REQUEST)
        order.status = "Delivered"
        order.save()
        return Response({"message":"Successfully updating this order."}, status=status.HTTP_200_OK)

class OrderRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def delete(self, request, *args, **kwargs):
        print("delete")
        order = get_object_or_404(Order, pk=kwargs["pk"])
        if order.status == "cancelled":
            return Response({"error": "Order already cancelled."}, status=status.HTTP_400_BAD_REQUEST)
        elif order.status == "delivered":
            return Response({"error": "Order already delivered."}, status=status.HTTP_400_BAD_REQUEST)
        elif order.status == "paid":
            return Response({"error": "Order already been paid."}, status=status.HTTP_400_BAD_REQUEST)
        order.status = "cancelled"
        order.save()
        return Response(status=status.HTTP_204_NO_CONTENT)