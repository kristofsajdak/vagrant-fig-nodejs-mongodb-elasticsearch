FROM dockerfile/nodejs
RUN npm install -g forever
EXPOSE 8080
CMD forever -w -c 'node --debug' app.js