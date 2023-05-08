DROP TABLE IF EXISTS milestone, student, service_manager, calendar;

CREATE TABLE service_manager (
  tscm_id SERIAL PRIMARY KEY NOT NULL,
  tscm_first VARCHAR(50) NOT NULL,
  tscm_last VARCHAR(50) NOT NULL,
  login_id VARCHAR(50) NOT NULL,
  tscm_password TEXT NOT NULL,
  tscm_email TEXT NOT NULL,
  tscm_avatar TEXT
);

CREATE TABLE student (
  student_id SERIAL PRIMARY KEY NOT NULL,
  student_first VARCHAR(50) NOT NULL,
  student_last VARCHAR(50) NOT NULL,
  cohort VARCHAR(50) NOT NULL,
  sec_clearance TEXT,
  career_status TEXT,
  course_status TEXT,
  tscm_id INTEGER NOT NULL,
  FOREIGN KEY (tscm_id) REFERENCES service_manager (tscm_id)
);

CREATE TABLE milestone (
  mile_id SERIAL NOT NULL,
  mile_name TEXT NOT NULL,
  progress_stat TEXT,
  student_id INTEGER NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  PRIMARY KEY (mile_id)
);


CREATE TABLE calendar (
  event_id SERIAL PRIMARY KEY NOT NULL,
  event_name VARCHAR(50) NOT NULL,
  tscm_id INTEGER NOT NULL,
  event_date DATE NOT NULL,
  event_time DATE NOT NULL,
  speak_con TEXT,
  event_descrip TEXT NOT NULL,
  FOREIGN KEY (tscm_id) REFERENCES service_manager (tscm_id)
);

-- CREATE TABLE tasks (
--   id SERIAL PRIMARY KEY,
--   description TEXT
-- );