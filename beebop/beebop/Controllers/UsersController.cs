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
    public class UserController : ControllerBase
    {
        UserRepository _usersRepo;

        public UserController(UserRepository usersRepo)
        {
            _usersRepo = usersRepo;
        }

        // Get all the users from the database
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_usersRepo.GetAll());
        }

        // Get user by id from the database
        [HttpGet("{id}")]
        public IActionResult GetSingleUser(Guid id)
        {
            var user = _usersRepo.GetUserById(id);

            if (user is null) return NotFound($"No user with id - {id} exists in the database");

            return Ok(user);
        }

        // Get user by google id from the database
        [HttpGet("uid/{id}")]
        public IActionResult GetSingleUserByGoogleId(string id)
        {
            var user = _usersRepo.GetUserByGoogleId(id);

            if (user is null) return Ok(null);

            return Ok(user);
        }

        // Add a single user
        [HttpPost]
        public IActionResult AddSingleUser(Users user)
        {
            _usersRepo.Add(user);
            return Created($"/users/{user.id}", user);
        }

        // update a single user
        [HttpPut("{id}")]
        public IActionResult UpdateUser(Guid id, Users user)
        {
            var userToUpdate = _usersRepo.GetUserById(id);
            if (userToUpdate is null) return NotFound($"No user with id - {id} exists in the database");

            var updatedUser = _usersRepo.Update(id, user);
            return Ok(updatedUser);
        }

        //// Get All Parents //
        [HttpGet("parents/{isParent}")]
        public IActionResult GetAllParentUsers(bool isParent)
        {
            return Ok(_usersRepo.GetAllParents(isParent));
        }

    }
}
