# Generated by Django 4.1 on 2022-11-24 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('freskbackend', '0008_alter_aktualnosci_content_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aktualnosci',
            name='content',
            field=models.JSONField(default=dict),
        ),
    ]