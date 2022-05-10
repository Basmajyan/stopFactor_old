from django.contrib import admin
from main.models import PayOrder, Price, TestRequests

admin.site.register(PayOrder)
admin.site.register(TestRequests)
admin.site.register(Price)
