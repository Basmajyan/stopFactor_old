from distutils.log import error
import site
from django.shortcuts import redirect, render
import secrets
from main.models import PayOrder, Price, TestRequests
from django.http import JsonResponse
from skor.skor import stopFactor
from django.core.mail import send_mail
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer




def index(request):
    name = request.GET.get('name')
    surname = request.GET.get('surname')
    patronymic = request.GET.get('patronymic')
    series = request.GET.get('series')
    number = request.GET.get('number')
    date = request.GET.get('date')
    email = request.GET.get('email')
    token = secrets.token_hex(15)
    sitePrice = Price.objects.order_by('-pk')[0]
    
    
    if name:
        while PayOrder.objects.filter(token=token).count() != 0:
            token = secrets.token_hex(15)
        PayOrder.objects.create(name = name,surname = surname,patronymic = patronymic,series = series,number = number,date = date,email = email,status = 'none',token =token)
        return JsonResponse({'redirect': token})

    return render(request, 'main/index.html',{'price':sitePrice})

def contact(request):
    return render(request, 'main/contact.html')

def order(request,token):    
    if PayOrder.objects.filter(token=token).count() >= 1:
        if PayOrder.objects.get(token=token).status == 'paid':                    
            return redirect('/media/'+PayOrder.objects.get(token=token).token+'.pdf')        
    return render(request, 'main/order.html')    
    
    return render(request, 'main/pay.html',{'price':sitePrice})
def pay(request,token):
    sitePrice = Price.objects.order_by('-pk')[0]
    if PayOrder.objects.filter(token=token).count() >= 1:
        order = PayOrder.objects.get(token=token)
        return render(request, 'main/pay.html',{'order':order,'price':sitePrice})    
    
    return redirect('/')        




class PayConform(APIView):
    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'main/confirm.html'
    
    def post(self, request):
        token = request.data.get('orderId')
        recipientOriginalAmount= float(request.data.get('recipientOriginalAmount'))
        recipientCurrency= request.data.get('recipientCurrency')
        paymentStatus= request.data.get('paymentStatus')
        secretKey = request.data.get('secretKey') == 'Maria-6691'
        req = token+' '+str(recipientOriginalAmount)+' '+recipientCurrency+' '+paymentStatus
        
        sitePrice = Price.objects.order_by('-pk')[0]
        
        # print(req+": "+str(PayOrder.objects.get(token=token))+": "+sitePrice)
        # TestRequests.objects.create(token=req+": "+str(PayOrder.objects.get(token=token))+": "+sitePrice).save()
        
        if token:
            if recipientOriginalAmount >= float(sitePrice.price) and recipientCurrency == 'RUB' and paymentStatus == '5' and secretKey:
                if PayOrder.objects.filter(token=token).count() >= 1:
                    order = PayOrder.objects.get(token=token) 
                    token = order.token
                    if order.status != 'paid':
                        print(token)
                        stopFactor(token,order.surname,order.name,order.patronymic,order.series,order.number,str(order.date))
                        send_mail(
                                'Ваша заявка обработана - СтопФактор.ру',
                                "Благодарим Вас за обращение в компанию Стопфактор .\nРезультат проверки вы можете получить по ссылке :  http://стопфактор.рф/order/"+order.token+" \nПо всем вопросам и консультациям обращайтесь \nТел: 8(499)350-20-01\nТел: 8(916)100-50-44\nEmail: support@стопфактор.рф\nTelegram: @stopfactor_rf\nИли совершите звонок с нашего сайта.",
                                'info@rb365.ru',
                                [order.email],
                                fail_silently=False,
                            )
                        order.status = 'paid' 
                        order.save()   
                        
        return Response({'status':'ok'})



    