from django.conf import settings
from django.db import models


class UserRole(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='urole')
    role = models.ForeignKey('Role')


class Role(models.Model):
    name = models.CharField('Role', max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
