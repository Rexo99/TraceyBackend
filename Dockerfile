FROM node

WORKDIR /app

COPY . .

CMD [ "./run.sh" ]