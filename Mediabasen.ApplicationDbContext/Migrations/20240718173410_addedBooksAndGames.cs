using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mediabasen.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addedBooksAndGames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeveloperId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductBook_PublisherId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductGame_PublisherId",
                table: "Products",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DeveloperId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductBook_PublisherId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductGame_PublisherId",
                table: "Products");
        }
    }
}
