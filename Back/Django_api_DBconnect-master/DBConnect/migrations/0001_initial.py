# Generated by Django 3.1.8 on 2021-04-22 08:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SkdevsecBag',
            fields=[
                ('bag_id', models.AutoField(primary_key=True, serialize=False)),
                ('uid', models.IntegerField()),
                ('pid', models.IntegerField()),
            ],
            options={
                'db_table': 'skdevsec_bag',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecBoard',
            fields=[
                ('bid', models.AutoField(primary_key=True, serialize=False)),
                ('btitle', models.CharField(max_length=100)),
                ('btext', models.CharField(max_length=5000)),
                ('bfile', models.CharField(max_length=100)),
                ('bview', models.IntegerField()),
                ('bcomment', models.IntegerField()),
                ('unickname', models.IntegerField()),
                ('bcreate_date', models.CharField(max_length=50)),
                ('bcate', models.CharField(max_length=50)),
                ('block', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'skdevsec_board',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecComment',
            fields=[
                ('cid', models.AutoField(primary_key=True, serialize=False)),
                ('bid', models.IntegerField()),
                ('unickname', models.CharField(max_length=50)),
                ('ctext', models.CharField(max_length=300)),
                ('ccreate_date', models.CharField(max_length=50)),
                ('clock', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'skdevsec_comment',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecOrderproduct',
            fields=[
                ('opid', models.AutoField(primary_key=True, serialize=False)),
                ('oid', models.IntegerField()),
                ('pname', models.CharField(max_length=50)),
                ('pcate', models.CharField(max_length=50)),
                ('pprice', models.IntegerField()),
                ('pcount', models.IntegerField()),
            ],
            options={
                'db_table': 'skdevsec_orderproduct',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecOrderuser',
            fields=[
                ('oid', models.AutoField(primary_key=True, serialize=False)),
                ('uid', models.CharField(max_length=50)),
                ('oname', models.CharField(max_length=50)),
                ('ophone', models.CharField(max_length=50)),
                ('oaddress', models.CharField(max_length=50)),
                ('order_date', models.CharField(max_length=50)),
                ('oprice', models.IntegerField()),
            ],
            options={
                'db_table': 'skdevsec_orderuser',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecProduct',
            fields=[
                ('pid', models.AutoField(primary_key=True, serialize=False)),
                ('pname', models.CharField(max_length=50)),
                ('pcate', models.CharField(max_length=50)),
                ('pimage', models.CharField(max_length=50)),
                ('ptext', models.CharField(max_length=50)),
                ('pprice', models.IntegerField()),
                ('pcreate_date', models.CharField(max_length=50)),
                ('preview', models.IntegerField()),
                ('preview_avg', models.FloatField()),
                ('pcount', models.IntegerField()),
            ],
            options={
                'db_table': 'skdevsec_product',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecReview',
            fields=[
                ('rid', models.AutoField(primary_key=True, serialize=False)),
                ('pid', models.IntegerField()),
                ('rstar', models.FloatField()),
                ('unickname', models.CharField(max_length=50)),
                ('rcreate_date', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'skdevsec_review',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SkdevsecUser',
            fields=[
                ('uid', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('upwd', models.CharField(max_length=50)),
                ('unickname', models.CharField(max_length=50)),
                ('uname', models.CharField(max_length=50)),
                ('umail', models.CharField(max_length=50)),
                ('uphone', models.CharField(max_length=50)),
                ('ucreate_date', models.CharField(max_length=50)),
                ('authority', models.IntegerField()),
            ],
            options={
                'db_table': 'skdevsec_user',
                'managed': True,
            },
        ),
    ]