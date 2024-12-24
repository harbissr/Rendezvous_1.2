from django.urls import path
from . import views
from .views import (
    EventDetailView,
    RSVPView,
    EventbriteSearchView,
    EventbriteDetailView,
    EventCreateView,
    EventListView,
)

urlpatterns = [
    path("", EventListView.as_view(), name="event-list"),  # Lists events
    path(
        "create/", EventCreateView.as_view(), name="event-create"
    ),  # Lists and creates events
    path(
        "<int:pk>/", EventDetailView.as_view(), name="event-detail"
    ),  # Retrieves, updates, and deletes events
    path("<int:event_id>/rsvp/", RSVPView.as_view(), name="rsvp"),  # RSVP to an event
    path(
        "eventbrite/search/", EventbriteSearchView.as_view(), name="eventbrite-search"
    ),  # Search Eventbrite events
    path(
        "eventbrite/<str:event_id>/",
        EventbriteDetailView.as_view(),
        name="eventbrite-detail",
    ),  # Eventbrite event details
]
