using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC5AngularJS.Controllers
{
    public class PageController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}