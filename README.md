[![Build Status](https://travis-ci.com/abayo-luc/hello-books-vue.svg?branch=develop)](https://travis-ci.com/abayo-luc/hello-books-vue) [![Coverage Status](https://coveralls.io/repos/github/abayo-luc/hello-books-vue/badge.svg?branch=develop)](https://coveralls.io/github/abayo-luc/hello-books-vue?branch=develop) [![Netlify Status](https://api.netlify.com/api/v1/badges/256659aa-0c4c-4be6-afbe-59a2d3fa63b4/deploy-status)](https://app.netlify.com/sites/hellob-books/deploys)

# hello-books-vue

## Code style & Conventions

The style-guide is `@vue/airbnb`, and it uses prettier for frommating code. To enable `VS Code + ESLint + prettier` follow the steps below:

- Text editor [VSCode](https://code.visualstudio.com)
- In VS Code, `Ctrl + Shift + X`
- Search and install _ESLint_
- Search and install _Prettier Code Formatter_
- Search and install Vue tooling for VS code: _Vetur_
- Restart VS Code.

## Getting Started

### Clone the latest version of the repository

`https://github.com/abayo-luc/hello-books-vue.git` or `git@github.com:abayo-luc/hello-books-vue.git`

### Change directory

`cd into the project directory`

### Update the environment variables in sample.env file and rename it to '.env'

`cp sample.env ./.env`

### Install the project's dependencies with

`npm install`

### Make sure to have the `Vue-CLI` installed

- Install the `Vue CLI`: [Installation](https://cli.vuejs.org/guide/installation.html#installation)
- Customize configuration: [Configuration Reference](https://cli.vuejs.org/config/)

### Testing CI/CD

- Unit test: `npm run test:unit`
- End to End testing: `npm run test:e2e`

### Start the application

`npm run serve`

### Credentials

```source-json
    {
        "email":"super-admin@hellobook.com",
        "password":"password"
    }
```

### Links

[Frontend](https://friendly-bartik-1ca1db.netlify.com/login)
[Backend API](https://hello-book-dev.herokuapp.com/api/v1)
