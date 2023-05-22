# Generated by Django 4.2 on 2023-05-16 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("order", "0004_order_price_order_total_price"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="address",
            field=models.CharField(default=None, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="order",
            name="name",
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="order",
            name="phone",
            field=models.CharField(default=None, max_length=25),
            preserve_default=False,
        ),
    ]
