# Generated by Django 3.2.3 on 2021-08-28 06:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_month_balance'),
    ]

    operations = [
        migrations.RenameField(
            model_name='month',
            old_name='balance',
            new_name='expenditure',
        ),
        migrations.RemoveField(
            model_name='month',
            name='carry_over',
        ),
    ]
