# GraphQL: Library Management API

- Version : 1.0.0
- Author : Dogukan Ermis, Jennifer Hautcourt, Ismail El Ayadi

### Description

A Library Management API written in GraphQL, NodeJS, Express and JWT (Authentication)

### How to use

[Library Management System](https://libraryql.glitch.me/graphql)

```graphql
query {
  login(name: "test", password: "test") {
    token
  }
}
```

### Built With

- [GraphQL](https://graphql.org/) - A query language for your API
- [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [JWT](https://jwt.io/) - Token Signing/Verification
