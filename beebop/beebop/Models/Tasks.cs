﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace beebop.Models
{
    public class Tasks
    {
        public Guid id { get; set; }

        public Guid userId { get; set; }

        public string caregiverId { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public string scheduled { get; set; }

        public string completed { get; set; }
    }
}
