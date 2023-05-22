from django.urls import path

from .views import OrderCourierView, OrderKitchenView, OrderListCreateAPIView, OrderRetrieveUpdateDestroyAPIView, OrderListMineAPIView

urlpatterns = [
    path('', OrderListCreateAPIView.as_view()),
    path('mine/', OrderListMineAPIView.as_view()),
    path('<uuid:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view()),
    path('kitchen/', OrderKitchenView.as_view()),
    path('courier/', OrderCourierView.as_view()),
]