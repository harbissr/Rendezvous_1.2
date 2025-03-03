"""
URL configuration for rendezvous_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def root_view(request):
    return JsonResponse({"message": "Welcome to Rendezvous"})


urlpatterns = [
    path("", root_view, name="root"),
    path("api/v1/admin/", admin.site.urls),
    path("api/v1/users/", include("user_app.urls")),
    path("api/v1/events/", include("events_app.urls")),
    path("api/v1/eventbrite/", include("eventbrite_app.urls")),
]
