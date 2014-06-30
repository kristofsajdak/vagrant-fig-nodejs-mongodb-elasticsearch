
Nodejs:
-------

fig run web npm prune ;
fig run web npm install ;

Mongo:
------
fig run db /bin/sh -c "mongo \$DB_1_PORT_27017_TCP_ADDR"
