import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    category = django_filters.CharFilter(field_name="category__category_id", lookup_expr='icontains')
    name = django_filters.CharFilter(field_name="name", lookup_expr='icontains')
    order_by = django_filters.OrderingFilter(
        fields=(
            ('price', 'price'),
            ('sales_count', 'sales_count'),
            ('created_at', 'created_at'),
        )
    )

    class Meta:
        model = Product
        fields = ['name', 'category', 'min_price', 'max_price']
