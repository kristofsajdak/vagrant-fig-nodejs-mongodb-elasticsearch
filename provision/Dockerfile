FROM dockerfile/nodejs

RUN npm install -g forever
RUN npm install -g node-inspector

RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor

ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

