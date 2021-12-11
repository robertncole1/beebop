using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace beebop.Models
{
    public class Babies
    {
        public Guid id { get; set; }

        public Guid userId { get; set; }

        public Guid caregiverId { get; set; }

        public string name { get; set; }

        public string age { get; set; }

    }
}
