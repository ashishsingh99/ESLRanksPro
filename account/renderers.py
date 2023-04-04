from rest_framework import renderers
from rest_framework.response import Response
import json
from rest_framework import status
class UserRenderer(renderers.JSONRenderer):
  charset='utf-8'
  def render(self, data, accepted_media_type=None, renderer_context=None):
    headers = ''
    if 'ErrorDetail' in data:
      headers = json.dumps({'response':data, 'msg':'Invalid Email or Password', 'status':'400'})
    else:
      headers = json.dumps(data)
    
    return headers