# Generated by Django 5.0.2 on 2024-03-04 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_customer_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contractor',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=2),
        ),
    ]