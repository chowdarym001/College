using Rasmussen.Lib;
using Sitecore.Mvc.Presentation;
using System.Web;
namespace Rasmussen.Models
{
    public class HomeBannerModel : RenderingModel
    {
        public HtmlString Heading { get; set; }
        public HtmlString SubHeading { get; set; }
        public HtmlString Body { get; set; }
        public HtmlString CTALink { get; set; }
     

        public string BackgroundImageurl_480 { get; set; }
        public string BackgroundImageurl_640 { get; set; }
        public string BackgroundImageurl_850 { get; set; }
        public string BackgroundImageurl_960 { get; set; }
        public string BackgroundImageurl_1000 { get; set; }
        public string BackgroundImageurl_1200 { get; set; }
        public string BackgroundImageurl_1600 { get; set; }
        public string BackgroundImageurl_2000 { get; set; }

        public HomeBannerModel()
        {
            Initialize(RenderingContext.Current.Rendering);
            BackgroundImageurl_480 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_480");
            BackgroundImageurl_640 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_640");
            BackgroundImageurl_850 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_850");
            BackgroundImageurl_960 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_960");
            BackgroundImageurl_1000 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_1000");
            BackgroundImageurl_1200 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_1200");
            BackgroundImageurl_1600 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_1600");
            BackgroundImageurl_2000 = HelperMethods.GetImageURL(Item, "BackgroundImageurl_2000");
        }




    }
}