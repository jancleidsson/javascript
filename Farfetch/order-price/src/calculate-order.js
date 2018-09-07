 /**
  * Loads the product order arguments and return a list with the product orders
  * @param {*} productOrdersArgs the given product order arguments
  */
let loadOrderArgs = (productOrdersArgs) => {
    if (productOrdersArgs.length % 2) throw new Error('Invalid number of arguments!');
    let productOrders = new Array();

    //Loading product orders
    for (let index = 0; index < productOrdersArgs.length; index += 2) {
        const quantity = productOrdersArgs[index + 1];
        if (!parseInt(quantity)) throw new Error('Invalid product quantity argument type!');

        let order = {};
        order.productId = productOrdersArgs[index];
        order.quantity = parseInt(quantity);

        productOrders.push(order);
    }
    return productOrders;
}

/**
 * Validates if the catalog file exists and reads its information 
 * @param {*} catalogPath catalog file path
 */
let loadProductCatalogInfo = (catalogPath) => {
    try {
        if (!catalogPath) throw new Error('Catalog filePath is not defined!');
        
        const fs = require('fs');
        const catalogData = fs.readFileSync(catalogPath, "utf8");
        if (!catalogData) throw new Error('CSV File Empty');

        //Parsing catalog data;
        return parserCatalog(catalogData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Catalog file not found - The file path must be absolute!');
        } else {
            throw error;
        }
    }
}

/**
 * Loads the catalog information, validates if each product information was written in the correct pattern and
 *  returns the list of products reletad to catalog info.

 * In order to keep one product per id, the function will update the product prices according the last price founded
 *  and it will increase the stock amount.
 * @param {*} fileData catalog data information
 */
let parserCatalog = (fileData) => {
    // List of products in the catalog file
    let products = new Array();

    const productPattern = /^[a-z0-9]+(?:, ?[0-9]+)(?:, ?([0-9]*[.])?[0-9]+)$/gmi;
    const productsData = fileData.split(/\r\n/);
    productsData.forEach(productData => {
        //Ignores empty lines in the productData
        if (productData) {
            if (!productData.match(productPattern)) throw new Error('Invalid catalog product information!');

            const productItem = productData.split(',')

            let product = {};
            product.id = productItem[0];
            product.stock = parseInt(productItem[1]);
            product.price = parseFloat(productItem[2]);

            let lastProductInfo = searchProduct(product.id, products);
            if (lastProductInfo) {
                //Updating product stock
                product.stock = product.stock + lastProductInfo.stock;

                //Removing old element value;
                removeProduct(lastProductInfo, products);
            }
            products.push(product);
        }
    });
    return products;
}

/**
 * Searchs for a product in the list of products by a given id
 * @param {*} productId the given product id
 * @param {*} products product list used in the serach
 */
let searchProduct = (productId, products) => {
    return products.filter(product => {
        return productId.toUpperCase() === product.id.toUpperCase();
    })[0];
}

/**
 * Removes the given product from catalog of products
 * @param {*} product product to be removed
 * @param {*} products product list that stores the product
 */
let removeProduct = (product, products) => {
    products.splice(products.indexOf(product), 1);
}

/**
 * Updates the given product in catalog of products
 * @param {*} product product to be updated
 * @param {*} products product list that stores the product
 */
let updateProduct = (product, products) => {
    const index = products.indexOf(product);
    if (index !== -1) {
        products[index] = product;
    } else {
        throw new Error('Product not found!');
    }
}

/**
 * Processes the product orders and returns the total with the VAT
 */
let processProductOrders = (products, productOrders, VAT) => {
    let total = 0;
    try {
        for (let index = 0; index < productOrders.length; index++) {
            const productOrder = productOrders[index];
            const product = searchProduct(productOrder.productId, products);
            if (!product) throw new Error('Product ' + productOrder.productId + ' not fount in catalog');
            if (product.stock >= productOrder.quantity) {

                //Updatind product stock
                product.stock = product.stock - productOrder.quantity;
                updateProduct(product, products);

                total = total + (productOrder.quantity * product.price);
            } else {
                let error = new Error('Product ' + productOrder.productId + ' without stock available!');
                error.code = 1;
                throw error;
            }
        }
        return total + (VAT * total);
    } catch (error) {
        throw error;
    }
}

/**
 * Calculates the product orders order price including VAT
 * @param {*} catalogFilePathArg the product calatog file path
 * @param {*} productOrdersArgs the product orders arguments
 */
let calculateOrder = (catalogFilePathArg, productOrdersArgs) => {
    try {
        console.log('Loading catalog file...');
        let products = loadProductCatalogInfo(catalogFilePathArg);

        console.log('Validating arguments...');
        let productOrders = loadOrderArgs(productOrdersArgs);

        // VAT percentage fixed at rate of 23%
        const VAT = 0.23

        console.log('Processing product orders...');
        console.log('Total: ' + processProductOrders(products, productOrders, VAT));
    } catch (error) {
        console.log(error.message);
        if (error.code) console.log('Error code: ' + error.code);
    }
}

/**
 * Exporting functions for tests
 */
module.exports = {
    loadOrderArgs: loadOrderArgs,
    loadProductCatalogInfo: loadProductCatalogInfo,
    processProductOrders: processProductOrders,
    calculateOrder: calculateOrder
}

calculateOrder(process.argv[2], process.argv.slice(3));