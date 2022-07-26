CREATE TABLE image_files(
    id SERIAL NOT NULL PRIMARY KEY,
    filename TEXT UNIQUE NOT NULL,
    file TEXT NOT NULL,
    mimetype  TEXT NOT NULL,
    size INT NOT NULL
);

CREATE TABLE users (
  id               SERIAL PRIMARY KEY,
  image_file_id      INT REFERENCES  image_files(id),
  author       VARCHAR(30) NOT NULL,
  description VARCHAR(120) NOT NULL,
);