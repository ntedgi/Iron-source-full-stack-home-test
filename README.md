# Iron source full stack home test  - Naor Tedgi  [![Build Status](https://travis-ci.com/ntedgi/Iron-source-full-stack-home-test.svg?token=j5MfTq7AAx3aACrwaz2v&branch=main)](https://travis-ci.com/ntedgi/Iron-source-full-stack-home-test)

- [How I Run This Project Locally?](#how-i-run-this-project-locally-)
- [Continuous Integration](#continuous-integration)
- [Offensive Words Filter]()
- [Client Side](#client-side)
- [User Interface Server - Nginx](#user-interface-server)
- [Api Server ](#api-server)
- [Data Base Modeling](#data-base-modeling)



## How I Run This Project Locally ?

- clone this repository

- Just Want to Play ?
    - At the root project directory, Run: `docker-compose up`
    - Navigate to http://localhost:8080
- Development
    - Run : `cd client && npm install && npm start`
    - Run : `cd server`
    - Run : `nvm use` ( I use Node v10.19.0 )
    - Change : `.env.development` set `DATA_BASE_HOST=localhost`
    - Run : `docker-compose up` to start only Postgres 
    - Run : `npm install && npm start`
    - Navigate to http://localhost:4200
    - The client has proxy to Api Server  


## Continuous integration
- Travis Ci for building and testing


## Offensive Words Filter
- Summary:
  - for this task i use [NeutrinoApi](https://www.neutrinoapi.com/api/bad-word-filter/)
    I use the Free Tier (limited to 50 request per day) of "Bad" Word Filter API  that uses variety of NLP techniques. 
  - because the limit exceed really fast as a fall back I use [web-mech-bad-words](https://github.com/web-mech/badwords) that really on regex close list 
  - to change between them change `.env.development` from
`OFFENSIVE_WORDS_FILTER='webmech'` to
`OFFENSIVE_WORDS_FILTER='neutrino'` 
 




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
- `socket.io` as socket handler
- winston `logger`
- eslint with `eslint-plugin-node` and `babel-eslint` 

Available Scripts:
- `npm start` - runs the app in the development mode.

## Data Base Modeling

### Users

| Column | Email                      |Nick Name| 
| :----: | ----------------------------- | --------- | 
|  Type  | Text   |Text  | 

### Room History

| Column | Room Name             | Message | Sender        |Timestamp|
| :----: | --------------------- | ----------- | ---------- |---------- |
|  Type  | Text  | Text        |   Foreign Key (Users)|Timestamp ( default CURRENT_TIMESTAMP)

### Rooms

| Column | Room Name |Creator| Timestamp|
| :----: | ----------| --------- |--------- | 
|  Type  | Text   |Text   Foreign Key (Users)|Timestamp ( default CURRENT_TIMESTAMP)

