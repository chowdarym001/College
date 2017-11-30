using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Mvc.Presentation;
using Rasmussen.Lib;
using Sitecore.Data.Items;

namespace Rasmussen.Models
{
    public class ContentCardModel
    {
        public HtmlString Title { get; set; }
        public HtmlString Body { get; set; }
        public HtmlString CTA { get; set; }
        public HtmlString Footer { get; set; }




    }
    public class ContentCardModelCollection
    {
        public Item ParentCard{ get; set; }
        public List<Item> ChildCardlist { get; set; }
        public ContentCardModelCollection()
        {
            ChildCardlist = new List<Item>();

        }


    }
    
}