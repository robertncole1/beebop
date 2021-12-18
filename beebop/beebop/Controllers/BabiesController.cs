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
        UserRepository _userRepo;
        public string FirebaseUid => User.FindFirst(claim => claim.Type == "user_id").Value;


        public BabiesController(BabiesRepository babiesRepo,UserRepository userRepo)
        {
            _babiesRepo = babiesRepo;
            _userRepo = userRepo;
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
        public IActionResult AddSingleBaby(Babies baby)
        {
            //get user by the currently logged in firebase user
            var user = _userRepo.GetUserByGoogleId(FirebaseUid);
            //set the user id for the baby to the currently logged in user's user.id
            baby.userId = user.id;

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
