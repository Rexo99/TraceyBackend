#!/bin/bash
echo Choose a deployment destination:
printf "\t1: Local\n\t2. Remote\n"
echo Choose a number:
read destination
echo --------------------

image=rexo99/tracey:latest


docker image rm "${image}"
if [ "$destination" -eq 2 ]; then
  docker build --platform=linux/amd64 -t "${image}" .
  docker push $image;
  docker --context remote compose down --rmi local
  # docker --context remote compose --env-file ./.env.prod up -d
  docker --context remote compose --env-file ./.env.dev up -d
  docker --context remote ps
else
  docker build -t "${image}" .
  docker compose down --rmi local
  docker compose --env-file .env.dev up -d
  docker ps
fi


echo ""
echo 'Done'