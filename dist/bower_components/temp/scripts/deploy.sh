#!/bin/bash -ue

rm -rf /var/www/radiator/*
zip -r tecnotree-ui-library.zip dist/ bower.json 
cp tecnotree-ui-library.zip /var/www/radiator/tecnotree-ui-library.zip
