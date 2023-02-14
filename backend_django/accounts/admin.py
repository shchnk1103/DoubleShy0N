from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms

from accounts.models import User


class AdminConfig(UserAdmin):
    list_display = ("email", "name", "is_superuser", "is_active")
    search_fields = ("name", "email",)
    list_filter = ("email", "is_superuser", "is_active")
    ordering = ('name',)

    fieldsets = (
        (None, {"fields": ("email", "name", "password", "profile_picture")}),
        ("Permissions", {
            "fields": ("is_active", "is_staff", "is_superuser",),
        }),
        # ("Personal", {"fields": ("about",)}),
    )
    # formfield_overrides = {
    #     User.about: {'widget': forms.Textarea(
    #         attrs={'rows': 10, 'cols': 40})}
    # }

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "name", "password1", "password2",
                           "is_active", "is_staff"),
            },
        ),
    )


admin.site.register(User, AdminConfig)
