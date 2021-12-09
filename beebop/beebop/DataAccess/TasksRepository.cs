using beebop.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace beebop.DataAccess
{
    public class TasksRepository
    {
        readonly string _connectionString;

        public TasksRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("beebop");
        }

        internal IEnumerable<Tasks> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var tasks = db.Query<Tasks>(@"Select *
                                        From Tasks");

            return tasks;
        }

        internal IEnumerable<Tasks> GetParentTasks(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Tasks
                        WHERE Tasks.userId = @userId";
            var task = db.Query<Tasks>(sql, new { userId });
            return task;
        }

        internal IEnumerable<Tasks> GetCaregiverTasks(Guid caregiverId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Tasks
                        WHERE Tasks.caregiverId = @caregiverId";
            var task = db.Query<Tasks>(sql, new { caregiverId });
            return task;
        }
    }
}