Calculate Order
====================

This file contains the steps required for running calculate order project.

Precondition
====================
 
The project have test dependencies that require Node and NPM.

Environment setup - Windows x64
====================

* 1- Download and install [Node.js v8.11.4](https://nodejs.org/dist/v8.11.4/node-v8.11.4-x64.msi);
* 2- In the folder ```order-price\``` run ```npm install``` for installing modules dependencies;
* 3- In the folder ```order-price\``` run ```npm run CalculateOrder Full_path_to_catalog Product1 Quantity_P1 <Product2 Quantity_P2>``` for calculating an order price;
* 3.1 - Ex.: run ```npm run CalculateOrder /Users/jancleidsson/Projects/order-price/sample.catalog.csv P4 6 P10 5 P12 1```
* 4- If the application was executed with no errors, the console will display the ```Total``` order price;
* 5- In order to execute project tests, in the folder ```order-price\``` run ```npm run test```;

Environment setup - Ubuntu x64
====================

* 1- Download node.js: ```curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -```;
* 2- Install node.js: ```sudo apt-get install -y nodejs```;
* 3- In the folder ```order-price\``` run ```npm install``` for installing modules dependencies;
* 4- In the folder ```order-price\``` run ```npm run CalculateOrder Full_path_to_catalog Product1 Quantity_P1 <Product2 Quantity_P2>``` for calculating an order price;
* 4.1 - Ex.: run ```npm run CalculateOrder /Users/jancleidsson/Projects/order-price/sample.catalog.csv P4 6 P10 5 P12 1```
* 5- If the application was executed with no errors, the console will display the ```Total``` order price;
* 6- In order to execute project tests, in the folder ```order-price\``` run ```npm run test```;

Support
====================
If you have any problem feel free to contact: Jancleidsson Soares <jancleidsson@gmail.com>