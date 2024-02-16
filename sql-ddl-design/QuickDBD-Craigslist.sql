-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/vyOSaz
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Category" (
    "cat_id" SERIAL   NOT NULL,
    "region_name" STRING   NOT NULL,
    CONSTRAINT "pk_Category" PRIMARY KEY (
        "cat_id"
     )
);

CREATE TABLE "Post" (
    "post_id" SERIAL   NOT NULL,
    "title" STRING   NOT NULL,
    "text" STRING   NOT NULL,
    "user_id" User.user_id   NOT NULL,
    "location" STRING   NOT NULL,
    "region_id" region_id   NOT NULL,
    CONSTRAINT "pk_Post" PRIMARY KEY (
        "post_id"
     )
);

CREATE TABLE "User" (
    "user_id" SERIAL   NOT NULL,
    "username" STRING   NOT NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "user_id"
     )
);

CREATE TABLE "Region" (
    "region_id" SERIAL   NOT NULL,
    "name" STRING   NOT NULL,
    CONSTRAINT "pk_Region" PRIMARY KEY (
        "region_id"
     )
);

CREATE TABLE "CategoryPostTable" (
    "id" SERIAL   NOT NULL,
    "post_id" Post.post_id   NOT NULL,
    "cat_id" Category.cat_id   NOT NULL
);

ALTER TABLE "Category" ADD CONSTRAINT "fk_Category_cat_id" FOREIGN KEY("cat_id")
REFERENCES "CategoryPostTable" ("cat_id");

ALTER TABLE "Post" ADD CONSTRAINT "fk_Post_post_id" FOREIGN KEY("post_id")
REFERENCES "CategoryPostTable" ("post_id");

ALTER TABLE "Post" ADD CONSTRAINT "fk_Post_user_id" FOREIGN KEY("user_id")
REFERENCES "User" ("user_id");

ALTER TABLE "Post" ADD CONSTRAINT "fk_Post_region_id" FOREIGN KEY("region_id")
REFERENCES "Region" ("region_id");

