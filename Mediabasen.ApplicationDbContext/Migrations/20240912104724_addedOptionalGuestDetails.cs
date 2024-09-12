using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Mediabasen.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addedOptionalGuestDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext");

            migrationBuilder.AddColumn<int>(
                name: "GuestDetailsId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PlaceOrderPost",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    Adress = table.Column<string>(type: "longtext", nullable: false),
                    PostalCode = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "longtext", nullable: false),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceOrderPost", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_GuestDetailsId",
                table: "Orders",
                column: "GuestDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_PlaceOrderPost_GuestDetailsId",
                table: "Orders",
                column: "GuestDetailsId",
                principalTable: "PlaceOrderPost",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_PlaceOrderPost_GuestDetailsId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "PlaceOrderPost");

            migrationBuilder.DropIndex(
                name: "IX_Orders_GuestDetailsId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "GuestDetailsId",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Orders",
                type: "longtext",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);
        }
    }
}
