-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/vyOSaz
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Team" (
    "id" SERIAL   NOT NULL,
    "name" STRING   NOT NULL,
    CONSTRAINT "pk_Team" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_Team_name" UNIQUE (
        "name"
    )
);

CREATE TABLE "Player" (
    "id" SERIAL   NOT NULL,
    "name" STRING   NOT NULL,
    "team" team.id   NOT NULL,
    CONSTRAINT "pk_Player" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Referee" (
    "id" SERIAL   NOT NULL,
    "name" STRING   NOT NULL,
    CONSTRAINT "pk_Referee" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Game" (
    "id" SERIAL   NOT NULL,
    "date" Date   NOT NULL,
    "season" Season.id   NOT NULL,
    CONSTRAINT "pk_Game" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Goal" (
    "id" SERIAL   NOT NULL,
    "game" Game.id   NOT NULL,
    "player" Player.id   NOT NULL,
    "goalTime" Time   NOT NULL,
    CONSTRAINT "pk_Goal" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "GameReferee" (
    "GameID" Game.id   NOT NULL,
    "RefID" Referee.id   NOT NULL
);

CREATE TABLE "Match" (
    "id" SERIAL   NOT NULL,
    "Team1" Team.id   NOT NULL,
    "Team2" Team.id   NOT NULL,
    "GameID" Game.id   NOT NULL,
    "WinnerID" Team.id   NOT NULL,
    CONSTRAINT "pk_Match" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Season" (
    "id" SERIAL   NOT NULL,
    "startDate" Date   NOT NULL,
    "endDate" Date   NOT NULL,
    CONSTRAINT "pk_Season" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Standings" (
    "id" SERIAL   NOT NULL,
    "Team" Team.id   NOT NULL,
    "Season" Season.id   NOT NULL,
    "Points" int   NOT NULL,
    "Wins" int   NOT NULL,
    "Losses" int   NOT NULL,
    "Draws" int   NOT NULL,
    "GoalsFor" int   NOT NULL,
    "GoalsAgainst" int   NOT NULL,
    CONSTRAINT "pk_Standings" PRIMARY KEY (
        "id"
     )
);

