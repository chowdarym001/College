using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Rasmussen.Models;

namespace Rasmussen.Controllers
{
    public class GlobalController : Controller
    {
        // GET: Global
        [HttpGet]
        public ViewResult Header()
        {

            HeaderFooterModel header = new HeaderFooterModel();
            return View(header);
        }
        public ViewResult HeaderNav()
        {

            HeaderNavModel header = new HeaderNavModel();
            return View(header);
        }
        public ViewResult MobileHeaderNav()
        {
            HeaderNavModel header = new HeaderNavModel();
            
            return View(header);
        }
        public ViewResult Footer()
        {

            HeaderFooterModel footer = new HeaderFooterModel();
            return View(footer);
        }
        public ViewResult LineStripe()
        {

            GenericContentBlockModel footer = new GenericContentBlockModel();
            return View(footer);
        }


    }
}