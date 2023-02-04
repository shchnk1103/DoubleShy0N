from rest_framework import serializers
from .models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='users-detail', lookup_field='name')

    class Meta:
        model = User
        fields = ['url', 'email', 'name', 'profile_picture', 'password']
