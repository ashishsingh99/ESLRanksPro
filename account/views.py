from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import SendPasswordResetEmailSerializer,codesSerializer,codesGetSerializer,DeleteProjectGetSerializer,DeleteProjectSerializer,PlanGetSerializer,PlanSerializer,KeywordGetSerializer,otpSerializer,KeywordSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from .models import Keyword, User, Plan, DeleteProject,Codes
import ast
from .client import RestClient
from pymongo import MongoClient
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
import random

user = 'info@esearchlogix.com'
password = 'ff9fb26846a160db'


mongo_client=MongoClient("mongodb+srv://Alekh:Rank%402022%23@eslrankspro.6ziuz.mongodb.net/?retryWrites=true&w=majority")
db=mongo_client.Latest_Data
db2=mongo_client.Previous_Data
db3=mongo_client.seo_newest

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class OTPView(APIView):
  def post(self, request, format=None):
    serializer = otpSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    otp = random.randint(1000,9999)
    user = serializer.data.get('email')
    if user is not None:
      body = 'OTP validation for resgistring '+str(otp)
      data = {
        'subject':'OTP Validation',
        'body':body,
        'to_email':user
      }
      print(data)
      send_mail(
        subject=data['subject'],
        message=data['body'],
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[data['to_email']]
      )
      return Response({'otp':otp}, status=status.HTTP_200_OK)

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success', 'status':'200', 'email':email}, status=status.HTTP_200_OK)
    else:
      return Response({'status':'400', 'msg':'Invalid Credentials'}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
class profileView(APIView):
  def get(self, request, format=None):
    mycol = db3["account_user"]
    results = []
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      results.append(x)
    return Response(results, status=status.HTTP_200_OK)
  
class deleteprofileView(APIView):
  def delete(self, request,id):
    user_detail = User.objects.get(id=id)
    user_detail.delete()
    return Response("deleted successfully")

class keywordView(APIView):
  def post(self,request):
    serializer = KeywordSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'msg':'Id Successful', 'data':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'msg':'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class projectView(APIView):
  def post(self,request):
    serializer = DeleteProjectSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'msg':'save Successful', 'data':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'msg':'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class projectGetView(APIView):
  def get(self, request):
    datas = []
    keyword = DeleteProject.objects.all()
    serializer = DeleteProjectGetSerializer(keyword, many=True)
    for data in serializer.data:
      GetData = dict(data)
      Check = ast.literal_eval(GetData.get('keyword'))
      GetData['keyword'] = Check
      datas.append(GetData)
    return Response({"status": "success", "data": datas}, status=status.HTTP_200_OK)

class projectDeleteView(APIView):
  def delete(self, request, id):
    keyword = DeleteProject.objects.get(id=id)
    keyword.delete()
    return Response("deleted successfully")

class keywordprojDeleteView(APIView):
  def put(self,request,id):
    new_data = dict()
    key_list = []
    if id:
      del_keyword = DeleteProject.objects.get(id=id)
      serializer = DeleteProjectGetSerializer(del_keyword)
      key = request.query_params.get('key')
      device = request.query_params.get('device')
      data_key = ast.literal_eval(serializer.data['keyword'])
      for i in range(len(data_key)):
        if data_key[i]['deviceType'] == device and key in data_key[i]['keyword']:
          data_key[i]['keyword'].remove(key)
          del_keyword.save()
        key_list.append(data_key[i])
      new_data['keyword'] = key_list
      serializer = DeleteProjectSerializer(data=new_data)
      if serializer.is_valid():
          serializer.update(del_keyword, new_data)
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return Response({"msg":"No Keyword found"}, status=status.HTTP_400_BAD_REQUEST)

class keywordprojUpdateView(APIView):
  def put(self,request,id):
    new_data = dict()
    key_list = []
    if id:
      del_keyword = DeleteProject.objects.get(id=id)
      serializer = DeleteProjectGetSerializer(del_keyword)
      key = request.query_params.get('key')
      key = ast.literal_eval(key)
      device = request.query_params.get('device')
      device = ast.literal_eval(device)
      data_key = ast.literal_eval(serializer.data['keyword'])
      for i in range(len(data_key)):
        for j in device:
          if data_key[i]['deviceType'] == j:
            data_key[i]['keyword'].extend(key)
            del_keyword.save()
          key_list.append(data_key[i])
      # new_key_list = set(key_list)
      new_data['keyword'] = key_list
      serializer = DeleteProjectSerializer(data=new_data)
      if serializer.is_valid():
          serializer.update(del_keyword, new_data)
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return Response({"msg":"No Keyword found"}, status=status.HTTP_400_BAD_REQUEST)

class KeywordGetView(APIView):
  def get(self, request, id=None, format=None):
    if id:
      keyword = Keyword.objects.filter(id=id)
      serializer = KeywordGetSerializer(keyword)
      return Response(serializer.data, status=status.HTTP_200_OK)
    keyword = Keyword.objects.all()
    serializer = KeywordGetSerializer(keyword, many=True)
    Data = []
    for data in serializer.data:
      GetData = dict(data)
      Check = ast.literal_eval(GetData.get('data'))
      # print(Check)
      lis=[]
      for i in Check:
        for j in i:
          dic = dict()
          dic["device"] = j.get('device')
          lis.append(j)
      GetData["data"] = lis
      Data.append(GetData)
    return Response({"status": "success", "data": Data}, status=status.HTTP_200_OK)

class getOldDataView(APIView):
  def get(self, request):
    mycol = db2["segment"]
    Old_data_list = []
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      Old_data_list.append(x)
    return Response({"status": "success", "data": Old_data_list}, status=status.HTTP_200_OK)

class NewDataView(APIView):
  def get(self, request):
    mycol = db["segment"]
    results = []
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      results.append(x)
    return Response({"status": "success", "data": results}, status=status.HTTP_200_OK)

class PlanView(APIView):
  def post(self, request):
    serializer = PlanSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'msg':'Plan Saved Successful', 'data':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'msg':'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class PlanGetView(APIView):
  def get(self,request):
    planData = []
    plan = Plan.objects.all()
    serializer = PlanGetSerializer(plan, many=True)
    for data in serializer.data:
      plans = dict(data)
      planData.append(plans)
    return Response({"status": "success", "data": planData}, status=status.HTTP_200_OK)

class PlanUpdateView(APIView):
  def put(self,request, id):
    update = dict()
    plan = Plan.objects.get(id=id)
    plan.price = request.data.get('price')
    plan.prod_id = request.data.get('prod_id')
    plan.payment_link = request.data.get('payment_link')
    plan.name = request.data.get('name')
    plan.validity = request.data.get('validity')
    plan.proj_len = request.data.get('proj_len')
    plan.keyword_len = request.data.get('keyword_len')
    plan.save()
    update['price'] = plan.price
    update['prod_id'] = plan.prod_id
    update['payment_link'] = plan.payment_link
    update['name'] = plan.name
    update['validity'] = plan.validity
    update['proj_len'] = plan.proj_len
    update['keyword_len'] = plan.keyword_len
    serializer = PlanSerializer(data = update)
    if serializer.is_valid():
      serializer.update(plan, update)
      return Response({'msg':'Plan Saved Successful', 'data':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'msg':'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class PlanDeleteView(APIView):
  def delete(self, request,id):
    Plan_detials = Plan.objects.get(id=id)
    Plan_detials.delete()
    return Response("deleted successfully")

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    user = authenticate(email=email)
    if user is None:
      try:
        user = User.objects.get(email = email)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        # print('Encoded UID', uid)
        token = PasswordResetTokenGenerator().make_token(user)
        # print('Password Reset Token', token)
        link = 'https://eslrankspro.com/api/user/reset/'+uid+'/'+token
        # print('Password Reset Link', link)
        # Send EMail
        body = "We heard that you lost your password. Sorry about that! But don't worry! You can use the following link to reset your password: "+link
        data = {
          'subject':'ESLRanksPro: Reset Your Password',
          'body':body,
          'to_email':user.email
        }
        send_mail(
          subject=data['subject'],
          message=data['body'],
          from_email=settings.EMAIL_HOST_USER,
          recipient_list=[data['to_email']]
        )
        return Response({'msg':'Password Reset link send. Please check your Email', 'uid':uid, 'token':token}, status=status.HTTP_200_OK)
      except:
        return Response({'msg':'Invalid Email Address'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

class PromotionCodeView(APIView):
  def post(self, request):
    serializer = codesSerializer(data=request.data)
    if serializer.is_valid():
      # print(serializer.initial_data)
      serializer.save()
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

class PromotionCodeGetView(APIView):
  def get(self, request):
    new_code = []
    codes = Codes.objects.all()
    serializer = codesGetSerializer(codes, many=True)
    for data in serializer.data:
      new_data = dict(data)
      code = ast.literal_eval(new_data['codes'])
      new_data['codes'] = code
      new_code.append(new_data)
    # print(serializer.data)
    return Response({"data":new_code}, status=status.HTTP_200_OK)


