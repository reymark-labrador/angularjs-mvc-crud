using System;

namespace MVC5AngularJS.Models
{
    public class ProductModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public decimal Amount { get; set; }

        public bool IsActive { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}