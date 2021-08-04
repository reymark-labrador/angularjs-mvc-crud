angular.module('ProductApp', [])
    .controller('ProductListController', function ($http) {
        //Init data table
        $(document).ready(function () {
            $('#productTable').dataTable();
        });

        var productList = this;
        productList.products = [];
        productList.ExpiryDate = new Date();

        $http.get('/api/product').then(function(res)
        {
            productList.products = res.data;
            //$('#productTable').dataTable({
            //    "data": res.data,
            //    "columns": [
            //        { "data": "Name" },
            //        { "data": "Description" },
            //        { "data": "Amount" },
            //        { "data": "IsActive" },
            //        { "data": "ExpiryDate" },
            //        {
            //            "render": function () {
            //                return "<button type='button' class='btn btn-sm btn-primary' id='Edit'>Edit</button>"
            //                //return "<button type='button' class='btn btn - sm btn - primary' ng-click='productList.productDetails($index)'>Edit</button> | < button type = 'button' class='btn btn-sm btn-danger' ng-click='productList.deleteProduct($index)'> Delete</button >"
            //            }
            //        }
            //    ]
            //});
            
        });

        productList.newProduct = function () {
            productList.modalTitle = "New Product"
            productList.clearFields();
            $('#productModal').modal('show');
        }

        productList.productDetails = function (index) {
            productList.modalTitle = "Edit Product"
            $('#productModal').modal('show');

            productList.index = index;
            productList.Name = productList.products[index].Name;
            productList.Description = productList.products[index].Description;
            productList.Amount = productList.products[index].Amount;
            productList.IsActive = productList.products[index].IsActive;
            productList.ExpiryDate = new Date(productList.products[index].ExpiryDate);
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
                Name: productList.Name,
                Description: productList.Description,
                Amount: productList.Amount,
                ExpiryDate: productList.ExpiryDate,
                IsActive: true
            });

            console.log(productList.products, "array")
            //api insert
            $http.post('/api/product', productList.products[productList.products.length - 1]).then(function() {
                productList.clearFields();
                $('#productModal').modal('hide');
            });
        };

        productList.updateProduct = function () {
            const index = productList.index;
            
            productList.products[index].Name = productList.Name;
            productList.products[index].Description = productList.Description;
            productList.products[index].Amount = productList.Amount;
            productList.products[index].ExpiryDate = productList.ExpiryDate;
            productList.products[index].IsActive = productList.IsActive;

            //api update
            $http.put('/api/product', productList.products[index]).then(function () {
                productList.clearFields();
                $('#productModal').modal('hide');
            });
        }

        productList.deleteProduct = function (index) {
            var popup = confirm("Are your sure to delete " + productList.products[index].name + "?" );
            if (popup == false) return;

            //api delete
            $http.delete('/api/product/' + productList.products[index].ID).then(function () {
                productList.products.splice(index, 1);
            });
           
        }

        productList.clearFields = function () {
            productList.Name = '';
            productList.Description = '';
            productList.Amount = '';
            productList.ExpiryDate = null;
        } 
    });