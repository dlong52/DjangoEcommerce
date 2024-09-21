from django.urls import path
from .views import *

urlpatterns = [
    path('create', create_order, name='create_order'),
    path('all/', get_all_orders, name='get_all_orders'),
    path('detail/<int:order_id>', get_order_details, name='get_order_details'),
    path('all-order-user/<int:user_id>/', get_all_orders_by_user, name='get_all_orders_by_user'),
    path('update/<int:order_id>/', update_order, name='update_order'),
]
