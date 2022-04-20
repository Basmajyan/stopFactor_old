from django.shortcuts import render

def index(request):
    
    return render(request, 'main/index.html')

def pay(request):
    
    return render(request, 'main/pay.html')