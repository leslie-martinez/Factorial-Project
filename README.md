# Metrics project

## Goal

This project goal is to post and read metrics.
The metrics should be displayed in a timeline form and be agregrated by average per minute/hour/day.
Each metric should have the following attributes : timestamp, name, value
Metrics should be persisted to the database.

## Endpoints

| Method | path | param | body | description |
| --- | --- | --- | --- | --- |
| GET | /metrics | period: string (optional) <br />date:string (optional) | NA | Get list of all metrics or filtered by optional query params (period & date) |
| GET | /metrics/:id | id: number | NA | Get one metric record by id|
| GET | /metrics/average/:period | period: string | NA | Get list of average metric data by period|
| POST | /metrics | NA | ```{name: string, rating: number}``` | Create a new metric record|
## Technical Stack

### Backend

- Docker
- PostGreSQL
- NodeJS
- TypeScript
- NestJS

### Frontend

- Dart
- Flutter

## Installation

1. Install Docker Desktop on you machine and login with your Docker Hub account.
2. Clone the project from the [repository](https://github.com/leslie-martinez/factorial-project)
3. Create a `.env` file at the root of the project containing the following attributes: 
    > DB_HOST=localhost  
    > DB_DATABASE=factorial_api  
    > DB_PORT=5432  
    > DB_USER=api_user  
    > DB_PASSWORD=password  
4. Open the project in your machine or navigate to the folder in your Terminal and run `npm run start:dev`
5. Your local server should now be running on port 3000. You can access it at `http://localhost:3000`.

## Troubleshooting

1. In case of connection issue with the database, make sure you don't have another local instance running on the same port
2. If your Docker container build seems corrupted (database default data not inserted etc.), proceed to rebuild the container: 
    1. Run `docker-compose down --remove-orphans`
    2. Run `npm run start:dev`


## To go further
In order to enhance the application, we could look into the following items:

1. Handle dates in local time zone
2. Use NestJS class-validator for parameters & body validation to make the app more robust
3. Write unit tests (using Jest for instance)
4. Authentication handler
