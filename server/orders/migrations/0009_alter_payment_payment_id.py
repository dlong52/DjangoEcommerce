# Generated by Django 5.1 on 2024-09-21 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0008_alter_payment_payment_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='payment_id',
            field=models.AutoField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
