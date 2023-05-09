import pg from "pg";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function migration() {
    await db.query(`DROP TABLE IF EXISTS milestone CASCADE`, (err, data) => {
        if (err) {
            console.log('Drop tables failed', err);
        }
        db.query(`CREATE TABLE milestone (
            id SERIAL PRIMARY KEY NOT NULL,
            mile_name TEXT NOT NULL,
            progress_stat TEXT NOT NULL,
            student_id INTEGER REFERENCES student (id)
        )`, (err, data) => {
            if(err){
                console.log('Create Milestone table failed', err);
            }else{
                console.log('Create Milestone table successful');
            }
        })
    });

    await db.query(`DROP TABLE IF EXISTS service_manager CASCADE`, (err, data) => {
        if(err){
            console.log('TSCM table drop failure');
        }
        db.query(`CREATE TABLE service_manager (
            id SERIAL PRIMARY KEY NOT NULL,
            tscm_first VARCHAR(50) NOT NULL,
            tscm_last VARCHAR(50) NOT NULL,
            login_id VARCHAR(50) NOT NULL,
            tscm_password text NOT NULL,
            tscm_email text NOT NULL,
            tscm_avatar text NOT NULL
        )`, (err, data) => {
            if(err){
                console.log('Create TSCM table failed', err);
            }else{
                console.log('TSCM table created');
            }
        })
    });

    await db.query (`DROP TABLE IF EXISTS student CASCADE`, (err, data) => {
        if (err){
            console.log('Student table failure', err);
        }

        db.query(`CREATE TABLE student (
            id SERIAL PRIMARY KEY NOT NULL,
            student_first VARCHAR(50) NOT NULL,
            student_last VARCHAR(50) NOT NULL,
            cohort VARCHAR(50) NOT NULL,
            sec_clearance VARCHAR(50) NOT NULL,
            career_status VARCHAR(50) NOT NULL,
            course_status VARCHAR(50) NOT NULL,
            tscm_id INTEGER NOT NULL REFERENCES service_manager (id)
        )`, (err, data) => {
            if(err){
                console.log('Create Student Table failed', err);
            }else{
                console.log('Student table created successfully');
            }
        })

    });

    await db.query (`DROP TABLE IF EXISTS calendar CASCADE`, (err, data) => {
        if(err){
            console.log('Calendar table failure', err);
        }

        db.query(`CREATE TABLE calendar (
            id SERIAL PRIMARY KEY NOT NULL,
            event_name VARCHAR(50) NOT NULL,
            tscm_id INTEGER NOT NULL REFERENCES service_manager (id),
            event_date DATE NOT NULL,
            event_time TIME NOT NULL,
            speak_con VARCHAR(50) NOT NULL,
            event_descrip text NOT NULL
        )`, (err, data) => {
            if(err){
                console.log('Create Calendar Table failed', err);
            }else{
                console.log('Create Calendar Table successful');
            }
        })

    });
}

migration();