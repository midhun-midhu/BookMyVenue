from django.db import models
from django.contrib.auth.models import User

class Venue(models.Model):

    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    venue_type = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=255)
    capacity = models.IntegerField()
    price = models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to='venues/',blank=True)
    status = models.CharField(max_length=20,default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
