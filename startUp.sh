# !/bin/bash

# ./setUp.sh

sudo docker-compose build
if [ -n "$1" ] && [ "$1" = "production" ]; then
    echo hi
    sudo docker-compose --env-file ./config/.env.production.local up -d
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    echo ello
    sudo docker-compose --env-file ./config/.env.test.local up -d backend
else
    echo bibi
    sudo docker-compose --env-file ./config/.env.development.local up backend
fi