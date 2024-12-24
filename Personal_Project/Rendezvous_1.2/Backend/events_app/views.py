from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Event, RSVP
from .serializers import EventSerializer, RSVPSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from eventbrite_app.views import EventbriteAPI


# @api_view(["GET"])
# def get_user_events(request, user_id):
#     events = Event.objects.filter(user_id=user_id)
#     serializer = EventSerializer(events, many=True)
#     return Response({"events": serializer.data})


# Create your views here.
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class EventView(APIView):
#     permission_classes = [IsAuthenticatedOrReadOnly]

#     def get(self, request, *args, **kwargs):
#         organization_id = request.query_params.get("organization_id")
#         if not organization_id:
#             return Response({"error": "Organization ID is required"}, status=400)

#         events = Event.objects.filter(organization_id=organization_id)
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         data = request.data
#         data["user"] = request.user.id  # Associate event with the logged-in user
#         serializer = EventSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


class EventCreateView(APIView):
    def post(self, request):
        # Extract the email from the authenticated user
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Attach the creator's email to the incoming data
        data = request.data.copy()
        data["user"] = user.id

        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class RSVPView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        """RSVP to an event"""
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response(
                {"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND
            )
        user = request.user
        """Check if the user has already RSVP'd to an event"""
        existing_rsvp = RSVP.objects.filter(user=user, event=event).first()
        if existing_rsvp:
            return Response(
                {"detail": "You've already RSVP'd to this event."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        """Create a new RSVP"""
        RSVP.objects.create(user=user, event=event, is_attending=True)
        return Response(
            {"detail": "You've successfully RSVP'd to this event."},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, event_id):
        """Cancel an RSVP to an event"""
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response(
                {"detail": "This event does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        user = request.user
        """Checks if the user even RSVP'd to the event before canceling"""
        existing_rsvp = RSVP.objects.filter(user=user, event=event).first()
        if not existing_rsvp:
            return Response(
                {"detail": "You haven't RSVP'd to this event."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        """Delete an RSVP"""
        existing_rsvp.delete()
        return Response(
            {"detail": "RSVP has been successfully cancelled."},
            status=status.HTTP_204_NO_CONTENT,
        )


class EventbriteSearchView(APIView):
    """Search Eventbrite events"""

    def get(self, request):
        query = request.query_params.get("query", "")
        location = request.query_params.get("location", "")
        if not query or not location:
            return Response(
                {"error": "Both 'query' and 'location' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            api = EventbriteAPI()
            data = api.search_event(query, location)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)


class EventbriteDetailView(APIView):
    """Get Eventbrite event details"""

    def get(self, request, event_id):
        try:
            api = EventbriteAPI()
            data = api.get_event_details(event_id)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)
