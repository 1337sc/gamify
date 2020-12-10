using Microsoft.EntityFrameworkCore.Migrations;

namespace GamifyMain.Migrations
{
    public partial class Bound_Game_And_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UsersWishedGames_GameId",
                table: "UsersWishedGames",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersWishedGames_UserId",
                table: "UsersWishedGames",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersWishedGames_Games_GameId",
                table: "UsersWishedGames",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersWishedGames_Users_UserId",
                table: "UsersWishedGames",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersWishedGames_Games_GameId",
                table: "UsersWishedGames");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersWishedGames_Users_UserId",
                table: "UsersWishedGames");

            migrationBuilder.DropIndex(
                name: "IX_UsersWishedGames_GameId",
                table: "UsersWishedGames");

            migrationBuilder.DropIndex(
                name: "IX_UsersWishedGames_UserId",
                table: "UsersWishedGames");
        }
    }
}
