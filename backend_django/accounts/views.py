from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import User
from .permissions import IsOwnProfileOrReadOnly
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnProfileOrReadOnly]

    def perform_create(self, serializer):
        password = make_password(self.request.data.get('password'))
        serializer.save(password=password)

    def perform_update(self, serializer):
        password = make_password(self.request.data.get('password'))
        serializer.save(password=password)
