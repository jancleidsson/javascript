let products = new Array();
let productOrders =  new Array();
const catalogFilePath = process.argv[2];
const VAT = 0.23 //Percentage

try {
    console.log('Validating arguments...');
    loadOrderArgs();

    console.log('Loading catalog file...');
    loadProductCatalogInfo(catalogFilePath);

    console.log('Processing product orders...');
    console.log('Total: ' + processProductOrders());
} catch (error) {
    console.log(error.message);
    if (error.code) console.log('Error code: ' + error.code);
}

//Loads and validates the product order arguments
function loadOrderArgs() {
    
    if (!catalogFilePath) {
        throw new Error('Catalog filePath is not defined!');
    }
    
    const productOrdersArgs = process.argv.slice(3);
    if (productOrdersArgs.length % 2) {
        throw new Error('Invalid number of arguments!');
    }

    //Loading product orders
    for (let index = 0; index < productOrdersArgs.length; index += 2) {
        
        const quantity = productOrdersArgs[index + 1];
        if (!parseInt(quantity)) throw new Error('Invalid product quantity argument type!');

        let order = {};
        order.productId = productOrdersArgs[index];
        order.quantity = parseInt(quantity);

        productOrders.push(order);
    }
}

function loadProductCatalogInfo(catalogPath) {
    try {
        const fs = require('fs');
        const catalogData = fs.readFileSync(catalogPath, "utf8");
        if (!catalogData) throw new Error('CSV File Empty');
        
        //Parsing catalog data;
        parserCatalog(catalogData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Catalog file not found - The file path must be absolute!');
        } else {
            throw error;
        }
    }
}

//Ver caso de produtos duplicados no catálogo
function parserCatalog(fileData) {
    const productPattern = /^[a-z0-9]+(?:, ?[0-9]+)(?:, ?([0-9]*[.])?[0-9]+)$/gmi;
    const productsData = fileData.split(/\r\n/);
    productsData.forEach(productData => {
        //Ignoring empty lines
        if (productData) {
            if (!productData.match(productPattern)) throw new Error('Invalid catalog product information!');
        
            let productItem = productData.split(',')
            let product = {};
            product.id = productItem[0];
            product.stock = parseInt(productItem[1]);
            product.price = parseFloat(productItem[2]);

            products.push(product);
        }
    });
}

//Manter apenas um valor na lista de produtos
function searchProduct(productId) {
    return products.filter(product => {
        return productId.toUpperCase() === product.id.toUpperCase();
    })[0];
}

function processProductOrders() {
    let total = 0;
    try {
        for (let index = 0; index < productOrders.length; index++) {
            const productOrder = productOrders[index];
            const product = searchProduct(productOrder.productId);
            if (!product) throw new Error('Product ' +  productOrder.productId + ' not fount in catalog');
            if (product.stock < productOrder.quantity) throw new Error('Product ' +  productOrder.productId + ' without stock available!').code = 1;
            //Atualizar lista de produtos com os dados recentes;
            total = total + (productOrder.quantity * product.price);
        }
    } catch (error) {
        throw error;
    }
    return total + (VAT * total);
}