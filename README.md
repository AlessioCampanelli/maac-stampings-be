# maac stamping project

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="http://www.indianagolfriccione.it/img/bandatop.png" width="320" alt="Latte e Coccole Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <!-- <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p> -->

## Description

Using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
A secure API developed

please use version's Node: `12.16.1 (stable)` or last actually `15.12.0`

if you use NVM manager, you can set this version by default with: `nvm alias default 12`

With maac-stampings you can stamp your turn.

## Installation (.env config environment)

create a .env _configuration file_ with this key (and relative values)

- PORT
- SECRET_KEY_JWT
- DB_URL
- DB_PORT
- DB_ADMIN_USER
- DB_ADMIN_PWD
- DB_USER
- DB_PWD
- DB_NAME

```bash
$ docker-compose --build
```

## Installation (initialize MongoDB)

if you have another container who's using mongodb port you can do this:

```bash
$ docker container ls
$ docker rm -f <ID_CONTAINER>
```

Docker MongoDB init will create automatically an 'admin' DB, so, in case of mongo-init.js script not properly works, you can create from terminal your initial Database and relative user.

```bash
$ docker exec -it <YOUR_NAME_MONGODB_CONTAINER> bash
$ mongo -u <ROOT_USERNAME> -p <ROOT_PWD> --authenticationDatabase admin
$ use <YOUR_DB>
$ db.createUser({user: <USER>, pwd: <PWD>, roles: [{role: "readWrite", db: <YOUR_DB>}]});
```

the created user will be used in Mongoose Connection (in your app.module.ts)

## update Node to Stable version

`nvm install stable --reinstall-packages-from=current`

## update Angular Cli

`npm uninstall -g @angular-cli`
`npm install -g @angular/cli@latest`

## Docker instruction

if you must build a certain service (for example if you've installed new npm packages):

```bash
docker-compose up --build -V
```

or single service

```bash
$ docker-compose up -d --no-deps --build <YOUR_SERVICE>
```

To remove image:

```bash
$ docker images
$ docker image rm <YOUR_ID_IMAGE>
```

Enter in Main container bash
`docker exec -it main-container-stampings //bin//sh`

Cleaning the old volumes
`$ docker volume rm $(docker volume ls -qf dangling=true)`

## Rebuild app

to change content in Main Container:

`npm run build` in this way, /dist folder will be recreated
`$ docker-compose up -d --no-deps --build <YOUR_SERVICE>` to build single service.
The principal in our application is `Main`.

To rebuild this image you must use `docker-compose build` or `docker-compose up --build`

## Deploy app

1. connect to EC2 AWS instance (check security group for validating your IP address) via terminal: `ssh -i "path/your.pem" your-user@xxxxxx.us-east-2.compute.amazonaws.com`
2. `git pull` from Main branch.
3. `npm run build`
4. `$ docker-compose up -d --no-deps --build Main` or build other docker services
5. `$ docker-compose restart`

in case of expiration of HTTPS certs, you can run `sudo ./init-letsencrypt.sh` script to regenerate it!

## Running the app

```bash
# development
$ docker-compose up
```

or

```bash
# Production
$ docker-compose start
```

## Modify MongoDB models

Remember to modify:

- \*.interface.ts
- \*.schema.ts
- \*.dto.ts

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Alessio Campanelli
- Website - [https://alessiocampanelli.it](https://alessiocampanelli.it/)

## License

Nest is [MIT licensed](LICENSE).
