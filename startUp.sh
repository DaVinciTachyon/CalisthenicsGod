# !/bin/bash

# ./setUp.sh

if [$1 == 'production']
then
    sudo docker-compose up --env-file ./config/.env.production.local -d --build
elif [$1 == 'test']
then
    sudo docker-compose up --env-file ./config/.env.test.local -d --build
else
    sudo docker-compose up --env-file ./config/.env.development.local --build
fi