# Generated by Django 4.2 on 2023-05-16 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("order", "0008_alter_order_address_alter_order_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(default="Preparing your order", max_length=50),
        ),
    ]
