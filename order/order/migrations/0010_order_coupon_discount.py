# Generated by Django 4.2 on 2023-05-16 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("order", "0009_alter_order_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="coupon_discount",
            field=models.IntegerField(default=0),
        ),
    ]