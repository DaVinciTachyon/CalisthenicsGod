# !/bin/bash

# ./setUp.sh

sudo docker-compose build
if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose --env-file ./config/.env.production.local up -d
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    sudo docker-compose --env-file ./config/.env.test.local up -d
else
    sudo docker-compose --env-file ./config/.env.development.local up
fi