# !/bin/bash

# ./setUp.sh

if [ -n "$1" ] && [ "$1" = "production" ]; then
    git pull
    sudo docker-compose --env-file ./config/.env.production build caddy website backend
    sudo docker-compose down
    sudo docker system prune -f
    sudo docker-compose --env-file ./config/.env.production up -d caddy
elif [ -n "$1" ] && [ "$1" = "test" ]; then
    if [ -n "$2" ] && [ "$2" = "backend" ]; then
        sudo docker-compose --env-file ./config/.env.test build backend calisthenicsgoddb
        sudo docker-compose --env-file ./config/.env.test up -d backend calisthenicsgoddb
    elif [ -n "$2" ] && [ "$2" = "website" ]; then
        sudo docker-compose --env-file ./config/.env.test build website backend calisthenicsgoddb
        sudo docker-compose --env-file ./config/.env.test up -d website backend calisthenicsgoddb
    else
        sudo docker-compose --env-file ./config/.env.test build caddy website backend calisthenicsgoddb
        sudo docker-compose --env-file ./config/.env.test up -d caddy website backend calisthenicsgoddb
    fi
fi