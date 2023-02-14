from rest_framework import serializers
from .models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='users-detail', lookup_field='pk')

    class Meta:
        model = User
        fields = ['url', 'pk', 'email', 'name', 'profile_picture', 'password']
