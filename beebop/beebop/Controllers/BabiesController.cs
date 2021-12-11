using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using beebop.Models;
using Microsoft.Extensions.Configuration;
using beebop.DataAccess;

namespace beebop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BabiesController : ControllerBase
    {
        BabiesRepository _babiesRepo;

        public BabiesController(BabiesRepository babiesRepo)
        {
            _babiesRepo = babiesRepo;
        }
        // Get all the babies from the database
        [HttpGet]
        public IActionResult GetAllBabies()
        {
            return Ok(_babiesRepo.GetAll());
        }

        // Get single baby from the database
        [HttpGet("{id}")]
        public IActionResult GetSingleBaby(Guid id)
        {
            var baby = _babiesRepo.GetBabyById(id);

            if (baby is null) return NotFound($"No baby with id - {id} exists in the database");

            return Ok(baby);
        }

        // Add a single baby
        [HttpPost]
        public IActionResult AddSingleTask(Babies baby)
        {
            _babiesRepo.Add(baby);
            return Created($"/babies/{baby.id}", baby);
        }

        // Update a baby
        [HttpPut("update/{id}")]
        public IActionResult UpdateBaby(Guid id, Babies baby)
        {
            var babyToUpdate = _babiesRepo.GetBabyById(id);
            if (babyToUpdate is null) return NotFound($"No baby with id - {id} exists in the database");

            var updatedBaby = _babiesRepo.Update(id, baby);
            return Ok(updatedBaby);
        }

        // Delete a single baby
        [HttpDelete("deleteBaby/{id}")]
        public IActionResult RemoveBaby(Guid id)
        {
            _babiesRepo.Remove(id);
            return Ok();
        }
    }
}
