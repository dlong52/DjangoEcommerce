from django.db import models
from categories.models import Category
from collection.models import Collection
# Create your models here.
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    stock_quantity = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    sales_count = models.IntegerField(default=0)
    discount = models.FloatField(default=0)
    images = models.JSONField(blank=True, null=True)
    sizes = models.JSONField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        # Kiểm tra nếu Category hoặc Collection không active, đặt status = False
        if not self.category.active or not self.collection.active:
            self.status = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
