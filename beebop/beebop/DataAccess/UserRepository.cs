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

        internal IEnumerable<Users> GetAllCaregiversOrParents(string isParent)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Users 
                        WHERE isParent = @isParent";
            var users = db.Query<Users>(sql, new { isParent });

            return users;
        }

        //internal IEnumerable<Users> GetAllParents(bool isParent)
        //{
        //    using var db = new SqlConnection(_connectionString);
        //    var sql = @"SELECT * FROM Users 
        //                WHERE isParent = @isParent";
        //    var users = db.Query<Users>(sql, new { isParent });

        //    return users;
        //}

        //internal IEnumerable<Users> GetAllParents()
        //{
        //    using var db = new SqlConnection(_connectionString);

        //    var sql = @"Select * From Users
        //        WHERE isParent = 1";
        //    var users = db.Query<Users>(sql);

        //    return users;
        //}
    }
}