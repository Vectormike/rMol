# Stackoverflow API

This application allows you to register, login, ask Questions, reply and subscribe to Questions.

# STEPS TO RUN APP

### Step 1: Start up the containers

RUN `docker-compose up -d on the root directory of the project`

### RUN test in docker container

`docker exec -t -i app npm run test`

### Run Migration

`docker exec -t -i app knex migrate:latest`

### App Features

- Create a user account
- Login a user
- Fetch a list of all question
- Ask a question
- Answer a specific question
- Subscribe to a question

# Token Management

JWT was used for token along with redis for implementing refresh tokens

## View Application logs on Kibana

Logging was implemented with winton and elastic search
[Kibana board](http://localhost:5601/app/kibana#/discover)

#### POSTMAN API Documentation.

[Postman Api documentation](https://documenter.getpostman.com/view/5622145/TzsbLSvL)

#### Requirements not covered

- 85% test coverage not achieved

#### Issues faced

- No free time to take on the assessment.
- Subscribe feature not clear(By the way, I implemented a Redis Pub/Sub for it).
