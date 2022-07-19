createdb twoiam 
psql twoiam 

drop table if exists users;
drop table if exists images;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  github_name VARCHAR(100) NOT NULL
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  users_id INT REFERENCES users(id),
  author VARCHAR(100) NOT NULL,
  title VARCHAR(120),
  s3url VARCHAR(255) NOT NULL,
  date_uploaded DATE NOT NULL
);