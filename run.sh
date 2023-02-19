#!/bin/bash

#generate schema.prisma
npx prisma generate
#update db-schema
npx prisma migrate dev --name update --
#run script.ts
npx ts-node src/server.ts

