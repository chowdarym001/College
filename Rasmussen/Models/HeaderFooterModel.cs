using Rasmussen.Lib;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rasmussen.Models
{
    public class HeaderFooterModel : RenderingModel
    {

        public HtmlString Header { get; set; }
        public HtmlString Footer { get; set; }
        public HeaderFooterModel()
        {
            Initialize(RenderingContext.Current.Rendering);
            Header = HelperMethods.getHtmlstring(Item, "Header");
            Footer = HelperMethods.getHtmlstring(Item, "Footer");
        }
    }
}