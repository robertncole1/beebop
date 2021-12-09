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
    public class TasksController : ControllerBase
    {
        TasksRepository _tasksRepo;

        public TasksController(TasksRepository tasksRepo)
        {
            _tasksRepo = tasksRepo;
        }
        // Get all the tasks from the database
        [HttpGet]
        public IActionResult GetAllTasks()
        {
            return Ok(_tasksRepo.GetAll());
        }

        // Get all the parent's tasks from the database
        [HttpGet("{userId}/parent")]
        public IActionResult GetTasksByParent(Guid userId)
        {
            var task = _tasksRepo.GetParentTasks(userId);
            if (task is null) return NotFound($"You have no tasks");
            return Ok(task);
        }

        // Get all the caregivers's tasks from the database
        [HttpGet("{caregiverId}/caregiver")]
        public IActionResult GetTasksByCaregiver(Guid caregiverId)
        {
            var task = _tasksRepo.GetCaregiverTasks(caregiverId);
            if (task is null) return NotFound($"You have no tasks");
            return Ok(task);
        }
    }
}
