using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Mvc.Presentation;
using Rasmussen.Lib;
using Sitecore.Data.Items;

namespace Rasmussen.Models
{
    public class FourColumnContentBlockModel : RenderingModel
    {
        public HtmlString Title { get; set; }
        public HtmlString Body { get; set; }
        public HtmlString CTA { get; set; }
        public HtmlString Footer { get; set; }
        public List<ContentCardModel> ContentCards { get; set; }

        public FourColumnContentBlockModel()
        {
            Initialize(RenderingContext.Current.Rendering);
            Title = HelperMethods.getHtmlstring(Item, "Title");
            Body = HelperMethods.getHtmlstring(Item, "Body");
            CTA = HelperMethods.getHtmlstring(Item, "CTA");
            Footer = HelperMethods.getHtmlstring(Item, "Footer");
            ContentCards = new List<Models.ContentCardModel>();
            List<Item> scContentItems = HelperMethods.geMultiList(Item, "ListItems");
            if (scContentItems != null)
            {
                foreach (Item scContentItem in scContentItems)
                {
                    ContentCardModel cardItem = new Models.ContentCardModel();
                    cardItem.Title = HelperMethods.getHtmlstring(scContentItem, "Title");
                    cardItem.Body = HelperMethods.getHtmlstring(scContentItem, "Body");
                    cardItem.Footer = HelperMethods.getHtmlstring(scContentItem, "Footer");
                    cardItem.CTA = HelperMethods.getHtmlstring(scContentItem, "CTA");
                    ContentCards.Add(cardItem);
                }
            }
            

        }
    }
}