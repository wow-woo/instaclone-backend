Instagram clone coding

### Following a lecture and learn from it.

### Stop learning theory and war-gaming in my brain,

### Start coding

### Nodemon : execute and watch on a file

- 1. nodemon --exec node server.js
- nodemon exec "node server.js" script
- 2. nodemon server.js
- second way is more efficient i believe.
- 3. delay restarting server
- since you reboot server too fast before current server killed, the port is occupied already.
- append --delay 2s

### ES Module or commonjs Module

- specify module for type in package.json for ES Module usage

### graphQL

- graphql query placed in body of http.
- graphql on top of http
- GraphQL services can be written in any language. Since we can't rely on a specific programming language syntax, like JavaScript, to talk about GraphQL schemas, we'll define our own simple language. We'll use the "GraphQL schema language" - it's similar to the query language, and allows us to talk about GraphQL schemas in a language-agnostic way
- type statement defines graphQL object types.
- The most basic components of a GraphQL schema are GraphQL object types
- String is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query.
- All arguments are named. Unlike languages like JavaScript and Python where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically.

- typeDefs (graphQL type object with graphQL schema langue)
- resolvers

#### graphql context

- graphql context could be an object or a function
- you could set context, as you set up a graphql server.
- you could access to context from all resolvers
- context function takes arguments holding http request, http response

#### gql

- gql template literal tag can be used to concisely write a GraphQL query that is parsed into a standard GraphQL AST. It is the recommended method for passing queries to Apollo Client.

#### graphQL AST

- AST = abstract syntax tree
- graphQL server processes graphQL AST
- graphQL queries are in tree structure, not in raw strings

#### graphQL objects

- type

type Orange{

}

type Query{

}

- scalar
  scalar MyDate

- interface
  interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  }
- Union types
  union SearchResult = Human | Droid | Starship

- input types

This is particularly valuable in the case of mutations, where you might want to pass in a whole object to be created. In the GraphQL schema language, input types look exactly the same as regular object types, but with the keyword input instead of type:

input ReviewInput {
stars: Int!
commentary: String
}

#### graphQL scalar type

- Int: A signed 32‐bit integer.
- Float: A signed double-precision floating-point value.
- String: A UTF‐8 character sequence.
- Boolean: true or false.
- ID: The ID scalar type represents a unique identifier
- to specify custom scalar types. For example, we could define a Date type:

scalar Date

#### graphql Upload

- Upload scalar type
  build-in type for file uploading of apollo server
- Upload : createReadStream fn error
- add into package.json

1.  "resolutions": {
    "fs-capacitor": "^6.2.0",
    "graphql-upload": "^11.0.0"
    }
2.  npx npm-force-resolutions

### file system

- readStream
  it could read file stream

- writeStream from 'fs'
  it could create file stream
- readStream pipes to writeStream. then, writeStream would save the file.

### graphql computed field

- object type could be root
- root is relative
- type User is root for id and userName
- every field could have a resolver
- sub-field resolver could access to value of resolved root with root parameter.

  type User {
  id
  userName
  }

User : root field
id : sub field

#### field resolving flow

1. receive a query.
2. root is resolved.
3. look if there is resolvers for sub-fields.
4. if there is a resolver for the field,
   resolved value of root is passed to sub-field
5. all possible sub-fields are resolved.
6. fill or overwrite the field with value
7. all possible field is being resolved. the query is resolved.

- graphql query

  <!-- query{         >>> being resolved 1 -->
  <!--  seeProfile{      >>> being resolved 2 -->
  <!--    id                 >>> being resolved 3 -->
  <!--    userName             >>> being resolved 4 -->
  <!--  } -->
  <!-- } -->

### apollo-server-express

- topping apollo server on /graphql url on express server
  import {graphqlExpress } from 'apollo-server-express'
- this is NOT just a apollo server. so it is more flexible and functional
- set Routers, expose endpoints

### express server

#### expose static files

- app.use(endpoint, assetRoute)
  app.use('static', express.static('uploads'))

### morgan logger

- set morgan middleware to log network request

#### Yvfgf naq Aba-Ahyy

type Character {
name: String!
appearsIn: [Episode]!
}

### Prisma

- as you update database, prisma ignore false-value (undefined, null).

#### Postgres

- connection to a Database with name and owner of.

#### Prisma Migrate

- npx prisma migrate
  sync prisma schema to database (SQL schema), according to schema.prisma
- npx prisma migrate dev
  sync prisma schema to database (SQL schema), according to schema.prisma with auto-generated prisma client for development.
- register all schema changes and recorded as SQL in migration.sql

#### Prisma Server

- Provide database data migrated.

#### Prisma studio

- npx prisma studio
  visual editor server running on browser
- you can CRUD on database

### prisma client

- where
  specify target

- include
  retrieve relations

- data
  specify data that you want to work with

### how to retrieve relations with prisma

1. include property
2. entityPromise.subRelationName() fn

### Prisma Relation filters

Filter records by field of Related table's records

- every
- some : all records, that some records of related table have the value in specific filed
  Returns all records where one or more ("some") related records match filtering criteria.
- none

### pagination with prisma

1. offset pagination

- easy to skip and take amount of records that you want
- jump to specific page
- traverse all the records to skip
- you can paginate the sam result set in any sort order

2. cursor-based pagination

### graphql-tools

- npm i graphql-tools
  Integrate multiple typeDefs and multiple resolvers in ONE respectively.

- create 'makeExecutableSchema' with merged typeDefs and merged resolvers.

- Build A big schema with A big resolver.

### file system

- \_\_filename 은 현재 실행 중인 파일 경로
- \_\_dirname 은 현재 실행 중인 폴더 경로

### dotenv

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

- npm i dotenv

## prisma relation

- many to many : No need of @relation
- one to many : Add @relation to many part of entity

  entities : user - photo

  userId field is needed in photo entity

  model Photo {
  userId Int
  user User @relation(fields:[userId], references:[id])
  }

### self relation

- many to many self relation
  follower and following
