# Generated by Django 4.0 on 2022-04-23 13:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_payorder_token'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payorder',
            old_name='names',
            new_name='name',
        ),
    ]
