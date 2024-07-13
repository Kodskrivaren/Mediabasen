using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mediabasen.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addedDatesToProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddedToStoreDate",
                table: "Products",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "Products",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedToStoreDate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "Products");
        }
    }
}
