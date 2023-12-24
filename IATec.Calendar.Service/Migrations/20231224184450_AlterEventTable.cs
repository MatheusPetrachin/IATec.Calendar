using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iatec.calendar.Migrations
{
    public partial class AlterEventTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                schema: "calendar",
                table: "events",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                schema: "calendar",
                table: "events",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                schema: "calendar",
                table: "events",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deleted",
                schema: "calendar",
                table: "events");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                schema: "calendar",
                table: "events");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                schema: "calendar",
                table: "events");
        }
    }
}
