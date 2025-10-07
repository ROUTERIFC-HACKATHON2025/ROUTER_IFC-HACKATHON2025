web: cd BackEnd1 && gunicorn --bind 0.0.0.0:$PORT config.wsgi:application
release: cd BackEnd1 && python manage.py migrate --noinput && python manage.py collectstatic --noinput