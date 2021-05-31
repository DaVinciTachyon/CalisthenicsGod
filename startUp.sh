# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose up -d --build --env-file ./config/.env.production.local
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    sudo docker-compose up -d --build --env-file ./config/.env.test.local
else
    sudo docker-compose up --build --env-file ./config/.env.development.local
fi