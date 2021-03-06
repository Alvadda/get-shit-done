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

ALTER TABLE todo
    ADD done BOOLEAN DEFAULT FALSE;

ALTER TABLE todo
    ADD done_date timestamp without time zone DEFAULT NULL,
    ADD dou_date timestamp without time zone DEFAULT NULL;  

create function update_done_date()
returns trigger as $$
begin
  IF OLD.done = false AND NEW.done = true THEN
    NEW.done_date := LOCALTIMESTAMP;
  END IF;
	return NEW;
end;
$$ language plpgsql;

CREATE TRIGGER update_done_date_trigger
    BEFORE UPDATE OF done ON todo
	FOR EACH ROW
    EXECUTE PROCEDURE update_done_date();


CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    user_id INTEGER,
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

ALTER TABLE todo
    ADD project_id INTEGER,
    ADD CONSTRAINT fk_todo_project FOREIGN KEY (project_id) REFERENCES projects (project_id);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE send_session(
    send_session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    max_todos INTEGER,
    expiration_date timestamp without time zone DEFAULT NULL,
    user_id INTEGER,
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);