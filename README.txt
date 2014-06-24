
Nodejs env shell :
docker run -v /vagrant:/src -w /src -it --rm --link db:db -p 8080:8080 -e "PORT=8080" dockerfile/nodejs bash

Mongo client :
docker run -v /vagrant:/src -w /src -it --rm --link db:db dockerfile/mongodb bash -c 'mongo --host $DB_PORT_27017_TCP_ADDR'