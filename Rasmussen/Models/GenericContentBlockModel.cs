using Rasmussen.Lib;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rasmussen.Models
{
    public class GenericContentBlockModel : RenderingModel
    {
        public HtmlString Title { get; set; }
        public HtmlString Body { get; set; }
        public HtmlString Footer { get; set; }
        public GenericContentBlockModel()
        {
            Initialize(RenderingContext.Current.Rendering);
            Title = HelperMethods.getHtmlstring(Item, "Title");
            Body = HelperMethods.getHtmlstring(Item, "Body");
            Footer = HelperMethods.getHtmlstring(Item, "Footer");
        }
    }
}