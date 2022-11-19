using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RookieOnlineAssetManagement.Entities
{
    public class Asset
    {
        [Key]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }


        public virtual ICollection<Assignment> Assignments { get; } = new List<Assignment>();
    }
}
