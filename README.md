
Getting Started
---------------

```bash
cd provision
vagrant up
```

When vagrant is up and running, type in following url to verify

```
http://192.168.50.4:8080/
```

Ad-hoc commands
---------------

First

```bash
vagrant ssh
```

And

```bash
fig run web npm prune
fig run web npm install
fig run db /bin/sh -c "mongo \$DB_1_PORT_27017_TCP_ADDR"
```
