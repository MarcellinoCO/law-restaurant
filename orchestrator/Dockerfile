# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /orchestra

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apk add --no-cache gcc musl-dev python3-dev
RUN pip install ruamel.yaml.clib
RUN pip install --upgrade pip
COPY requirements.txt /orchestra/
RUN pip install -r requirements.txt

# copy project
COPY . /orchestra/
