using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace beebop.Models
{
    public class Users
    {
        public Guid id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string googleId { get; set; }

        public bool isParent { get; set; }
    }
}
