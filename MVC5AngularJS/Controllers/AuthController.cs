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
    public class AuthController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        [HttpPost, Route("api/auth/validate")]
        public HttpResponseMessage ValdiateToken([FromBody] dynamic data)
        {
            string token = data.token;
            var validatedToken = TokenManager.ValidateToken(token);
            int id = validatedToken != null ? int.Parse(validatedToken) : 0;

            var result = db.Users.Find(id);
            if (result == null) return Request.CreateResponse(HttpStatusCode.OK, false);

            return Request.CreateResponse(HttpStatusCode.OK, true);
        }

        [HttpPost, Route("api/auth/login")]
        public async Task<HttpResponseMessage> Login([FromBody] UserModel user)
        {
            var result = await db.Users.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefaultAsync();
            if(result == null)
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }

            return Request.CreateResponse(HttpStatusCode.OK, TokenManager.GenerateToken(result.ID.ToString()));
        }

        [HttpPost, Route("api/auth/register")]
        public async Task<HttpResponseMessage> Register([FromBody] UserModel user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                await db.SaveChangesAsync();
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        }
    }
}
