# !/bin/bash

# ./setUp.sh

sudo docker-compose build
if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose up -d --env-file ./config/.env.production.local
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    sudo docker-compose up -d --env-file ./config/.env.test.local
else
    sudo docker-compose up --env-file ./config/.env.development.local
fi