#!/bin/bash
echo Enty new version Number for the docker image:
printf "Pattern: n.n (e.g. 2.1)"
echo Choose a number:
read version
echo --------------------

echo Choose a deployment destination:
printf "\t1: Local\n\t2. Remote\n"
echo Choose a number:
read destination
echo --------------------

image=erik/tracey:${version};
echo "image = ${image}" > .env.dev


if [ "$destination" -eq 2 ]; then
  docker --context remote compose down --rmi local
  # docker --context remote compose --env-file ./.env.prod up -d
  docker --context remote compose --env-file ./.env.dev up -d
  docker --context remote ps
else
  docker compose down --rmi local
  docker compose --env-file .env.dev up -d
  docker ps
fi


echo ""
echo 'Done'