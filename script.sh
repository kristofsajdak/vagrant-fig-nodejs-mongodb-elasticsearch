docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker run -d -it --name db -p 27017:27017 dockerfile/mongodb
docker run -d -v /vagrant:/src -w /src -it --link db:db -p 8080:8080 -e "PORT=8080" dockerfile/nodejs bash