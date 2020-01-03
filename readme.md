# GraphQL: Library Management API

- Version : 1.0.0
- Author : Dogukan Ermis, Jennifer Hautcourt, Ismail El Ayadi

### Description

A Library Management API written in GraphQL, NodeJS, Express and JWT (Authentication)

### What it does

- User authentication
- Create, read, update, delete books
- Create, read, update, delete comments for a specific book
- A user can borrow up to 5 books, for a month
- If a book is not returned after the deadline, it will not be able to borrow a new book until it has returned it
- Comments Management System (User reviews)
- Encode the books via their ISBN number

### How to use

### 0. Go to:

[Library Management System](https://libraryql.glitch.me/graphql)

### 1. Login to be able to make requests:

```graphql
query {
  login(name: "test", password: "test") {
    token
  }
}
```

### 2. Insert generated Token in the HTTP HEADERS field:

```graphql
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDljMzM5M2MxNjBlMWIzYWNjYzZlMyIsImlhdCI6MTU3ODA0MjIzNywiZXhwIjoxNTc4MTYyMjM3fQ.VKK1VmvCah7kHIlMVOMx7Ea6WV_nLsKh--04H2GICXU"
}
```

### 3. Start making queries such as:

```graphql
query {
  books {
    title
    subtitle
    stock
    available
  }
}
```

### 4. Check the docs in the GraphQL Editor to see all available requests

### Built With

- [GraphQL](https://graphql.org/) - A query language for your API
- [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [JWT](https://jwt.io/) - Token Signing/Verification
