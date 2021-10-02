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
    ADD done_date DATE DEFAULT NULL,
    ADD dou_date DATE DEFAULT NULL;  

create function update_done_date()
returns trigger as $$
begin
  IF OLD.done = false AND NEW.done = true THEN
    NEW.done_date := current_date;
  END IF;
	return NEW;
end;
$$ language plpgsql;

CREATE TRIGGER update_done_date_trigger
    BEFORE UPDATE OF done ON todo
	FOR EACH ROW
    EXECUTE PROCEDURE update_done_date();


