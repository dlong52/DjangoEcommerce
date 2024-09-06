from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderDetailViewSet, CartViewSet, CartItemViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'orderdetails', OrderDetailViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cartitems', CartItemViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
