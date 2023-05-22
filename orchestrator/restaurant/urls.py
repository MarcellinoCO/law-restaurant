from django.urls import path
from .views import CreateCoupon, GetCoupon, OrderKitchen, OrderCourier, RedeemCoupon, Menu, MenuById, MenuCategory, Order, OrderById

urlpatterns = [
    path('coupons', CreateCoupon.as_view()),
    path('coupons/redeem/<str:code>', RedeemCoupon.as_view()),
    path('coupons/<str:code>', GetCoupon.as_view()),
    
    path('menu', Menu.as_view()),
    path('menu/<int:id>', MenuById.as_view()),
    path('menu/categories', MenuCategory.as_view()),

    path('order', Order.as_view()),
    path('order/kitchen', OrderKitchen.as_view()),
    path('order/courier', OrderCourier.as_view()),
    path('order/<str:order_id>', OrderById.as_view()),
]
