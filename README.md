

Kickstart your next Nodejs-Express-Mongodb-Elasticsearch project with Docker and Fig.

Works on every OS where you can install Vagrant ( Windows, Mac and Linux )

Just work through the Getting Started section and you are good to go !


Getting Started
---------------

First of all, download and install the enabling software

Vagrant :
```
https://www.vagrantup.com/downloads
```

Virtualbox:
```
https://www.virtualbox.org/wiki/Downloads
```

Clone the repo and vagrant up

```bash
git clone https://github.com/kristofsajdak/vagrant-fig-nodejs-mongodb-elasticsearch
cd vagrant-fig-nodejs-mongodb-elasticsearch/provision
vagrant up
```

When vagrant is up

Check Nodejs and Express, type in your browser :
```
http://192.168.50.4:8080/
```

Launch node-inspector, type in your browser :
```
http://192.168.50.4:8081/debug
```

Check Elasticsearch, type in your browser :
```
http://192.168.50.4:9200
```

Ad-hoc commands
---------------

ssh into the Vagrant box
```bash
vagrant ssh
```

Launch some frequently used ad-hoc commands
```bash

fig run web npm prune
fig run web npm install

fig run db /bin/sh -c "mongo 192.168.50.4:27017"

```
