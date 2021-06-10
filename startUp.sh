# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose --env-file ./config/.env.production build
    sudo docker-compose --env-file ./config/.env.production up -d
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    sudo docker-compose --env-file ./config/.env.test build
    if [ -n "$2" ] && [ "$2" = "backend" ]; then
        sudo docker-compose --env-file ./config/.env.test up -d backend
    elif [ -n "$2" ] && [ "$2" = "website" ]; then
        sudo docker-compose --env-file ./config/.env.test up -d website
    else
        sudo docker-compose --env-file ./config/.env.test up -d
    fi
else
    sudo docker-compose --env-file ./config/.env.development build
    sudo docker-compose --env-file ./config/.env.development up backend
fi