# Iron source full stack home test  - Naor Tedgi

- [How I Run This Project Locally?](#how-i-run-this-project-locally-)
- [Offensive Words Filter]()
- [Client side](#client-side)
- [User Interface Server - Nginx](#user-interface-server)
- [Api Server ](#api-server)
- [Data Base Modeling](#data-base-modeling)
- [Continuous integration](#continuous-integration)


## How I Run This Project Locally ?

- clone this repository

- Just Want to Play ?
    - At the root project directory, Run: `docker-compose up`
    - Navigate to http://localhost:8080
- Development
    - Run : `nvm use` ( I use Node v10.19.0 )
    - Run :  Postgres 
    - At the root project directory:
    - Run : `cd client && npm install && npm start`
    - Run : `cd server && npm install && npm start`
    - Navigate to http://localhost:4200
    - The client has proxy to Api Server  


## Offensive Words Filter
Summary:
- for this task i use [NeutrinoApi](https://www.neutrinoapi.com/api/bad-word-filter/)
- I use the Free Tier (limited to 50 request per day) of "Bad" Word Filter API  


## Client side

Summary:

- Client side written in `angular`
- Component theme style - [Primeng](https://www.primefaces.org/primeng/),

## User Interface Server

Summary:
- angular production bundle serve using Nginx

## Api Server
Summary:

- Server side written in `NodeJs`
- `Express` Http Server
- `PostgresSQL` as Data Base
- `dotenv` to handle environment variables
- winston `logger`
- eslint with `eslint-plugin-node` and `babel-eslint` for ES6 support and flow for linting

Available Scripts:
- `npm start` - runs the app in the development mode.

## Data Base Modeling

### Users

| Column | Email                      |Nick Name| 
| :----: | ----------------------------- | --------- | 
|  Type  | Text   |Text  | 

### Room History

| Column | Room Name             | Message | Sender Email       |Timestamp|
| :----: | --------------------- | ----------- | ---------- |---------- |
|  Type  | Text  | Text        |   Foreign Key (Users)|Timestamp ( default CURRENT_TIMESTAMP)

### Rooms

| Column | Room Name |Creator| Timestamp|
| :----: | ----------| --------- |--------- | 
|  Type  | Text   |Text   Foreign Key (Users)|Timestamp ( default CURRENT_TIMESTAMP)


## Continuous integration
- Travis Ci for building and testing
