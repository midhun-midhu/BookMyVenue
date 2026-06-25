from django.db import models
from bookings.models import Booking


class Payment(models.Model):

    booking = models.OneToOneField(Booking,on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    transaction_id = models.CharField(max_length=255)
    payment_status = models.CharField(max_length=20,default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)