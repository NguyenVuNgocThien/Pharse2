using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RookieOnlineAssetManagement.Entities
{
    public class Assignment
    {
        public int Id { get; set; }
        public string AssignedBy { get; set; }
        public string AssignedTo { get; set; }
        public DateTime AssignedDay { get; set; }
        public int State { get; set; }
        public bool Status { get; set; }


        public virtual User AssignedByUser { get; set; }
        public virtual User AssignedToUser { get; set; }
        public virtual Asset Asset { get; set; }
    }
}

