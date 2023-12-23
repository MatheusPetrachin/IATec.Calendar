using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iatec.calendar.Migrations
{
    public partial class AddField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EventDate",
                schema: "calendar",
                table: "events",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventDate",
                schema: "calendar",
                table: "events");
        }
    }
}
