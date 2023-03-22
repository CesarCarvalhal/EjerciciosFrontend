# Generated by Django 3.0.5 on 2022-06-07 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dashboard',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=1000)),
                ('last_updated', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('child_id', models.IntegerField(editable=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=3000)),
                ('created_datetime', models.DateTimeField(auto_now=True)),
                ('dashboard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Dashboard')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('child_id', models.IntegerField(editable=False)),
                ('description', models.CharField(max_length=1000)),
                ('created_datetime', models.DateTimeField(auto_now=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Question')),
            ],
        ),
    ]
