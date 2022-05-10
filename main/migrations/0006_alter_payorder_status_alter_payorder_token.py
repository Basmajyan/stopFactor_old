# Generated by Django 4.0 on 2022-04-23 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_payorder_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payorder',
            name='status',
            field=models.CharField(choices=[('waiting', 'В ожидании'), ('paid', 'Оплачено'), ('error', 'Ошибка')], default='none', max_length=60, null=True, verbose_name='Статус заказа'),
        ),
        migrations.AlterField(
            model_name='payorder',
            name='token',
            field=models.CharField(max_length=30, verbose_name='Токен'),
        ),
    ]