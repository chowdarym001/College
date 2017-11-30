using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Mvc.Presentation;
using Rasmussen.Lib;
using Sitecore.Data.Items;

namespace Rasmussen.Models
{
    public class HeaderNavModel : RenderingModel
    {
        public HtmlString Title { get; set; }
        public HtmlString Body { get; set; }
        public HtmlString Footer { get; set; }
        public HtmlString SubHeading { get; set; }
        public HtmlString CTA { get; set; }
        public List<ContentCardModelCollection> MultipleContentCards { get; set; }

        public HeaderNavModel()
        {
            Initialize(RenderingContext.Current.Rendering);
            Title = HelperMethods.getHtmlstring(Item, "Title");
            Body = HelperMethods.getHtmlstring(Item, "Body");
            SubHeading = HelperMethods.getHtmlstring(Item, "SubHeading");
            CTA = HelperMethods.getHtmlstring(Item, "CTA");
            Footer = HelperMethods.getHtmlstring(Item, "Footer");
            List<Item> scMenuItems = HelperMethods.geMultiList(Item, "ListItems");
            MultipleContentCards = new List<ContentCardModelCollection>();
            if (scMenuItems != null)
            {
                foreach (Item Menu in scMenuItems)
                {
                    MultipleContentCards.Add(new ContentCardModelCollection() {
                        ParentCard = Menu,
                        ChildCardlist = HelperMethods.geMultiList(Menu, "ListItems")

                });
                }

            }
        }
    }
}