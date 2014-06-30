docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker run -d -it --name db -p 27017:27017 dockerfile/mongodb
docker run -v /vagrant:/src -w /src -it --rm  agco/nodejs-forever npm prune
docker run -v /vagrant:/src -w /src -it --rm  agco/nodejs-forever npm install
docker build -t agco/nodejs-forever /vagrant
docker run -d -v /vagrant:/src -w /src -it --link db:db -p 8080:8080 -p 5858:5858 -e "PORT=8080" agco/nodejs-forever forever -w -c 'node --debug' app.js
alias dl='docker ps -l -q'

