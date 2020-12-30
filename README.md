# HAUFE Coding Test

## Objective

We need a fancy application, with backend and frontend, which consume the public API of Rick & Morty: https://rickandmortyapi.com. This API should be consumed from your backend application, not directly from the frontend.

## Getting started


### Backend

Prerequisites:

  - MONGO_URI and JWT_KEY environment variables must exist. Please ask for MONGO_URI details as I will not expose it in a public repo.

Backend is an Express REST Api with MONGODB database. You can find its file structure below

| Name      | Description |
| -----------    | -----------                                        |
| package.json      | Revelevant project metadata|
| tsconfig.json      | Typescript configuration file|
| backend\src   | Contains backend source code|
| backend\src\constants     | Constants used across the backend|
| backend\src\errors     | Helper classes for error handling|
| backend\src\interfaces     | Typescript interfaces|
| backend\src\middlewares     | Express middlewares|
| backend\src\models     | MongoDB models|
| backend\src\routes     | Rest api Express routes|
| backend\src\services     | Service helpers|
| test\setup.ts      | Test environment setup|
| app.ts      | App initialization|
| index.ts      | Server and database connection initialization|

Extra libraries:

  - @types/cookie-session
    cookie-session library typescript types
  - @types/express
    express types for typescript
  - @types/jsonwebtoken
    jsonwebtoken types for typescript
  - @types/mongoose
    mongoose types for typescript
  - axios
    Library to make http requests
  - cookie-session
    Library to help with session cookies
  - express-async-errors
    Helper library to deal with async errors for express
  - express-validator
    Library to help with server side validation
  - graphql
    Library to send requests to rick and morty graphql api
  - graphql-request
    Graphql client library to make graphql requests easily
  - helmet
    Helps to improve server side security
  - jsonwebtoken
    JSON Web token library for authentication
  - mongoose
    Mongodb javascript client
  - ts-node
    Execute typescript for node
  - ts-node-dev
    Execute typescript for node in dev environment
  - typescript
    Typescript library
  - @types/jest
    Jest typescript types
  - @types/supertest
    Supertest types
  - jest
    Testing library
  - mongodb-memory-server
    Mongodb server in memory for testing purposes
  - supertest
    Http testing library
  - ts-jest
    Jest for typescript library

### Frontend

Frontend has been developed using ReactJS and Redux as application storage.

| Name      | Description |
| -----------    | -----------                                        |
| __test__      | Integration tests|
| package.json      | Revelevant project metadata|
| tsconfig.json      | Typescript configuration file|
| client\public   | Contains frontend public assets|
| client\src   | Contains frontend source code|
| client\src\actions   | Redux action handlers|
| client\src\components   | React components and tests|
| client\src\constants   | Application wide constants|
| client\src\reducers   | Application reducers|
| client\src\test   | Test utils|
| client\src\utils   | Application wide utils|

Extra libraries:

- enzyme
  Testing library for react
- moxios
  Axios mock library for http mock
- react-loader-spinner
  Spinner component to make it look better while waiting
- react-preload-image
  Images preloader for react
- react-router-dom
  React navigation library
- redux-mock-store
  Library to mock redux store
- redux-thunk
  React redux middleware to help with async actions
- @babel/preset-env
  @babel/preset-react
  Babel presets libraries
- @wojtekmaj/enzyme-adapter-react-17
  Enzyme unofficial adapter for react 17
- babel-jest
  Babel jest transpiler

### Infrastructure

The system has not been deployed to any cloud provider. It can be run by executing npm run start under both client and api directories.
