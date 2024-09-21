from django.db import models
from user.models import User
from cart.models import Cart
from product.models import Product

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
    ]
    payment_id = models.AutoField(primary_key=True)
    payment_method = models.CharField(max_length=255)
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES)
    payment_date = models.DateTimeField(auto_now_add=True)
    
class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
    ]
    order_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=ORDER_STATUS_CHOICES)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)  # Thêm trường address
    phone_number = models.CharField(max_length=20, null=True, blank=True)  # Thêm trường phone_number
    username = models.CharField(max_length=255, null=True, blank=True)  # Thêm trường username
    date_received = models.DateTimeField(null=True, blank=True)  # Date when order is marked as received
    date_cancelled = models.DateTimeField(null=True, blank=True)  # Date when order is cancelled

    def get_total_price(self):
        return sum(item.quantity * item.price for item in self.orderdetail_set.all())

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    size = models.CharField(max_length=255, null=False, default="M")
    image = models.URLField()

    def __str__(self):
        return f"{self.product.name} - {self.quantity} pcs"