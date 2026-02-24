#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255) NOT NULL,
  year_released INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

INSERT INTO categories (name)
VALUES
  ('Action'),
  ('Drama'),
  ('Romance'),
  ('Animation');

INSERT INTO movies (title, director, year_released, category_id)
VALUES
  ('The Dark Knight', 'Christopher Nolan', 2008, 1),
  ('The Shawshank Redemption', 'Frank Darabont', 1994, 2),
  ('Titanic', 'James Cameron', 1997, 3),
  ('The Lion King', 'Roger Allers', 1994, 4);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
