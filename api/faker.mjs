import faker from 'faker';
import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;

let db;

if(process.env.NODE_ENV === 'development') {
    db = new Pool({  
    user: process.env.POSTGRES_USER,
    host: 'database',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432 
    });
} else {
  // If the app is not running in the development environment, use the deployed database
    db = new Pool({ connectionString: process.env.DATABASE_URL });
}

const cohorts = ['MCSP-16', 'MCSP-17', 'MCSP-18', 'MCSP-19', 'MCSP-20', 'MCSP-21', 'MCSP-22'];
const careerStatus = ['Searching', 'Hired', 'Not Started'];
const courseStatus = ['Student', 'Graduate'];
const secClearance = ['Undetermined', 'None', 'SECRET', 'TOP SECRET', 'TOP SECRET//SCI'];
const collegeDegree = ['Undetermined', 'None', 'Associate in CS/STEM', 'Associate Not in CS/STEM', 'Bachelor in CS/STEM', 'Bachelor Not in CS/STEM', 'Masters in CS/STEM', 'Masters Not in CS/STEM']

const SEED_CAREER_MANAGER = 7;
const SEED_STUDENT_ROWS = 200;

const seedStudents = async () => {
    const studentList = [];

    for (let i = 0; i < SEED_STUDENT_ROWS; i++){
        let randomNumber = Math.floor(Math.random() * 3);  // Generates a random number between 0-2
        let randomNumber2 = Math.floor(Math.random() * 2); // Generates a random number between 0-1
        let randomNumber3 = Math.floor(Math.random() * 5); // Generates a random number between 0-4
        let randomNumber4 = Math.floor(Math.random() * 9); // Generates a random number between 0-8

        studentList.push({
            student_first: faker.name.firstName(),
            student_last: faker.name.lastName(),
            cohort: faker.random.arrayElement(cohorts),
            sec_clearance: secClearance[randomNumber3],
            career_status: careerStatus[randomNumber],
            course_status: courseStatus[randomNumber2],
            college_degree: collegeDegree[randomNumber4],
            tscm__id: faker.datatype.number({ min: 1, max: 7 }),
        });
    }

    try {
        const queryString = `INSERT INTO student (student_first, student_last, cohort, sec_clearance, career_status, course_status, college_degree, tscm_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        for (let i = 0; i < SEED_STUDENT_ROWS; i++){
            console.log(`seeded ${i} students!`);
            const {student_first, student_last, cohort, sec_clearance, career_status, course_status, college_degree, tscm__id} = studentList[i];
            await db.query(queryString, [student_first, student_last, cohort, sec_clearance, career_status, course_status, college_degree, tscm__id]);
        }

        console.log('Students seeded successfully');
    } catch (err) {
        console.log('Error seeding students', err);
    }
};

const seedServiceManager = async () => {
    const careerManager = [];

    for (let i = 0; i < SEED_CAREER_MANAGER; i++){
        careerManager.push({
            tscm_first: faker.name.firstName(),
            tscm_last: faker.name.lastName(),
            login_id: faker.internet.userName(),
            tscm_password: faker.internet.password(10),
            tscm_email: faker.internet.email(),
            tscm_avatar: faker.internet.avatar(),
        });
    }

    try {

        const queryString = `INSERT INTO service_manager (tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar) 
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

        for (let i = 0; i < SEED_CAREER_MANAGER; i++){
            console.log(`seeded ${i} TSCM!`);
            const {tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar} = careerManager[i];
            await db.query(queryString, [tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar]);
        }

        console.log('TSCM seeded successfully');
    } catch (err) {
        console.log('Error seeding TSCM', err);
    }

}

const seedCalendar = async () => {
    const calendarEvent = [];

    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 8, 30);
    const speakContactArray = ["yes", "no", "pending"]

    for (let i = 0; i < 15; i++){
        let randomNumber = Math.floor(Math.random() * 3);

        calendarEvent.push({
            event_name: faker.company.companyName(),
            tscm_id: faker.datatype.number({ min: 1, max: 7 }),
            event_date: faker.date.between(startDate, endDate),
            event_time: faker.datatype.datetime(),
            speak_con: speakContactArray[randomNumber],
            event_descrip: faker.lorem.paragraph(4),
        });
    }

    try {
        
        const queryString = `INSERT INTO calendar (event_name, tscm_id, event_date, event_time, speak_con, event_descrip) 
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        
        for (let i = 0; i < 15; i++){
            console.log(`seeded ${i} Calendar events!`);
            const {event_name, tscm_id, event_date, event_time, speak_con, event_descrip} = calendarEvent[i];
            await db.query(queryString, [event_name, tscm_id, event_date, event_time, speak_con, event_descrip]);
        }
        
        console.log('Calendar seeded successfully');
    } catch (err) {
        console.log('Error seeding Calendar', err);
    }

}

const seedMilestone = async () => {
    const studentMilestone = ['Cover Letter', 'Resume', 'LinkedIn', 'Personal Narrative', 'Hunter Access'];
    const progress_stat = ['In-Progress', 'Completed', 'Un-Satisfactory'];
    let currentStudentNumber = 1;

    try {
        const queryString = `INSERT INTO milestone (mile_name, progress_stat, student_id) VALUES ($1, $2, $3) RETURNING *`;

        for (let i = 0; i < SEED_STUDENT_ROWS; i++){
            for (let i = 0; i < studentMilestone.length; i++){
            let randomNumber = Math.floor(Math.random() * 3);

            console.log(`seeded ${i} milestone!`);
            await db.query(queryString, [studentMilestone[i], progress_stat[randomNumber], currentStudentNumber]);
        }
        currentStudentNumber++;
    }

        console.log('Calendar seeded successfully');
    } catch (err) {
        console.log('Error seeding Calendar', err);
    }

}

seedServiceManager().then(() => seedStudents().then(() => seedCalendar().then(() => seedMilestone())));
