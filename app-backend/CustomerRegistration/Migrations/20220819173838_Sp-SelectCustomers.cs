using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerRegistration.Migrations
{
    public partial class SpSelectCustomers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"CREATE PROCEDURE [dbo].[SelectCustomers] @_CustomerId INT
                        AS

                            IF @_CustomerId = 0
                            BEGIN
                               SELECT * FROM Customer
                            END
                            ELSE
                            BEGIN
                                SELECT * FROM Customer WHERE Customer.Id = @_CustomerId
                            END


                        GO";

            migrationBuilder.Sql(sp);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
