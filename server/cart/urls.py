from django.urls import path
from .views import add_to_cart, get_all_cart, update_cart_item, delete_cart_item

urlpatterns = [
    path('add-to-cart', add_to_cart, name='add_to_cart'),
    path('get-all/<int:user_id>', get_all_cart, name='get_all_cart'),
    path('update/<int:cart_item_id>', update_cart_item, name='update_cart_item'),
    path('delete/<int:cart_item_id>', delete_cart_item, name='delete_cart_item'),
]
