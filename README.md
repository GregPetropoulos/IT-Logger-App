# IT-Logger

[Deployed](https://it-support.onrender.com/)

## Intro
A full stack react app with redux for state management. This is an Internal app for IT Department's to trouble-shoot and communicate with a system log. Each Log entry can be set the priority of the issue to high alert. All Logs are read only all authenticated users and the authenticated user has a personal dashboard of their own logs that are capable of create.read.update.delete. A search filter is used to filter through all logs

# Routes

- Protected from each tech. Each Tech can CRUD a log in their own private view. Once Ready a tech can add log to public interface
- A tech can not look at another techs logs
- Only logs shown on public will be seen by others
- Routes that are protected are by design of middleware

## MongoDB (NoSQL)

The database has two collections:

1. logs

2. techs

The collections are created by the mongoose schema in the models folder. The log schema is associated to the tech schema by objectId.

```
const mongoose = require('mongoose');
const LogSchema = mongoose.Schema({
  // *Specific to a users logs
    tech:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'techs'
    },
```

***This allows the tech to have their own private view of the logs on their account.***

## Validation

The express-validator npm package was utilized to handle the backend validation for `Registration`, `Login`, and `Log routes`.
The validation comes after the auth middleware,

```
check('firstName','A first name is required').not.isEmpty(), (req,res)....
```

`.not` negates the result of the next validator in the chain and the `.isEmpty()` returns a boolean value for no errors within the result object
https://express-validator.github.io/docs/validation-result-api.html#isempty

## Authentication

A tech will have an authenticated route to login into after being registered. A middleware is used at login to check and verify the JSON Web Token. The tech.id is then stored in the payload to be used as reference of the logged in user.

### JSON Web Token (JWT)

The JSON Web Token is used to identify the payload data
https://jwt.io/

## Challenges

- Setting token to be checked for all request, adjusting store subscriber and when to loadTech()
- Multiple checkboxes with local state
- Filter state vs filter DB

## Stretch Goals

- Error checking state and component
- Add charts for server and tech statistics
- Change StatusCards for server status to be manage by Redux
- Add Profile Icons
- Tag a tech on a log
- Upload an screenshot to the log
- Comment on a specific log similar to slack channels

## Links
[JWT](https://jwt.io/)

[Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts?s=09)

[React](https://reactjs.org/docs/getting-started.html)

[Materialize](https://materializecss.com/)