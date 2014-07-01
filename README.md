
Getting Started
---------------

```bash
cd provision
vagrant up
```

Ad-hoc commands
---------------

```bash
vagrant ssh
```

and

```bash
fig run web npm prune
fig run web npm install
fig run db /bin/sh -c "mongo \$DB_1_PORT_27017_TCP_ADDR"
```
