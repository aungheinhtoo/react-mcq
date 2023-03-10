# Generated by Django 4.1.5 on 2023-01-29 13:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionSet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'question_set',
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=400, null=True)),
                ('option1', models.CharField(max_length=200, null=True)),
                ('option2', models.CharField(max_length=200, null=True)),
                ('option3', models.CharField(max_length=200, null=True)),
                ('option4', models.CharField(max_length=200, null=True)),
                ('answer', models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')], max_length=10)),
                ('questionSet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='reactmcq.questionset')),
            ],
            options={
                'db_table': 'question',
            },
        ),
    ]
