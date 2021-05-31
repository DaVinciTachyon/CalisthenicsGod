# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose --env-file ./config/.env.production.local build
    sudo docker-compose --env-file ./config/.env.production.local up -d
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    sudo docker-compose --env-file ./config/.env.test.local build
    if [ -n "$2" ] && [ "$2" = "backend" ]; then
        sudo docker-compose --env-file ./config/.env.test.local up -d backend
    elif [ -n "$2" ] && [ "$2" = "website" ]; then
        sudo docker-compose --env-file ./config/.env.test.local up -d website
    else
        sudo docker-compose --env-file ./config/.env.test.local up -d
    fi
else
    sudo docker-compose --env-file ./config/.env.development.local build
    sudo docker-compose --env-file ./config/.env.development.local up backend
fi