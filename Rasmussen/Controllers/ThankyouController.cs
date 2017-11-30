using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Rasmussen.Models;

namespace Rasmussen.Controllers
{
    public class ThankyouController : Controller
    {
        // GET: Form
       
        [HttpPost]
        public ActionResult Thankyou(FormCollection collection)
        {
            var successmsg = !string.IsNullOrEmpty(collection["successmsg"]) ? collection["successmsg"] : "Thank You";

            var timeNow = System.DateTime.Now;
            var timeFormFilledOut = System.DateTime.Now.AddDays(-6);
            if (collection["t"] != null)
            {
                timeFormFilledOut = System.DateTime.Parse(collection["t"]);
            }
            var allFields = "";
            foreach (var key in collection.AllKeys)
            {
                allFields += collection[key] + " ";
            }
            var fullName = (!string.IsNullOrEmpty(collection["firstname"]) ? collection["firstname"] : collection["fname"]) + " " + (!string.IsNullOrEmpty(collection["lastname"]) ? collection["lastname"] : collection["lname"]);
            if (Regex.IsMatch(allFields, "[^\x00-\xff]") || Regex.IsMatch(fullName, "[sS]mith[a-z][0-9][0-9][0-9] [sS]mith[a-z][0-9][0-9][0-9]"))
            {//spam email, bail out and do not send the spam
                MailMessage message = new MailMessage();
                message.From = new MailAddress("surya.mannava@collegiseducation.com");

                message.To.Add(new MailAddress("surya.mannava@collegiseducation.com"));

                message.Subject = "bot spam";

                var list = new Dictionary<string, string>();
                foreach (string key in collection.Keys)
                {
                    list.Add(key, collection[key]);
                }

                message.Body = string.Format("{0}", JsonConvert.SerializeObject(list));

                SmtpClient client = new SmtpClient();
                client.Send(message);
            }
            if ((collection["formname"] == "careerguide") || timeNow > timeFormFilledOut.AddSeconds(3) && timeNow < timeFormFilledOut.AddDays(6))
            {
                ViewBag.firstname = !string.IsNullOrEmpty(collection["firstname"]) ? collection["firstname"] : collection["fname"];
                ViewBag.lastname = !string.IsNullOrEmpty(collection["lastname"]) ? collection["lastname"] : collection["lname"];
                ViewBag.emailaddress = !string.IsNullOrEmpty(collection["emailaddress"]) ? collection["emailaddress"] : collection["email"];
                ViewBag.phone = !string.IsNullOrEmpty(collection["phone"]) ? collection["phone"] : collection["home_phone"];
                ViewBag.state = collection["state"];
                ViewBag.zip = !string.IsNullOrEmpty(collection["zip"]) ? collection["zip"] : collection["ziph"];
                ViewBag.gradundergrad = collection["gradundergrad"];
                ViewBag.campus = collection["campus"];
                ViewBag.school = collection["school"];
                ViewBag.program = collection["program"];
                ViewBag.programname = collection["programname"];
                ViewBag.transfer = collection["transfer"];
                ViewBag.degree = collection["comments_tour"];
                ViewBag.status = collection["status"];
                ViewBag.question = collection["question"];
                ViewBag.ga_clientid = collection["ga_clientid"];
                ViewBag.ga_campaign = collection["ga_campaign"];
                ViewBag.ga_source = collection["ga_source"];
                ViewBag.ga_medium = collection["ga_medium"];
                ViewBag.ga_term = collection["ga_term"];
                ViewBag.syn_sid = collection["syn_sid"];
                ViewBag.syn_iid = collection["syn_iid"];
                ViewBag.b_leadurl = collection["b_leadurl"];
                ViewBag.b_referrer = collection["b_referrer"];

                ViewBag.formname = collection["formname"];
                if (Request.Cookies["_mkto_trk"] != null)
                    ViewBag.MarketoCookie = Request.Cookies["_mkto_trk"].Value;
                else
                    ViewBag.MarketoCookie = "";

                LandingPagesCore.Core.PostToBridge(Request, Response);

                LandingPagesCore.Core.PostToMarketo(ViewBag.firstname, ViewBag.lastname, ViewBag.emailaddress, ViewBag.campus, ViewBag.program, ViewBag.MarketoCookie,
                    ViewBag.ga_clientid, ViewBag.ga_campaign, ViewBag.ga_source, ViewBag.ga_medium, ViewBag.ga_term, ViewBag.syn_sid, ViewBag.syn_iid, ViewBag.b_leadurl, ViewBag.b_referrer);


            }
            else
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress("surya.mannava@collegiseducation.com");

                message.To.Add(new MailAddress("surya.mannava@collegiseducation.com"));

                message.Subject = "Form Validation Occoured";

                var list = new Dictionary<string, string>();
                foreach (string key in collection.Keys)
                {
                    list.Add(key, collection[key]);
                }

                message.Body = string.Format("{0}", JsonConvert.SerializeObject(list));
                SmtpClient client = new SmtpClient();
                try
                {
                    client.Send(message);
                }
                catch(Exception ex)
                {

                }
                   
            }

            RequestInformationModel ReqInfo = new RequestInformationModel(successmsg);
            return View(ReqInfo);

        }
        [HttpGet]
        public ActionResult Thankyou()
        {
            RequestInformationModel ReqInfo = new RequestInformationModel();
            return View(ReqInfo);
        }
    }
}
