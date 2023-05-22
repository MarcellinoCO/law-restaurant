from rest_framework.permissions import BasePermission

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']

def isAdmin(request):
    return request.user.is_authenticated and request.user.role == 'admin'

def isCourierOrHigher(request):
    return request.user.is_authenticated and request.user.role in ['courier', 'admin']

def isKitchenOrHigher(request):
    return request.user.is_authenticated and request.user.role in ['kitchen', 'admin']

def isCustomerOrHigher(request):
    return request.user.is_authenticated and request.user.role in ['customer', 'courier', 'kitchen', 'admin']

class AdminAccessOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or isAdmin(request)
    
class KitchenAccessOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or isKitchenOrHigher(request)
    
class CourierAccessOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or isCourierOrHigher(request)
    
class CustomerAccessOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or isCustomerOrHigher(request)
