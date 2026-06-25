from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):

    venue_name = serializers.CharField(source="venue.name",read_only=True)

    venue_image = serializers.ImageField( source="venue.image",read_only=True)

    venue_location = serializers.CharField(source="venue.location",read_only=True)

    time_slot_name = serializers.CharField(source="time_slot.name",read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",

            "venue",
            "time_slot",

            "booking_date",
            "guest_count",
            "total_amount",
            "status",

            "venue_name",
            "venue_location",
            "venue_image",
            "time_slot_name",
        ]

        read_only_fields = [
            "user",
            "venue_name",
            "venue_location",
            "venue_image",
            "time_slot_name",
        ]