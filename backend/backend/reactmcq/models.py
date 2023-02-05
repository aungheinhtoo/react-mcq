from django.db import models


class QuestionSet(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=400, null=True)

    class Meta:
        db_table = "question_set"


class Question(models.Model):
    ANSWERS = (
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D")
    )
    question = models.CharField(max_length=400, null=True)
    option1 = models.CharField(max_length=200, null=True)
    option2 = models.CharField(max_length=200, null=True)
    option3 = models.CharField(max_length=200, null=True)
    option4 = models.CharField(max_length=200, null=True)
    answer = models.CharField(max_length=10, choices=ANSWERS)
    questionSet = models.ForeignKey(
        QuestionSet, related_name="questions", on_delete=models.CASCADE)

    def __str__(self):
        return self.question

    class Meta:
        db_table = "question"
