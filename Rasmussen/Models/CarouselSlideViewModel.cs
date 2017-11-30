using Sitecore.Data.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sitecore.Mvc.Presentation;

namespace Rasmussen.Models
{
    public class CarouselSlideViewModel
    {
        public Item Slide { get; set; }

        public MvcHtmlString Header
        {
            get { return GetFieldValue("Header"); }
        }

        public MvcHtmlString SubHead
        {
            get { return GetFieldValue("SubHead"); }
        }

        public MvcHtmlString Background
        {
            get { return GetFieldValue("Background"); }
        }

        public MvcHtmlString CallToAction
        {
            get { return GetFieldValue("CallToAction"); }
        }

        private MvcHtmlString GetFieldValue(string fieldName)
        {
            return new MvcHtmlString(Sitecore.Web.UI.WebControls.FieldRenderer.Render(this.Slide, fieldName));
        }
    }
}