

Kickstart your next Nodejs-Express-Mongodb-Elasticsearch project with Docker and Fig.

Works on every OS where you can install Vagrant ( Windows, Mac and Linux )

Just work through the Getting Started section and you are good to go !


Getting Started
---------------

Download and install Vagrant :
```
https://www.vagrantup.com/downloads
```

Download and install Virtualbox for your host os :
```
https://www.virtualbox.org/wiki/Downloads
```

OPTIONAL : Install vagrant-cachier to cache packages across various VMs
```bash
vagrant plugin install vagrant-cachier
```

Then
```bash
cd provision
vagrant up
```

When vagrant is up and running

To verify that Nodejs and express is up and running, type in your browser :
```
http://192.168.50.4:8080/
```

Launch node-inspector, type in your browser :
```
http://192.168.50.4:8081/debug
```

Ad-hoc commands
---------------

ssh into the Vagrant box
```bash
vagrant ssh
```

Launch some typical ad-hoc commands as during development
```bash

fig run web npm prune
fig run web npm install

fig run db /bin/sh -c "mongo 192.168.50.4:27017"
```
