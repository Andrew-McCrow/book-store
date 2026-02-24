#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT,
  "user" VARCHAR(255),
  added TIMESTAMP
);

INSERT INTO messages (text, "user", added)
VALUES
  ('Hi there!', 'Amando', '2026-02-23 21:49:59.549227'),
  ('Hello World!', 'Charles', '2026-02-23 21:49:59.549227');
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
