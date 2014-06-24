docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker run -d -it --name db -p 27017:27017 dockerfile/mongodb
