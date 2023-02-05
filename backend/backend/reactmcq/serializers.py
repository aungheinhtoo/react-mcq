from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Question, QuestionSet


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question', 'option1',
                  'option2', 'option3', 'option4', 'answer']


class QuestionSetSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = QuestionSet
        fields = ['id', 'questions', 'title']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        questionSet = QuestionSet.objects.create(**validated_data)
        for question_data in questions_data:
            Question.objects.create(questionSet=questionSet, **question_data)
        return questionSet
