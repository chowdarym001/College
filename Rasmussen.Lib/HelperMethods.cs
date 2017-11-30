using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Rasmussen.Lib
{
    public static class HelperMethods
    {
        public static Item getItem(string path)
        {
            return Sitecore.Context.Database.GetItem(path);

        }
        public static Item getCurrentContextItem()
        {
            return PageContext.Current.Item; 
        }
        public static Item getRenderingDatasource()
        {
            return RenderingContext.Current.Rendering.Item;
        }
        public static HtmlString getHtmlstring(Item CurrentItem,string Field)
        {
            if(CurrentItem == null)
            {
                return new HtmlString(String.Empty);
            }
            return new HtmlString(FieldRenderer.Render(CurrentItem, Field));

        }
        public static List<Item> geMultiList(Item CurrentItem, string Field)
        {

            if (CurrentItem.Fields[Field] != null)
            {
                Sitecore.Data.Fields.MultilistField refMultilistField = CurrentItem.Fields[Field];
                Item[] items = refMultilistField.GetItems();
                return items.ToList();
            }
            return null;

            //return new HtmlString(FieldRenderer.Render(CurrentItem, Field));

        }
        public static string GetImageURL(Item currentItem,string fieldname)
        {
            string imageURL = string.Empty;
            Sitecore.Data.Fields.ImageField imageField = currentItem.Fields[fieldname];
            if (imageField != null && imageField.MediaItem != null)
            {
                Sitecore.Data.Items.MediaItem image = new Sitecore.Data.Items.MediaItem(imageField.MediaItem);
                imageURL = Sitecore.StringUtil.EnsurePrefix('/', Sitecore.Resources.Media.MediaManager.GetMediaUrl(image));
            }
            return imageURL;
        }

    }
}
