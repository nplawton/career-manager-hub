import pg from "pg";
import fs from "fs";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

db.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(process.env.DATABASE_URL)
  console.log('Connected to database')
})

console.log("Running SQL migrate...")

const migrateQuery = fs.readFileSync('./migrate.sql', { encoding: 'utf8' })

  db.query(migrateQuery, (err, res) => {
    if (err)
      console.log(err)
    else
      console.log('Migrate Completed!')
      pool.end()
  })



// async function migration() {
//     await db.query(`DROP TABLE IF EXISTS milestone CASCADE`, (err, data) => {
//         if (err) {
//             console.log('Drop tables failed', err);
//         }
//         db.query(`CREATE TABLE milestone (
//             mile_id PRIMARY KEY SERIAL NOT NULL,
//             mile_name TEXT NOT NULL,
//             progress_stat DECIMAL (2,2),
//         )`, (err, data) => {
//             if(err){
//                 console.log('Create Milestone table failed', err);
//             }else{
//                 console.log('Create Milestone table sucessful');
//             }
//         })
//     });

//     await db.query(`DROP TABLE IF EXISTS service_manager CASCADE`, (err, data) => {
//         if(err){
//             console.log('TSCM table drop failure');
//         }
//         db.query(`CREATE TABLE service_manager (
//             tscm__id SERIAL PRIMARY KEY NOT NULL,
//             tscm_first VARCHAR(50) NOT NULL,
//             tscm_last VARCHAR(50) NOT NULL,
//             login_id VARCHAR(50) NOT NULL,
//             tscm_password text NOT NULL,
//             tscm_email text NOT NULL,
//         )`, (err, data) => {
//             if(err){
//                 console.log('Create TSCM table failed', err);
//             }else{
//                 console.log('TSCM table created');
//             }
//         })
//     });

//     await db.query (`DROP TABLE IF EXISTS student CASCADE`, (err, data) => {
//         if (err){
//             console.log('Student table failure', err);
//         }

//         db.query(`CREATE TABLE student (
//             student__id SERIAL PRIMARY KEY NOT NULL,
//             student_first VARCHAR(50) NOT NULL,
//             student_last VARCHAR(50) NOT NULL,
//             cohort VARCHAR(50) NOT NULL,
//             sec_clearance boolean,
//             hired boolean,
//             tscm__id INTEGER NOT NULL REFERENCES service_manager (tscm__id),
//             mile_id INTEGER NOT NULL REFERENCES milestone (mile_id),
//         )`, (err, data) => {
//             if(err){
//                 console.log('Create Student Table failed');
//             }else{
//                 console.log('Student table create sucessful');
//             }
//         })

//     });

//     await db.query (`DROP TABLE IF EXISTS calendar CASCADE`, (err, data) => {
//         if(err){
//             console.log('Calendar table failure', err);
//         }

//         db.query(`CREATE TABLE calendar (
//             event__id SERIAL PRIMARY KEY NOT NULL,
//             event_name VARCHAR(50) NOT NULL,
//             tscm__id INTEGER NOT NULL REFERENCES service_manager (tscm__id),
//             event_date DATE NOT NULL,
//             event_time TIME NOT NULL,
//             speak_con boolean,
//             event_descrip text NOT NULL,
//         )`, (err, data) => {
//             if(err){
//                 console.log('Create Calendar Table failed', err);
//             }else{
//                 console.log('Create Calendar Table successful');
//             }
//         })

//     });
// }