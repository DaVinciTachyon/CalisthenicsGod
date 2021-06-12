# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    sudo docker-compose --env-file ./config/.env.production build caddy website backend
    sudo docker-compose --env-file ./config/.env.production up -d caddy
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    if [ -n "$2" ] && [ "$2" = "backend" ]; then
        sudo docker-compose --env-file ./config/.env.test build backend calisthenicsgodb
        sudo docker-compose --env-file ./config/.env.test up -d backend calisthenicsgodb
    elif [ -n "$2" ] && [ "$2" = "website" ]; then
        sudo docker-compose --env-file ./config/.env.test build website backend calisthenicsgodb
        sudo docker-compose --env-file ./config/.env.test up -d website backend calisthenicsgodb
    else
        sudo docker-compose --env-file ./config/.env.test build caddy website backend calisthenicsgodb
        sudo docker-compose --env-file ./config/.env.test up -d caddy website backend calisthenicsgodb
    fi
fi