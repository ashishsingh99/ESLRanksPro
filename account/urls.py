from django.urls import path
from django.contrib import admin
from . import views
from account.views import SendPasswordResetEmailView,projectView,PromotionCodeView,PromotionCodeGetView,keywordprojDeleteView,keywordprojUpdateView,projectGetView,projectDeleteView,PlanDeleteView,PlanUpdateView,PlanGetView,PlanView,NewDataView,getOldDataView,deleteprofileView,profileView,projectGetView,KeywordGetView,OTPView,keywordView,UserChangePasswordView, UserLoginView, UserProfileView, UserRegistrationView, UserPasswordResetView
urlpatterns = [
    
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('otp/',OTPView.as_view(), name='otp'),
    path('project/', projectView.as_view(), name='del-prefds'),
    path('projectGet/', projectGetView.as_view(), name='projectGet'),
    path('deleteproject/<id>/',projectDeleteView.as_view(), name='userProject-delete'),
    path('Keyword/', keywordView.as_view(), name='Keyword'),
    path('KeywordGet/', KeywordGetView.as_view(), name='Keyword'),
    path('delkeyword/<id>/', keywordprojDeleteView.as_view(), name='keyword-delete'),
    path('updatekeyword/<id>/', keywordprojUpdateView.as_view(), name='keyword-delete'),
    path('Newdata/', NewDataView.as_view(), name = 'Newdata'),
    path('adminuser/',profileView.as_view(), name='user-profile'),
    path('deleteuser/<id>/',deleteprofileView.as_view(), name='user-delete'),
    path('Olddata/', getOldDataView.as_view(), name = 'Olddata'),
    path('plan/', PlanView.as_view(), name = 'Plans'),
    path('planget/', PlanGetView.as_view(), name = 'Plans-Get'),
    path('planupdate/<id>/', PlanUpdateView.as_view(), name = 'Plans-Update'),
    path('deleteplan/<id>/',PlanDeleteView.as_view(), name='plan-delete'),
    path('codes/', PromotionCodeView.as_view(), name='codes'),
    path('codesGet/', PromotionCodeGetView.as_view(), name='codesGet'),
]