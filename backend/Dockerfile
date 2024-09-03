FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

# RUN python manage.py collectstatic --noinput

CMD [ "daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application" ]