using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iatec.calendar.Migrations
{
    public partial class UpdateColumnEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventDate",
                schema: "calendar",
                table: "events");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                schema: "calendar",
                table: "events",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                schema: "calendar",
                table: "events",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                schema: "calendar",
                table: "events");

            migrationBuilder.DropColumn(
                name: "StartDate",
                schema: "calendar",
                table: "events");

            migrationBuilder.AddColumn<DateTime>(
                name: "EventDate",
                schema: "calendar",
                table: "events",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
