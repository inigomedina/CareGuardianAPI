# Goal

First exercise for CareGuardian open position Full Stack Software
Engineer.

URL with the exercise's description:
https://gist.github.com/adrianveracom/5628a5b820702d7e543c#file-gistfile1-md

# CareGuardian REST API

REST API for CareGuardian apps using Node.js and Express.js
frameworks, with Mongoose.js for working with MongoDB.

For access control this solution uses OAuth 2.0. OAuth2rize and
Passport.js are used as helpers.

## Running project

You need to have installed Node.js and MongoDB.

### Install dependencies 

To install dependencies enter project folder and run following command:

```
npm install
```

### Creating demo data

To create demo data in your MongoDB execute ```injectData.js``` file

```
node injectData.js
```

### Run server

To run server execute:

```
node bin/www 
```

### Make Requests

Creating and refreshing access tokens:
```
http POST http://localhost:1337/api/oauth/token grant_type=password client_id=adrian client_secret=1234 username=myapi password=abc1234
http POST http://localhost:1337/api/oauth/token grant_type=refresh_token client_id=adrian client_secret=1234 refresh_token=[TOKEN]
```

Creating your CareGiver data:
```
http POST http://localhost:1337/api/caregivers name='Inigo Medina' interests='Philosophy, mathematics' Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
```

Updating your CareGiver data:
```
http PUT http://localhost:1337/api/caregivers/YOUR_CAREGIVER_ID_HERE name='Inigo Medina' interests='Evolution, mathematics' Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
```

Getting your data 
```
http http://localhost:1337/api/users/info Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
http http://localhost:1337/api/caregivers Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
```

## Frontend

There is no frontend GUI for interacting with the data. Curl, httpie
and similar tools are the frontend for managing them.

## Changelog

Control over changes is implemented on the model and on the log too.

## Error handling

Error handling is managed via Winston. Log information is saved to
file 'logs/all.log'.

## Author

This exercise was created by Iñigo Medina
([@inigo_medina](http://twitter.com/inigo_medina)) using popular
tools, frameworks and techniques.

## License

GPL2
