from django.db import models
from django.utils import timezone
from django.conf import settings


class Event(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(default=timezone.now)
    currency = models.CharField(max_length=10)
    creator_email = models.EmailField()  # New field to store the creator's email

    def __str__(self):
        return self.name


class RSVP(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    is_attending = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "event")
