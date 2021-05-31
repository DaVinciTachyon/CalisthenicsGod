# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose --env-file ./config/.env.production.local build
    sudo docker-compose --env-file ./config/.env.production.local up -d
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    sudo docker-compose --env-file ./config/.env.test.local build
    sudo docker-compose --env-file ./config/.env.test.local up -d backend
else
    sudo docker-compose --env-file ./config/.env.development.local build
    sudo docker-compose --env-file ./config/.env.development.local up backend
fi