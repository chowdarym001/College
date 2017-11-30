using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Rasmussen.Models;

namespace Rasmussen.Controllers
{
    public class FormController : Controller
    {
        // GET: Form
        [HttpGet]
        public ViewResult RequestInformation()
        {

            RequestInformationModel ReqInfo = new RequestInformationModel();
            return View(ReqInfo);
        }
    }
}