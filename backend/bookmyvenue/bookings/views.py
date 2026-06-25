from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import stripe

from .models import Booking
from .serializers import BookingSerializer
from django.shortcuts import get_object_or_404


# GET Logged-in User Bookings
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookings(request):

    print("USER:", request.user)
    print("AUTH:", request.META.get("HTTP_AUTHORIZATION"))

    bookings = Booking.objects.filter(user=request.user)

    serializer = BookingSerializer(bookings, many=True)

    return Response(serializer.data)


# CREATE Booking
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):

    print("USER:", request.user)
    print("AUTH:", request.META.get("HTTP_AUTHORIZATION"))

    serializer = BookingSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            user=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# STRIPE PAYMENT INTENT
stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
def create_payment_intent(request):

    try:

        amount = float(
            request.data.get('amount')
        )

        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency='inr',
        )

        return Response({
            'client_secret': intent.client_secret
        })

    except Exception as e:

        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def booking_details(request, id):

    booking = get_object_or_404(
        Booking,
        id=id,
        user=request.user
    )

    serializer = BookingSerializer(booking)

    return Response(serializer.data)