angular.module('ProductApp', [])
    .controller('ProductListController', function ($http, $window) {
        //Init data table
        $(document).ready(function () {
            $('#productTable').dataTable();
        });

        var productList = this;
        productList.products = [];
        productList.ExpiryDate = new Date();

        //validate auth token
        if ($window.localStorage.getItem('auth-token') != null) {
            $http({
                method: 'Post',
                url: '/api/auth/validate',
                data: {
                    'token': $window.localStorage.getItem('auth-token')
                }
            }).then(function (res) {
                console.log(res)
                if (!res.data) {
                    $window.location.href = '/page/login';
                }
            });
        } else {
            $window.location.href = '/page/login';
        }

        //$http.get('/api/product').then(function(res)
        //{
        //    productList.products = res.data;
        //    //$('#productTable').dataTable({
        //    //    "data": res.data,
        //    //    "columns": [
        //    //        { "data": "Name" },
        //    //        { "data": "Description" },
        //    //        { "data": "Amount" },
        //    //        { "data": "IsActive" },
        //    //        { "data": "ExpiryDate" },
        //    //        {
        //    //            "render": function () {
        //    //                return "<button type='button' class='btn btn-sm btn-primary' id='Edit'>Edit</button>"
        //    //                //return "<button type='button' class='btn btn - sm btn - primary' ng-click='productList.productDetails($index)'>Edit</button> | < button type = 'button' class='btn btn-sm btn-danger' ng-click='productList.deleteProduct($index)'> Delete</button >"
        //    //            }
        //    //        }
        //    //    ]
        //    //});
            
        //});
        $http({
            method: 'Get',
            url: '/api/product',
            headers: { 'authorization': 'Bearer  ' + $window.localStorage.getItem('auth-token') }
        }).then(function (res) {
            productList.products = res.data;
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
            //api insert
            $http.post('/api/product', productList.products[productList.products.length - 1]).then(function () {
                productList.products.push({
                    Name: productList.Name,
                    Description: productList.Description,
                    Amount: productList.Amount,
                    ExpiryDate: productList.ExpiryDate,
                    IsActive: true
                });
                productList.clearFields();
                $('#productModal').modal('hide');
            });
        };

        productList.updateProduct = function () {
            const index = productList.index;
            
            //api update
            $http.put('/api/product', productList.products[index]).then(function () {
                productList.products[index].Name = productList.Name;
                productList.products[index].Description = productList.Description;
                productList.products[index].Amount = productList.Amount;
                productList.products[index].ExpiryDate = productList.ExpiryDate;
                productList.products[index].IsActive = productList.IsActive;
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

        productList.logout = function (index) {
            var popup = confirm("Are your sure to logout?");
            if (popup == false) return;

            $window.localStorage.removeItem('auth-token')
            $window.location.href = '/page/login';
        }
    });