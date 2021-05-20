/**
Add extensions
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/**
Create DB
*/
CREATE DATABASE hsaccountant;

/**
Create table for domains
*/
CREATE TABLE IF NOT EXISTS transactions (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  category VARCHAR(50) NOT NULL,
  amount DECIMAL NOT NULL,
  withdrawn BOOLEAN NOT NULL SET DEFAULT FALSE,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NULL
);