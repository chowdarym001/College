using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Rasmussen.Lib;
using Sitecore.Mvc.Presentation;
namespace Rasmussen.Models
{
    public class RequestInformationModel :RenderingModel
    {
        public HtmlString Title { get; set; }
        public HtmlString Body { get; set; }
        public HtmlString CTA { get; set; }
        public HtmlString Disclaimer { get; set; }
        public HtmlString ThankyouText { get; set; }
        public HtmlString ThankyouDefault { get; set; }
        public HtmlString ThankyouContactus { get; set; }
        public string FormType { get; set; }
        public HtmlString SuccessMessage { get; set; }

        public RequestInformationModel()
        {
            Initialize(RenderingContext.Current.Rendering);
            Title = HelperMethods.getHtmlstring(Item, "Title");
            Body = HelperMethods.getHtmlstring(Item, "Body");
            CTA = HelperMethods.getHtmlstring(Item, "CTA");
            Disclaimer = HelperMethods.getHtmlstring(Item, "Disclaimer");
            ThankyouText = HelperMethods.getHtmlstring(Item, "Thankyou Text");
            ThankyouDefault = HelperMethods.getHtmlstring(Item, "Thankyou Default");
            ThankyouContactus = HelperMethods.getHtmlstring(Item, "Thankyou Contactus");
            FormType = Item.Fields["FormType"].Value;
        }
        public RequestInformationModel(string formType)
        {
            Initialize(RenderingContext.Current.Rendering);
            Body = HelperMethods.getHtmlstring(PageItem, "Body");
            SuccessMessage = HelperMethods.getHtmlstring(HelperMethods.getItem(Consts.ThankYouMessagesList+ formType), "Value");
            FormType = formType;
        }
    }
}