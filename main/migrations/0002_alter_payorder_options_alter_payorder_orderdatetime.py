# Generated by Django 4.0 on 2022-04-23 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='payorder',
            options={'verbose_name': 'Заказ', 'verbose_name_plural': 'Заказы'},
        ),
        migrations.AlterField(
            model_name='payorder',
            name='orderDatetime',
            field=models.DateTimeField(auto_now=True, verbose_name='Время заказа'),
        ),
    ]
