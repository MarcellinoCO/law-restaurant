# Generated by Django 4.2 on 2023-05-16 10:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("order", "0005_order_address_order_name_order_phone"),
    ]

    operations = [
        migrations.RemoveField(model_name="order", name="address",),
        migrations.RemoveField(model_name="order", name="name",),
        migrations.RemoveField(model_name="order", name="phone",),
    ]
