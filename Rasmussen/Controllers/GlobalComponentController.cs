using Rasmussen.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rasmussen.Controllers
{
    public class GlobalComponentController : Controller
    {
        //
        // GET: /GlobalComponent/
        public ActionResult Header()
        {
            GlobalComponentService Gh = new GlobalComponentService();
            return View(Gh.GetHeader());
        }
	}
}