from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Venue
from .serializers import VenueSerializer

# Create your views here.


@api_view(['GET'])
def venue_list(request):

    venues = Venue.objects.all()

    serializer = VenueSerializer(venues, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def venue_detail(request, pk):
    venue = Venue.objects.get(id=pk)

    serializer = VenueSerializer(venue)

    return Response(serializer.data)