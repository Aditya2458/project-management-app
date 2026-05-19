from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer
from projects.models import Project


class TaskListCreateView(generics.ListCreateAPIView):

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        project_id = self.kwargs['project_id']

        queryset = Task.objects.filter(
            project__id=project_id,
            project__owner=self.request.user
        )

        status = self.request.query_params.get('status')

        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):

        project_id = self.kwargs['project_id']

        project = Project.objects.get(
            id=project_id,
            owner=self.request.user
        )

        serializer.save(project=project)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(
            project__owner=self.request.user
        )