from django.db import models
import uuid as uuid_lib
from django.contrib.postgres.fields import ArrayField

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid_lib.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner_id = models.IntegerField(blank=False, null=False)
    name = models.CharField(max_length=50, blank=False, null=False)
    phone = models.CharField(max_length=25, blank=False, null=False)
    address = models.CharField(max_length=200, blank=False, null=False)
    status = models.CharField(max_length=50, blank=False, null=False, default='Preparing your order')
    menu = ArrayField(models.CharField(max_length=50, blank=False, null=False), blank=False, null=False)
    quantity = ArrayField(models.IntegerField(blank=False, null=False), blank=False, null=False)
    price = ArrayField(models.IntegerField(blank=False, null=False), blank=False, null=False)
    coupon_discount = models.IntegerField(blank=False, null=False, default=0)
    total_price = models.IntegerField(blank=False, null=False, default=0)


    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return str(self.id)