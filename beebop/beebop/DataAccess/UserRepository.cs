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
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("beebop");
        }

        internal IEnumerable<Users> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var users = db.Query<Users>(@"Select *
                                        From Users");

            return users;
        }

        internal Users GetUserById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Users
                        WHERE id = @id";
            var user = db.QuerySingleOrDefault<Users>(sql, new { id });

            return user;

        }

        internal Users GetUserByGoogleId(string googleId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Users
                        WHERE googleId = @googleId";
            var user = db.QuerySingleOrDefault<Users>(sql, new { googleId });
            return user;

        }

        internal Guid Add(Users user)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Users(firstName, lastName, email, isParent, googleId)
                        OUTPUT INSERTED.id
                        VALUES(@firstName, @lastName, @email, @isParent, @googleId)";
            var id = db.ExecuteScalar<Guid>(sql, user);
            user.id = id;

            return id;

        }

        internal object Update(Guid id, Users userToUpdate)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @" UPDATE Users
                         SET firstName = @firstName,
                         lastName = @lastName,
                         email = @Email,
                         isParent = @isParent
                         OUTPUT INSERTED.*
                         WHERE id = @id
                        ";

            userToUpdate.id = id;
            var updatedUser = db.QuerySingleOrDefault<Users>(sql, userToUpdate);
            return updatedUser;
        }

        internal IEnumerable<Users> GetAllParents(bool isParent)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"Select * From Users
                WHERE isParent = @isParent";
            var users = db.Query<Users>(sql, new { isParent });

            return users;
        }
    }
}