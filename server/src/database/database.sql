CREATE DATABASE todo_database;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)

ALTER TABLE todo
    ADD user_id INTEGER,
    ADD CONSTRAINT fk_todo_user FOREIGN KEY (user_id) REFERENCES users (user_id);

