from apscheduler.schedulers.background import BackgroundScheduler
from rest_framework.response import Response
from rest_framework import status
from account.serializers import KeywordGetSerializer, codeValidGetSerializer
from account.models import Keyword, codeValid
import ast
from account.client import RestClient
from pymongo import MongoClient
from apscheduler.schedulers.background import BackgroundScheduler
import time
import datetime

user = 'info@esearchlogix.com'
password = 'ff9fb26846a160db'

mongo_client=MongoClient("mongodb+srv://Alekh:Rank%402022%23@eslrankspro.6ziuz.mongodb.net/?retryWrites=true&w=majority")
db=mongo_client.Latest_Data
db2=mongo_client.Previous_Data

data_list = []

def get(id=None, format=None):
  global data_list
  new_dat_list = []
  db2.segment.drop()
  mycol = db["segment"]
  results = []
  try:
    for x in mycol.find():
      x['_id'] = str(x['_id'])
      results.append(x)
    db2.segment.insert_many(results)
  finally:
    db.segment.drop()
    client = RestClient(user,password)
    if id:
      keyword = Keyword.objects.filter(id=id)
      serializer = KeywordGetSerializer(keyword)
      return Response(serializer.data, status=status.HTTP_200_OK)
    keyword = Keyword.objects.all()
    serializer = KeywordGetSerializer(keyword, many=True)
    for data in serializer.data:
      GetData = dict(data)
      Check = ast.literal_eval(GetData.get('data'))
      for dat in Check:
        for new_dat in dat:
          if new_dat not in new_dat_list:
            new_dat_list.append(new_dat)
    response = client.post("https://api.dataforseo.com/v3/serp/google/organic/task_post", new_dat_list)
    if response["status_code"] == 20000:
      id = []
      data_new = dict()
      for task in response["tasks"]:
        id.append(task["id"])
      data_new["datasave"] = id
      data_list.append(data_new)
    time.sleep(300)
    new_list = []
    Previous_Date = datetime.datetime.today()
    year = (Previous_Date.year)
    date = (Previous_Date.strftime("%d"))
    Month = (Previous_Date.strftime("%b"))
    for i in data_list:
      new = []
      new_data = dict()
      data = i.get('datasave')
      for i in data:
        response = client.get("https://api.dataforseo.com/v3/serp/google/organic/task_get/regular/$"+i)
        if response['status_code'] == 20000:
          data = dict()
          data["data"] = response
        new.append(data)
      new_data["datasave"] = new
      new_data["date"] = date
      new_data["month"] = Month
      new_data["year"] = year
      new_list.append(new_data)
    db.segment.insert_many(new_list)
    data_list.clear()
    return Response()

def deleteCodes():
  code_validation = codeValid.objects.all()
  serializer = codeValidGetSerializer(code_validation, many=True)
  Date = datetime.datetime.today()
  date = (Date.strftime("%d"))
  for data in serializer.data:
    GetData = dict(data)
    print(GetData.get('expiry_date'))
    if date == str(GetData.get('expiry_date')):
      id = GetData.get('id')
      del_id = codeValid.objects.get(id=id)
      del_id.delete()
  return Response()

def start():
  scheduler = BackgroundScheduler()
  scheduler.add_job(get, trigger='cron', hour='5')
  scheduler.add_job(deleteCodes, trigger='cron', hour='3')
  scheduler.start()
  print("Scheduler started...")