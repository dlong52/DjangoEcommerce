# Generated by Django 5.1 on 2024-09-13 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0006_cartitem_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='size',
            field=models.CharField(default='M', max_length=255),
        ),
    ]
