using Microsoft.EntityFrameworkCore.Migrations;

namespace GamifyMain.Migrations
{
    public partial class Add_ContactTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contact_Users_FirstUserId",
                table: "Contact");

            migrationBuilder.DropForeignKey(
                name: "FK_Contact_Users_SecondUserId",
                table: "Contact");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contact",
                table: "Contact");

            migrationBuilder.RenameTable(
                name: "Contact",
                newName: "Contacts");

            migrationBuilder.RenameIndex(
                name: "IX_Contact_SecondUserId",
                table: "Contacts",
                newName: "IX_Contacts_SecondUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Contact_FirstUserId",
                table: "Contacts",
                newName: "IX_Contacts_FirstUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_FirstUserId",
                table: "Contacts",
                column: "FirstUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_SecondUserId",
                table: "Contacts",
                column: "SecondUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_FirstUserId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_SecondUserId",
                table: "Contacts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts");

            migrationBuilder.RenameTable(
                name: "Contacts",
                newName: "Contact");

            migrationBuilder.RenameIndex(
                name: "IX_Contacts_SecondUserId",
                table: "Contact",
                newName: "IX_Contact_SecondUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Contacts_FirstUserId",
                table: "Contact",
                newName: "IX_Contact_FirstUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contact",
                table: "Contact",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contact_Users_FirstUserId",
                table: "Contact",
                column: "FirstUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contact_Users_SecondUserId",
                table: "Contact",
                column: "SecondUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
