
from django.urls import path
from .views import create_booking, create_payment_intent,get_bookings,booking_details

urlpatterns = [
    path("create/",create_booking),
    path('create-payment-intent/',create_payment_intent,name='create-payment-intent'),
    path('get-bookings/',get_bookings,name='get_bookings'),
    path('booking-details/<int:id>/', booking_details, name='booking_details'),
]