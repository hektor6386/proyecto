from rest_framework import serializers
from rest_framework.authtoken.models import Token
from aplicacionesweb_api.models import *

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id','first_name','last_name', 'email')

class ProfilesSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = "__all__"
class ProfilesAllSerializer(serializers.ModelSerializer):
    #user=UserSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = '__all__'
        depth = 1
# la materia

class MatersSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    nrc = serializers.IntegerField(required=True)
    materia = serializers.CharField(required=True)
    section = serializers.IntegerField(required=True)
    days = serializers.CharField(required=True)
    hour_inicio = serializers.IntegerField(required=True)
    hour_final = serializers.IntegerField(required=True)
    salon = serializers.IntegerField(required=True)
    proed = serializers.CharField(required=True)

    #class Meta:
        #model = User
        #fields = ('id','first_name','last_name', 'email')

class MatersSerializer(serializers.ModelSerializer):
    maters=MatersSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = "__all__"
class MatersAllSerializer(serializers.ModelSerializer):
    #user=UserSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = '__all__'
        depth = 1
