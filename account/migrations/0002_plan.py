# Generated by Django 4.0.3 on 2023-03-23 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.SlugField(max_length=10)),
                ('prod_id', models.SlugField(max_length=256)),
                ('payment_link', models.URLField()),
                ('name', models.CharField(max_length=256)),
                ('validity', models.CharField(max_length=256)),
            ],
        ),
    ]
