# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    env=.production.local
    options=-d
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    env=.test.local
    if [ -n "$2" ]; then
        options=-d "$2"
    else
        options=-d
    fi
else
    env=.development.local
    options=backend
fi

sudo docker-compose --env-file ./config/.env$env build
sudo docker-compose --env-file ./config/.env$env up $options