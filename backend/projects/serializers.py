from rest_framework import serializers
from .models import Project


from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['owner']

    def validate_title(self, value):

        if len(value) < 3:
            raise serializers.ValidationError(
                "Title must be at least 3 characters."
            )

        return value