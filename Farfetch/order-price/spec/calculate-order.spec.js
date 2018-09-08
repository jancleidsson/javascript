 /*
  * CalculateOrder 1.0.0
  * Licensed under MIT, https://opensource.org/licenses/MIT
  * @author Jancleidsson Soares <jancleidsson@gmail.com>
  */

 describe("Calculate order", function () {

     beforeAll(function () {
         this.calculateOrder = require("../src/calculate-order.js");
     });

     describe("When load a product catalog information", function () {
         beforeAll(function () {
             this.loadProductCatalogInfo = this.calculateOrder.loadProductCatalogInfo;
            //  this.parserCatalog = this.calculateOrder.parserCatalog;
             this.catalogFilePath = require('path').resolve(__dirname + '/res/empty.catalog.csv');
         });

         it("should throw an exception if there is an empty catalog path", function () {
             expect(() => {
                 this.loadProductCatalogInfo('')
             }).toThrow(new Error('Catalog filePath is not defined!'));
         });

         it("should throw an exception if there is a wrong catalog path", function () {
             expect(() => {
                 this.loadProductCatalogInfo('/Wrong/Path')
             }).toThrow(new Error('Catalog file not found - The file path must be absolute!'));
         });

         it("should throw an exception if there is an empty catalog file", function () {
             expect(() => {
                 this.loadProductCatalogInfo(this.catalogFilePath)
             }).toThrow(new Error('CSV File Empty'));
         });
     });

     describe("When load the product order arguments", function () {
         beforeAll(function () {
             this.loadOrderArgs = this.calculateOrder.loadOrderArgs;
             this.orderArgs = ['p3', '10'];
         });

         it("should throw an exception if there are invalid arguments", function () {
             this.orderArgs = ['p3'];
             expect(() => {
                 this.loadOrderArgs(this.orderArgs)
             }).toThrow(new Error('Invalid number of arguments!'));
         });

         it("should throw an exception if there an invalid quantity type", function () {
             this.orderArgs = ['p3', 'p'];
             expect(() => {
                 this.loadOrderArgs(this.orderArgs)
             }).toThrow(new Error('Invalid product quantity argument type!'));
         });

         it("should return a product order list if all arguments are correct", function () {
             const expectedResult = [{
                 productId: 'p3',
                 quantity: 10
             }];
             expect(this.loadOrderArgs(this.orderArgs)).toEqual(expectedResult);
         });
     });

     describe("When parser a product catalog data", function () {
         beforeAll(function () {
             this.parserCatalog = this.calculateOrder.parserCatalog;
             this.catalogData = "P1,1,175.00\r\nP2,1,1200.00";
             this.productList = [{
                 id: 'P1',
                 stock: 1,
                 price: 175.00
             }, {
                 id: 'P2',
                 stock: 1,
                 price: 1200.00
             }];
         });

         it("should throw an exception if there is an invalid product quantity type", function () {
             this.catalogData = 'P10,p,175.00';
             expect(() => {
                 this.parserCatalog(this.catalogData);
             }).toThrow(new Error('Invalid catalog product information!'));
         });

         it("should throw an exception if there is an invalid product price", function () {
             this.catalogData = 'P10,10,175.';
             expect(() => {
                 this.parserCatalog(this.catalogData);
             }).toThrow(new Error('Invalid catalog product information!'));
         });

         it("should throw an exception if there is an invalid product information", function () {
             this.catalogData = 'P10,10,175,10.00';
             expect(() => {
                 this.parserCatalog(this.catalogData);
             }).toThrow(new Error('Invalid catalog product information!'));
         });

         it("should return a empty product list if there is no product information", function () {
             expect(this.parserCatalog()).toEqual([]);
         });

         it("should ignore empty lines in catalog data", function () {
             this.catalogData = "P1,10,175.0\r\n\r\nP2,1,10.01\r\n";
             expect(this.parserCatalog(this.catalogData).length).toEqual(2);
         });

         it("should update the product stock and keep last readed price if there are more than one same product", function () {
             this.catalogData = "P1,1,175.00\r\nP1,1,1200.00";
             this.productList = [{
                 id: 'P1',
                 stock: 2,
                 price: 1200
             }];
             expect(this.parserCatalog(this.catalogData)).toEqual(this.productList);
         });

         it("should return a product list if all arguments are correct", function () {
             expect(this.parserCatalog(this.catalogData)).toEqual(this.productList);
         });
     });

     describe("When search a product in product list", function () {
         beforeAll(function () {
             this.searchProduct = this.calculateOrder.searchProduct;
             this.productList = [{
                id: 'P1',
                stock: 1,
                price: 175
            }]; 
         });

         it("should return a product if product id (ignore case) is found", function () {
             expect(this.searchProduct('p1', this.productList)).toEqual(this.productList[0]);
         });

         it("should return undefined if product id is not found", function () {
            this.productList = [];
            expect(this.searchProduct('p1', this.productList)).toBeUndefined();
         });
     });

     describe("When update a product in product list", function () {
         beforeAll(function () {
             this.updateProduct = this.calculateOrder.updateProduct;
             this.productList = [{
                id: 'P1',
                stock: 1,
                price: 175
            }];
            this.newProduct = {
                id: 'P1',
                stock: 3,
                price: 200
            }
         });

         it("should update a product from list", function () {
             this.updateProduct(this.productList[0], this.newProduct, this.productList);
             expect(this.productList).toEqual([this.newProduct]);
         });
     });

     describe("When process the product orders", function () {
         beforeAll(function () {
             this.processProductOrders = this.calculateOrder.processProductOrders;
         });

         beforeEach(function () {
             this.productList = [{
                     id: 'P4',
                     stock: 10,
                     price: 250.00
                 },
                 {
                     id: 'P10',
                     stock: 5,
                     price: 175.00
                 },
                 {
                     id: 'P12',
                     stock: 5,
                     price: 1000.00
                 }
             ];
             this.productOrders = [{
                 productId: 'P4',
                 quantity: 6
             }, {
                 productId: 'P10',
                 quantity: 5
             }, {
                 productId: 'P12',
                 quantity: 1
             }];
             this.expectedResult = 4151.25;
             this.VAT = 0.23;
         });

         it("should throw an exception if product is not found in catalog", function () {
             this.productOrders = [{
                 productId: 'P1',
                 quantity: 10
             }];
             expect(() => {
                 this.processProductOrders(this.productList, this.productOrders, this.VAT);
             }).toThrow(new Error('Product ' + this.productOrders[0].productId + ' not fount in catalog'));
         });

         it("should throw an exception if product without stock available", function () {
             this.productOrders = [{
                 productId: 'P4',
                 quantity: 11
             }];
             expect(() => {
                 this.processProductOrders(this.productList, this.productOrders, this.VAT);
             }).toThrow(new Error('Product ' + this.productOrders[0].productId + ' without stock available!'));
         });

         it("should caculate the price of the product orders with VAT", function () {
             expect(this.processProductOrders(this.productList, this.productOrders, this.VAT)).toEqual(this.expectedResult);
         });

         it("should calculate the price of the product orders with multiple entry of the same product id", function () {
             this.productOrders = [{
                     productId: 'P4',
                     quantity: 5
                 },
                 {
                     productId: 'P4',
                     quantity: 5
                 }
             ];
             this.expectedResult = 3075;
             expect(this.processProductOrders(this.productList, this.productOrders, this.VAT)).toEqual(this.expectedResult);
         });
     });
 });