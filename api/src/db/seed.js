const faker = require('faker');
const { Pool } = require('pg');

const db = new Pool({ connectionString: process.env.DATABASE_URL });

const SEED_STUDENT_ROWS = 200;
const cohorts = ['cohort 16', 'cohort 17', 'cohort 18', 'cohort 19', 'cohort 20', 'cohort 21', 'cohort 22'];
const SEED_CAREER_MANAGER = 7;

const seedStudents = async () => {
    const studentList = [];

    for (let i = 0; i < SEED_STUDENT_ROWS; i++){
        studentList.push({
            student_first: faker.name.firstName(),
            student_last: faker.name.lastName(),
            cohort: faker.random.arrayElement(cohorts),
            sec_clearance: faker.datatype.boolean(),
            hired: false,
            tscm__id: faker.datatype.number({ min: 1, max: 7 }),
            mile_id: 4,
        });
    }

    try {

        const queryString = `INSERT INTO student (student_first, student_last, cohort, sec_clearance, hired, tscm__id, mile_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        for (let i = 0; i < SEED_STUDENT_ROWS; i++){
            console.log(`seeded ${i} students!`);
            const {student_first, student_last, cohort, sec_clearance, hired, tscm__id, mile_id} = studentList[i];
            await db.query(queryString, [student_first, student_last, cohort, sec_clearance, hired, tscm__id, mile_id]);
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

        const queryString = `INSERT INTO service_managers (tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar) 
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

    for (let i = 0; i < 15; i++){
        calendarEvent.push({
            event_name: faker.company.companyName(),
            tscm_id: faker.datatype.number({ min: 1, max: 7 }),
            event_date: faker.date.between(startDate, endDate),
            event_time: faker.time_object(),
            speak_con: faker.random.choice(["yes", "no", "pending"]),
            event_descrip: faker.lorem.paragraph(sentenceCount = 4),
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
    const studentMilestone = [];

    studentMilestone.push({
        mile_name: ['Cover Letter', 'Resume', 'LinkedIn', 'Personal Narrative', 'Hunter Access'],
        progress_stat: {'Cover_stat': null, 'Resume_stat': null, 'LinkedIn_stat': null, 'Narrative_stat': null, 'Hunter_stat': null},
    })

    try {
        
        const queryString = `INSERT INTO milestone (mile_name, progress_stat) VALUES ($1, $2) RETURNING *`;

        for (let i = 0; i < SEED_STUDENT_ROWS; i++){
            console.log(`seeded ${i} milestone!`);
            const {mile_name, progress_stat} = studentMilestone[i];
            await db.query(queryString, [mile_name, progress_stat]);
        }

        console.log('Calendar seeded successfully');
    } catch (err) {
        console.log('Error seeding Calendar', err);
    }

}

seedStudents().then(() => seedServiceManager().then(() => seedCalendar().then(() => seedMilestone())));
