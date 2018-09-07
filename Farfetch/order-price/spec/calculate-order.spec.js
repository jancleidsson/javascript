
const context = require("../src/calculate-order.js")

describe("Load catalog price ", function () {

    const loadProductCatalogInfo = context.loadProductCatalogInfo;

    it("and there is an empty catalog path", function () {
        expect( () => {
            loadProductCatalogInfo('')
        }).toThrow(new Error('Catalog filePath is not defined!'));
    });

    it("and there is an wrong catalog path", function () {
        expect( () => {
            loadProductCatalogInfo('/Wrong/Path')
        }).toThrow(new Error('Catalog file not found - The file path must be absolute!'));
    });

    it("and there is empty catalog file", function () {
        const emptyCalalogPath = require('path').resolve(__dirname + '/../empty.catalog.csv');
        expect( () => {
            loadProductCatalogInfo(emptyCalalogPath)
        }).toThrow(new Error('CSV File Empty'));
    });

    // //TODO check how to mock
    // it("and there is valid catalog file", function () {
    //     const sampleCalalogPath = require('path').resolve(__dirname + '/../sample.catalog.csv');
    //     expect( () => {
    //         loadProductCatalogInfo(sampleCalalogPath)
    //     }).toEqual([1, 2, 3]);;
    // });
});

describe("Load product order arguments ", function () {

    const loadOrderArgs = context.loadOrderArgs;

    it("and there are invalid arguments", function () {
        const invalidOrderArgs = ['p3'];
        expect( () => {
            loadOrderArgs(invalidOrderArgs)
        }).toThrow(new Error('Invalid number of arguments!'));
    });

    it("and there is a invalid quantity type", function () {
        const invalidOrderArgs = ['p3', 'p'];
        expect( () => {
            loadOrderArgs(invalidOrderArgs)
        }).toThrow(new Error('Invalid product quantity argument type!'));
    });

    it("and there are valid arguments", function () {
        const invalidOrderArgs = ['p3', '10'];
        expect(loadOrderArgs(invalidOrderArgs)).toEqual([{
            productId: 'p3',
            quantity: 10
        }]);
    });
});