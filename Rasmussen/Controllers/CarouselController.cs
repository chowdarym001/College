using Rasmussen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rasmussen.Controllers
{
    public class CarouselController : Controller
    {
        [HttpGet]
        public ViewResult Index()
        {
            var item = Sitecore.Mvc.Presentation.RenderingContext.Current.Rendering.Item;
            var slideIds = Sitecore.Data.ID.ParseArray(item["SelectedItems"]);
            var viewModel = new CarouselViewModel
            {
                CarouselSlides =
                    slideIds.Select(i =>
                        new CarouselSlideViewModel
                        {
                            Slide = item.Database.GetItem(i)
                        }).ToList()
            };
            return View("~/Views/Carousel/Carousel.cshtml", viewModel);
        }
    }
}