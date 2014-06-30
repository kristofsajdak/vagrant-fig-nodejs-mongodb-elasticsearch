usermod -a -G docker vagrant ;

apt-get install -q -y --force-yes curl ;
     
curl -L https://github.com/orchardup/fig/releases/download/0.3.2/linux > /usr/local/bin/fig ;

chmod +x /usr/local/bin/fig