angular.module('ProductApp', [])
    .controller('ProductListController', function () {
        //Init data table
        $(document).ready(function () {
            $('#productTable').dataTable();
        });

        var productList = this;
        productList.products = [];

        console.log(productList.modalTitle)
        productList.newProduct = function () {
            productList.modalTitle = "New Product"
            $('#productModal').modal('show');
        }

        productList.productDetails = function (index) {
            productList.modalTitle = "Edit Product"
            $('#productModal').modal('show');

            productList.index = index;
            productList.name = productList.products[index].name;
            productList.description = productList.products[index].description;
            productList.amount = productList.products[index].amount;
            productList.expiryDate = productList.products[index].expiryDate;
        }

        productList.handleSubmit = function(index) {
            if (productList.modalTitle == "New Product") {
                productList.addProduct();
            } else {
                productList.updateProduct(index);
            }
        }

        productList.addProduct = function () {
            productList.products.push({
                name: productList.name,
                description: productList.description,
                amount: productList.amount,
                expiryDate: productList.expiryDate,
                isActive: false
            });

            //api insert

            productList.clearFields();
            $('#productModal').modal('hide');
        };

        productList.updateProduct = function () {
            //api update
            
            const index = productList.index;
            
            productList.products[index].name = productList.name;
            productList.products[index].description = productList.description;
            productList.products[index].amount = productList.amount;
            productList.products[index].expiryDate = productList.expiryDate;

            productList.clearFields();
            $('#productModal').modal('hide');
        }

        productList.deleteProduct = function (index) {
            var popup = confirm("Are your sure to delete " + productList.products[index].name + "?" );
            if (popup == false) return;
            productList.products.splice(index, 1);
        }

        productList.clearFields = function () {
            productList.name = '';
            productList.description = '';
            productList.amount = '';
            productList.expiryDate = null;
        }

        productList.remaining = function () {
            var count = 0;
            angular.forEach(productList.products, function (Product) {
                count += Product.done ? 0 : 1;
            });
            return count;
        };

        productList.archive = function () {
            var popup = confirm("Are your sure to delete selected items?");
            if (popup == false) return;

            var oldProducts = productList.products;
            productList.products = [];
            angular.forEach(oldProducts, function (Product) {
                if (!Product.done) productList.products.push(Product);
            });
        };
    });