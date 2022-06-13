# Space-Launch-API

## Introduction
This is a Space launch API that can be used to get information about upcoming launches from SpaceX and even add and manage your own launches. It makes use of the SpaceX API to get the information about their upcoming launches.

For your own launches, you can schedule your missions to different habitable planets inside our splanet system. These planets were filtered from data by NASA about the discovered planets in our solar system. 

They were filtred on basis of the following criteria:
- koi_disposition === "CONFIRMED" 
- koi_insol > 0.36 
- koi_insol < 1.11 
- koi_prad < 1.6
  
## Usage
This API has 4 endpoints:

(these examples were shortened to make them more readable)
#### GET planets
Make `GET` request to `http://localhost:8000/planets` to get a list of all the habitable planets in our solar system.
##### Response:
```
[
    {
        "keplerName": "Kepler-1652 b",
        "__v": 0
    },
    {
        "keplerName": "Kepler-442 b",
        "__v": 0
    }
]
```
#### GET launches
Make `GET` request to `http://localhost:8000/launches/` to get the list of all launches.
##### Response:
```
[
    {
        "flightNumber": 1,
        "customers": [
            "DARPA"
        ],
        "launchDate": "2006-03-24T22:30:00.000Z",
        "mission": "FalconSat",
        "rocket": "Falcon 1",
        "success": false,
        "upcoming": false
    },
    {
        "flightNumber": 2,
        "customers": [
            "DARPA"
        ],
        "launchDate": "2007-03-21T01:10:00.000Z",
        "mission": "DemoSat",
        "rocket": "Falcon 1",
        "success": false,
        "upcoming": false
    },
    {
        "flightNumber": 3,
        "customers": [
            "NASA",
            "ORS"
        ],
        "launchDate": "2008-08-03T03:34:00.000Z",
        "mission": "Trailblazer",
        "rocket": "Falcon 1",
        "success": false,
        "upcoming": false
    },
]
```
#### GET launches paginated
Make `GET` request to `http://localhost:8000/launches?limit=10&page=18` to get the list of launches paginated. You need to pass limit and page as parameters.
##### Response:
```
[
    {
        "flightNumber": 180,
        "customers": [
            "NASA",
            "NASA"
        ],
        "launchDate": "2022-09-20T00:00:00.000Z",
        "mission": "Psyche & Janus",
        "rocket": "Falcon 9",
        "success": null,
        "upcoming": true
    },
    {
        "flightNumber": 183,
        "customers": [
            "DigitalGlobe"
        ],
        "launchDate": "2022-09-01T00:00:00.000Z",
        "mission": "WorldView Legion 1 & 2",
        "rocket": "Falcon 9",
        "success": null,
        "upcoming": true
    },
]
```
#### POST launch
Make `POST` request to `http://localhost:8000/launches/` to add a new launch. You need to pass the following parameters:
```
{
  "mission": "example mission",
  "rocket": "example rocket",
  "launchDate": "December 27, 2029",
  "target": "Kepler-1652 b"
}
```
##### Response:
```
{
    "mission": "example mission",
    "rocket": "example rocket",
    "launchDate": "2029-12-26T23:00:00.000Z",
    "target": "Kepler-1652 b",
    "success": true,
    "upcoming": true,
    "customers": "NASA",
    "flightNumber": 195
}
```
#### DELETE launch
Make `DELETE` request to `http://localhost:8000/launches/ID` to delete a launch. You need to pass the ID of the launch as a parameter.
##### Response:
```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
Launch will be set as `upcoming` to false and `success` to false.
##### This is how the launch looks after deletion:
```
    {
        "flightNumber": 195,
        "customers": [
            "NASA"
        ],
        "launchDate": "2029-12-26T23:00:00.000Z",
        "mission": "example mission",
        "rocket": "example rocket",
        "success": false,
        "target": "Kepler-1652 b",
        "upcoming": false
    }
```
### Technologies used
Backend of this API runns on **Node.js** with **express**.

This API stores the data in a **MongoDB** database, which is hosted on **Atlas**, and is interacted with by **Mongoose**.

To make requests to the **SpaceX API**, it's using axios, and to parse the csv file with planets from nasa, it uses **csv-parse**.

## Running the project

### Install the dependancies
```
npm install
``` 
### Creating .env file
You need to create a `.env` file in the `/src` directory

In this file you should include:
- `PORT` - on which the application will run on
- `MONGO_URI` - a connect URI to your mongoDB database
  
### Start the application 
```
npm start
```
### Start the application in development mode (hot-code reloading)
```
npm run dev
```
