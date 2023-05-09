import express from "express";

import pg from "pg";

const PORT = process.env.PORT

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json());

app.get("/api/tasks", async (req, res, next) => {
  const result = await db.query("SELECT * FROM tasks").catch(next);
  res.send(result.rows);
});

app.get("/api/tasks/:id", async (req, res, next) => {
  const result = await db
    .query("SELECT * FROM tasks WHERE id = $1", [req.params.id])
    .catch(next);

  if (result.rows.length === 0) {
    res.sendStatus(404);
  } else {
    res.send(result.rows[0]);
  }
});

app.post("/api/tasks", async (req, res, next) => {
  const { description } = req.body;

  const result = await db
    .query("UPDATE service_manager SET tscm_first = $1, tscm_last = $2, login_id = $3, tscm_password = $4, tscm_email = $5, tscm_avatar = $6  WHERE tscm_id = $7 RETURNING *", [firstName, lastName, login_id, password, email, avatar, id])
    .catch(next);
  res.send(result.rows[0]);
})

app.post('/managers/login', async (req, res, next) => {
  const email = req.body.email;
  const inputPassword = req.body.password;

  try {
    const results = await db.query('SELECT * FROM service_manager WHERE tscm_email = $1', [email])
    const manager = results.rows[0]

    if(!manager) {
      return res.status(404).json({message: 'Incorrect Password or Email'})
    }

    if(manager.tscm_password === inputPassword) {
      res.json({ success: true, manager })
    }
  } catch (error) {
    console.error('error idk bro 🤷' , error)
    res.status(500).json({ message: 'idk bro 🤷'})
    console.log('bad')
  }
})

// Need to think about this more, because we need to update student records and calendar records BEFORE we delete any manager records otherwise we are violating foreign keys

// app.delete("/managers/:id", async (req, res, next) => {
//   const id = req.params.id;

//     await db.query("DELETE FROM service_manager WHERE service_manager.tscm_id = $1", [id])

//      .catch(next);
//    res.send('Sucessfully Deleted Manager Records!');
// })

// -------------------------------------------------------------- EVENTS ROUTES -------------------------------------------------------------

app.get ("/events", async (req, res, next) => {
  const results = await db.query(`SELECT calendar.*, service_manager.tscm_first, service_manager.tscm_last FROM calendar
                                  JOIN service_manager ON service_manager.tscm_id = calendar.tscm_id`).catch(next);
  res.send(results.rows)
})

app.get ("/events/:id", async (req, res, next) => {
  const id = req.params.id;

  const result = await db.query(`SELECT calendar.*, service_manager.tscm_first, service_manager.tscm_last FROM calendar
                                  JOIN service_manager ON service_manager.tscm_id = calendar.tscm_id
                                  WHERE event_id = ${id}`).catch(next);

                      if (result.rows.length === 0) {
                        res.sendStatus(404);
                      } else {
                        res.send(result.rows[0]);
                      }
})

app.post("/events", async (req, res, next) => {
  const eventName = req.body.event_name;
  const tscmId = req.body.tscm_id;
  const date = req.body.event_date;
  const time = req.body.event_time;
  const speakersContacted = req.body.speak_con;
  const description = req.body.event_descrip;

  const result = await db
    .query("INSERT INTO calendar(event_name, tscm_id, event_date, event_time, speak_con, event_descrip) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [eventName, tscmId, date, time, speakersContacted, description])
    .catch(next);
  res.send(result.rows[0]);
});

app.delete("/api/tasks/:id", async (req, res, next) => {
  const { id } = req.params;

  await db.query("DELETE FROM tasks WHERE id = $1", [id]).catch(next);
  res.sendStatus(204);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

export default app;
