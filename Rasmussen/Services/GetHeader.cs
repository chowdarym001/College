using Rasmussen.Lib;
using Rasmussen.Models.GlobalComponent;
using Sitecore.Data.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rasmussen.Services
{
    public class GlobalComponentService
    {
        public HeaderData GetHeader()
        {
            
            Item CurrentItem = HelperMethods.getCurrentContextItem();
            HeaderData Hdata = new HeaderData();
            Hdata.Heading = HelperMethods.getHtmlstring(CurrentItem, "Heading");
            Hdata.SubHeading = HelperMethods.getHtmlstring(CurrentItem, "SubHeading");
            Hdata.Title = HelperMethods.getHtmlstring(CurrentItem, "Content");
            return Hdata;
        }



            
    }
}