from rest_framework import serializers
from account.models import User, Keyword, OTP, Project, Plan
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util
from django.core.mail import EmailMessage
import os
from django.core.mail import send_mail
from django.conf import settings

class UserRegistrationSerializer(serializers.ModelSerializer):

  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'password', 'password2', 'tc']
    extra_kwargs={
      'password':{'write_only':True}
    }
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class KeywordSerializer(serializers.ModelSerializer):
  data = serializers.JSONField()
  class Meta:
    model = Keyword
    fields = ['data']

class KeywordGetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Keyword
    fields ='__all__'

class ProjectSerializer(serializers.ModelSerializer):
  keyword = serializers.JSONField()
  class Meta:
    model = Project
    fields = ['keyword']

class ProjectGetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Project
    fields = '__all__'

class otpSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model=OTP
    fields = ['email']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name']

class PlanSerializer(serializers.ModelSerializer):
  price = serializers.JSONField()
  prod_id = serializers.JSONField()
  payment_link = serializers.URLField()
  name = serializers.CharField(max_length=256)
  validity = serializers.CharField(max_length=256)
  proj_len = serializers.CharField(max_length=256)
  keyword_len = serializers.CharField(max_length=256)
  class Meta:
    model = Plan
    fields = ['price', 'prod_id', 'payment_link', 'name', 'validity', 'proj_len', 'keyword_len']

class PlanGetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Plan
    fields = '__all__'

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')
  