CREATE TABLE users (
  id               SERIAL PRIMARY KEY,
  author       VARCHAR(30) NOT NULL,
  description VARCHAR(120) NOT NULL
);


CREATE TABLE image_files(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT,
    filename TEXT UNIQUE NOT NULL,
    file TEXT NOT NULL,
    mimetype  TEXT NOT NULL,
    size INT NOT NULL,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)

);

