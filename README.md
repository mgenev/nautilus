
Project Nautilus
==========================
Building on the lessons of previous stacks, Nautilus aims to explore the latest advances in full stack Javascript  for web development with the goal of being a lightweight, versatile and powerful.

#### Core components
+ Aurelia - Client Side Framework
+ Node - Server Side
+ Koa - Web Server Framework
+ Mongoose - Node-Mongo ORM
+ MongoDB - Database

#### Additional Tools Available
+ Bootstrap - front end framework
+ GraphicMagic - Image manipulation

#### Currently demonstrated features:
 - Geo service for Google Maps
 - Automatically generated REST API for each model

#### Open to contributors
==========================
This project is made for learning. There is no better experience for that than doing. We strongly encourage you to get involved in the project. If you're new to development or new to these technologies, this gives you the unique opportunity to join a real team of experienced professionals which uses best practices and adopts the latest in the field to solve real world requirements. It can teach you to make web apps better than any school or book. 

#### Installation:
==========================
1. Go to the client folder and follow the steps to install Aurelia's prerequisites Gulp and Jspm http://aurelia.io/get-started.html
2. from ./ run `gulp babel` and `gulp watch` 
3. `npm install` in both /client and /es5_server folders
4. `jspm install -y` in /client
5. run server with ./es5_server node server
6. run client with ./client/gulp watch

These instructions tell gulp to take the es6-7 code in /server and transpile it into /es5_server which we then run. With gulp watch in ./ any future changes to the /server code will be retranspiled into /es_server. If you use nodemon in /es5_server it will automatically reboot.

#### Support:
==========================
If you have questions about this project, come to the chat for the SANE stack https://gitter.im/artificialio/sane

[gitter-badge-url]: https://gitter.im/artificialio/sane?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
