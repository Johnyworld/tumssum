# Generated by Django 3.2.3 on 2021-08-16 06:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210805_1028'),
    ]

    operations = [
        migrations.AddField(
            model_name='month',
            name='bank',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.bank'),
            preserve_default=False,
        ),
    ]