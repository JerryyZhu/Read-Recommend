# Generated by Django 3.0.7 on 2020-06-26 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200619_0657'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='publisher',
            field=models.CharField(default='Penguin', max_length=60),
            preserve_default=False,
        ),
    ]
