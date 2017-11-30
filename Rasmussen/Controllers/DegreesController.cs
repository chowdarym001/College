using Rasmussen.Models;
using Rasmussen.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rasmussen.Controllers
{
    public class DegreesController : Controller
    {
        public ViewResult DegreeBanner()
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }

        public ViewResult DegreeFilter()
        {
            FourColumnContentBlockModel entity = new FourColumnContentBlockModel();
            return View(entity);
        }
    }
    
}