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

        // Get single task from the database
        [HttpGet("{id}")]
        public IActionResult GetSingleTask(Guid id)
        {
            var task = _tasksRepo.GetTaskById(id);

            if (task is null) return NotFound($"No robot with id - {id} exists in the database");

            return Ok(task);
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

        // Add a single task
        [HttpPost]
        public IActionResult AddSingleTask(Tasks task)
        {
            _tasksRepo.Add(task);
            return Created($"/robots/{task.id}", task);
        }

        // Update a robot
        [HttpPut("update/{id}")]
        public IActionResult UpdateTask(Guid id, Tasks task)
        {
            var taskToUpdate = _tasksRepo.GetTaskById(id);
            if (taskToUpdate is null) return NotFound($"No robot with id - {id} exists in the database");

            var updatedTask = _tasksRepo.Update(id, task);
            return Ok(updatedTask);
        }

        // Delete a single task
        [HttpDelete("deleteTask/{id}")]
        public IActionResult RemoveOrder(Guid id)
        {
            _tasksRepo.RemoveTask(id);
            return Ok();
        }
    }
}
