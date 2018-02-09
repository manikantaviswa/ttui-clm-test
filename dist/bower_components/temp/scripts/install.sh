#!/bin/bash -ue

sudo apt-get install -y npm ruby ruby-dev phantomjs
sudo ln -sfv /usr/bin/nodejs /usr/bin/node

sudo gem install sass  --no-rdoc --no-ri
sudo gem install jekyll  --no-rdoc --no-ri
sudo gem install rouge  --no-rdoc --no-ri

sudo npm install grunt-cli -g
sudo npm install bower -g

