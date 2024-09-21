from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from .models import Order

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# Create a filter set for filtering orders
class OrderFilter(filters.FilterSet):
    payment_status = filters.CharFilter(field_name='payment__payment_status', lookup_expr='exact')
    order_date = filters.DateFromToRangeFilter(field_name='order_date')
    payment_method = filters.CharFilter(field_name='payment__payment_method', lookup_expr='exact')
    username = filters.CharFilter(field_name='username', lookup_expr='icontains')  # Added filter for username
    order_status = filters.CharFilter(field_name='status', lookup_expr='exact')  # Added filter for order_status

    class Meta:
        model = Order
        fields = ['payment_status', 'order_date', 'payment_method', 'username','status']
