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
    public class BabiesRepository
    {
        readonly string _connectionString;

        public BabiesRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("beebop");
        }

        internal IEnumerable<Babies> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var babies = db.Query<Babies>(@"Select *
                                        From Babies");

            return babies;
        }

        internal Babies GetBabyById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Babies
                        WHERE id = @id";
            var baby = db.QuerySingleOrDefault<Babies>(sql, new { id });
            return baby;

        }

        internal Guid Add(Babies baby)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Babies(caregiverId, userId, name, age)
                        OUTPUT INSERTED.id
                        VALUES(@caregiverId, @userId, @name, @age)";
            var id = db.ExecuteScalar<Guid>(sql, baby);
            baby.id = id;

            return id;
        }

        internal object Update(Guid id, Babies baby)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Babies
                        SET caregiverId = @caregiverId,
                        name = @name,
                        age = @age,
                        userId = @userId
                        OUTPUT INSERTED.*
                        WHERE id = @id
                        ";
            baby.id = id;
            var updatedBaby = db.QuerySingleOrDefault<Babies>(sql, baby);
            return updatedBaby;
        }

        internal void Remove(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Babies
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}
