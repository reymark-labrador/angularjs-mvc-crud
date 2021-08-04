using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using MVC5AngularJS.Data;
using MVC5AngularJS.Models;

namespace MVC5AngularJS.Controllers
{
    public class ProductController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        [HttpGet]
        public async Task<IEnumerable<ProductModel>> Get()
        {
            return await db.Products.ToListAsync();
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] ProductModel product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                await db.SaveChangesAsync();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, product);
                return response;
            }

            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        }

        [HttpPut]
        public async Task<HttpResponseMessage> Put([FromBody] ProductModel product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                await db.SaveChangesAsync();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, product);
                return response;
            }

            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> Delete(int id)
        {
            ProductModel product = db.Products.Find(id);

            if (product == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();
            return Request.CreateResponse(HttpStatusCode.OK, product);
        }
    }
}
