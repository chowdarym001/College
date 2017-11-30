using Rasmussen.Models;
using Rasmussen.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rasmussen.Controllers
{
    public class PageController : Controller
    {
        // GET: HomeBanner
        public ActionResult HomeBanner()
        {
            HomeBannerModel entity = new HomeBannerModel();
          
            return View(entity);
        }

        [HttpGet]
        public ViewResult FourColumnContent()
        {
            FourColumnContentBlockModel entity = new FourColumnContentBlockModel();
            return View(entity);
        }

        [HttpGet]
        public ViewResult Slides()
        {
            GenericContentBlockModel entity = new GenericContentBlockModel();
            return View(entity);
        }

        [HttpGet]
        public ViewResult SearchBar()
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }
        public ActionResult AdmissionBanner()
        {
            HomeBannerModel entitys = new HomeBannerModel();

            return View(entitys);
        }
        [HttpGet]
        public ViewResult AdmissionIntro() 
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }
        [HttpGet]
        public ViewResult AdmissionAudience()
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }
        [HttpGet]
        public ViewResult AdmissionContact()
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }
        [HttpGet]
        public ViewResult AdmissionFaq()  
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }
        [HttpGet]
        public ViewResult AdmissionNextsteps()
        {
            GenericContentBlockModel search = new GenericContentBlockModel();
            return View(search);
        }
        public ViewResult AreasofStudy()
        {
            FourColumnContentBlockModel entity = new FourColumnContentBlockModel();
            return View(entity);
        }
        public ActionResult NursingProgramBanner()
        {
            HomeBannerModel entitys = new HomeBannerModel();

            return View(entitys);
        }
        public ActionResult NursingProgramQuadrant()
        {
            FourColumnContentBlockModel entitys = new FourColumnContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingProgramCredentialOffering()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingProgramBannerTwo()
        {
            HomeBannerModel entitys = new HomeBannerModel();

            return View(entitys);
        }
        public ActionResult NursingProgramCareerPath()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingProgramDualCol()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingProgramRelatedContent()
        {
            FourColumnContentBlockModel entitys = new FourColumnContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialOverview()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialIntro()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialDoDone()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialSkillGain()
        {
            HomeBannerModel entitys = new HomeBannerModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialGlance()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialBeforeEnroll()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingCredentialLocations()
        {
            HeaderNavModel entitys = new HeaderNavModel();

            return View(entitys);
        }
       
        public ActionResult NursingIndustryBanner()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingIndustryContent()
        {
            FourColumnContentBlockModel entitys = new FourColumnContentBlockModel();

            return View(entitys);
        }
        public ActionResult NursingIndustryTiles()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
        public ActionResult StudentExpBannerIntro()
        {
            HomeBannerModel entitys = new HomeBannerModel();

            return View(entitys);
        }
        public ActionResult StudentExpSupportQuote()
        {
            FourColumnContentBlockModel entitys = new FourColumnContentBlockModel();

            return View(entitys);
        }
        public ActionResult StudentExpOnlineOncampus()
        {
            HomeBannerModel entitys = new HomeBannerModel();

            return View(entitys);
        }
        public ActionResult StudentExpCommunity()
        {
            GenericContentBlockModel entitys = new GenericContentBlockModel();

            return View(entitys);
        }
    }
    
}