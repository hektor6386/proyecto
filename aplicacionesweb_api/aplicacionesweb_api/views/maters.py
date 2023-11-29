from django.shortcuts import render
from django.db.models import *
from django.db import transaction
from aplicacionesweb_api.serializers import *
from aplicacionesweb_api.models import *
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.utils.html import strip_tags
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from datetime import datetime
from django.conf import settings
from django.template.loader import render_to_string
import string
import random
import json

class MatersAll(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        maters = Maters.objects.filter().order_by("id")
        lista = MatersSerializer(maters, many=True).data
        
        return Response(lista, 200)

class MatersView(generics.CreateAPIView):
    #Obtener usuario por ID
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        maters = get_object_or_404(Maters, id = request.GET.get("id"))
        maters = MatersSerializer(maters, many=False).data

        return Response(maters, 200)
    
    #Registrar nuevo usuario
    @transaction.atomic
    def post(self, request, *args, **kwargs):

        maters = MatersSerializer(data=request.data)
        if maters.is_valid():
            #Grab user data
            nrc = request.data['nrc']
            materia = request.data['materia']
            section = request.data['section']
            days = request.data['days']
            hour_inicial =request.data['hour_inicial']
            hour_final = request.data['hour_final']
            salon = request.data['salon']
            proed = request.data['proed']
            #Valida si existe el usuario o bien el email registrado
        

            #maters.save()

           # group, created = Group.objects.get_or_create(name=role)
            #group.user_set.add(maters)
            #maters.save()

            #Create a profile for the user
        maters = Maters.objects.create(   
                                          nrc= request.data["nrc"],
                                          materia= request.data["materia"].upper(),
                                          section= request.data["section"].upper(),
                                          days= request.data["days"],
                                          hour_inicial= request.data["hour_inicial"],
                                          hour_final= request.data["hour_final"],
                                          salon= request.data["salon"].upper(),
                                          proed= request.data["proed"].upper())
        maters.save()

        return Response({"maters_created_id": maters.id }, 201)

        #return Response(maters.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MatersViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        # iduser=request.data["id"]
        maters = get_object_or_404(maters, id=request.data["id"])
        maters.nrc = request.data["nrc"]
        maters.materia = request.data["materia"]
        maters.section = request.data["section"]
        maters.days = request.data["days"]
        maters.hour_inicial = request.data["hour_inicial"]
        maters.hour_final = request.data["hour_final"]
        maters.salon = request.data["salon"]
        maters.proed = request.data["proed"]
        temp = maters
        temp.save()
        maters = MatersSerializer(maters, many=False).data

        return Response(maters,200)
    
    def delete(self, request, *args, **kwargs):
        maters = get_object_or_404(Profiles, id=request.GET.get("id"))
        try:
            maters.user.delete()
            return Response({"details":"Usuario eliminado"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)