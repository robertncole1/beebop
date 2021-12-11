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

        internal Tasks GetTaskById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Tasks
                        WHERE id = @id";
            var task = db.QuerySingleOrDefault<Tasks>(sql, new { id });
            return task;

        }

        internal IEnumerable<Tasks> GetBabyTasks(Guid babyId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Tasks
                        WHERE Tasks.babyId = @babyId";
            var task = db.Query<Tasks>(sql, new { babyId });
            return task;
        }

        internal Guid Add(Tasks task)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Tasks(babyId, name, description, scheduled, completed)
                        OUTPUT INSERTED.id
                        VALUES(@babyId, @name, @description, @scheduled, @completed)";
            var id = db.ExecuteScalar<Guid>(sql, task);
            task.id = id;

            return id;
        }

        internal object Update(Guid id, Tasks task)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Tasks
                        SET babyId = @babyId,
                        name = @name,
                        description = @description,
                        scheduled = @scheduled,
                        completed = @completed
                        OUTPUT INSERTED.*
                        WHERE id = @id
                        ";
            task.id = id;
            var updatedTask = db.QuerySingleOrDefault<Tasks>(sql, task);
            return updatedTask;
        }

        internal void Remove(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Tasks
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}