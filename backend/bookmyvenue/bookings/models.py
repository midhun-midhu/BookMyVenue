from django.db import models
from django.contrib.auth.models import User
from venues.models import Venue


class TimeSlot(models.Model):

    name = models.CharField(max_length=50)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.name


class Booking(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    venue = models.ForeignKey(Venue,on_delete=models.CASCADE)
    time_slot = models.ForeignKey(TimeSlot,on_delete=models.CASCADE)
    booking_date = models.DateField()
    guest_count = models.IntegerField()
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(max_length=20,default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)