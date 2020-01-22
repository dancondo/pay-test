## Build Setup - Docker (prod)

``` bash
# install docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/

# build production image
$ docker image build -t pay-test:prod --target prod .

# start container
$ docker container run -p 3000:3000 pay-test:prod

```

## Build Setup - Docker (dev)

``` bash
# build development image
$ docker image build -t pay-test --target dev .

# start container
$ docker container run -p 3000:3000 pay-test:dev

```

## Build Setup - Docker (test)

``` bash
# build test image
$ docker image build -t pay-test --target test .

# start container
$ docker container run -p 3000:3000 pay-test:test

```

## Documentation

### API DOCS

After starting your container in production or development access localhost:3000/docs to read the docs.

### FILE STRUCTURE AND APPLICATION LOGIC

##### Data
    Where the lists are located

##### Services 
    Most of application logic can be found under service folder. There are the classes definitions that interact with the given weather and cities lists.

    All the services inherits from ApplicationServices to use base operations.

##### Routes
    There are two: Cities, which targets the city api and Docs, which sets up swagger.

##### Controllers
    Only one controller was made; the cities_controller.
    There you can find two methods index, and show. Each of them are prepared to receive some paramenters to request more information or filter data in the server.

##### Tests
    Where the tests are located.

#### Utils/erros
    A file that contains error information and responses 