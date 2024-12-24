from rest_framework import serializers
from .models import Event, RSVP
from user_app.models import User


class EventSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Event
        fields = [
            "id",
            "user",
            "name",
            "start_time",
            "end_time",
            "currency",
            "creator_email",
        ]


class RSVPSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = RSVP
        fields = ["id", "user", "event", "attending"]
