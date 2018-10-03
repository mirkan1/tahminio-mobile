# tahminioRN
- Mobile view for tahmin.io

# TO INSTALL REQUIREMENTS
- npm shrinkwrap
- npm install

# TO RUN
- react-native run-android

# REACT DEBUG PROBLEM
- Go to http://localhost:8081/debugger-ui/ . Then stop remote js debugging and run your react native app again. Finally debug js remotely. - Has worked for me.

# Babel patch fix
- npm add @babel/runtime

## TO RUN [import fs from 'fs';] like modules 
- node --experimental-modules ["INSERT YOUR JS FILE NAME HERE"].mjs
- or use var [fs = require('fs')] instead

## Redux
- npm install --save reduct react-redux
