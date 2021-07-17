/**
Add extensions
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/**
Create table for users
*/
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  photo TEXT NULL,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  modified_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NULL
);