from distutils.log import error
from lib2to3.pgen2 import token
from tabnanny import verbose
from django.db import models

class PayOrder(models.Model):
    name = models.CharField(verbose_name='Имя', max_length=100)
    surname = models.CharField(verbose_name='Фамилия', max_length=100)
    patronymic = models.CharField(verbose_name='Отчество', max_length=100)
    series = models.CharField(verbose_name='Серия', max_length=10)
    number = models.CharField(verbose_name='Номер', max_length=10)
    date = models.DateField(verbose_name='Дата рождения', auto_now=False, auto_now_add=False)
    email = models.EmailField(verbose_name='Эл. почта', max_length=254)
    orderDatetime = models.DateTimeField(verbose_name='Время заказа', auto_now=True, )
    status = models.CharField(max_length=60, verbose_name='Статус заказа',choices=(('waiting','В ожидании'),('paid','Оплачено'),('error','Ошибка')), default='waiting',null=True)
    error = models.CharField(verbose_name='Ошибка', null=True, blank=True, max_length=100)
    token = models.CharField(verbose_name='Токен',max_length=30)
    

    def __str__(self):
        return self.name + ' ' + self.surname + ' : ' + self.status
    
    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

class TestRequests(models.Model):
    token = models.CharField(verbose_name='Токен',max_length=30)
    
    def __str__(self):
        return self.token
    
    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

class Price(models.Model):
    price = models.IntegerField(verbose_name="Цена",help_text="На сайте будет работать та цена, которая была создана последним.")
    
    def __str__(self):
        return str(self.price)
    
    class Meta:
        verbose_name = "Цена"
        verbose_name_plural = "Цена"