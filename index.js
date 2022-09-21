import Logger from './logging.js'
import cors from 'cors';
import express from 'express';
import routes from './src/routes/index.js';
import { dotEnv } from './src/utils.js'
import { model } from './src/model.js'
dotEnv()



const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(Logger())
// Custom Middleware


app.use((req, res, next) => {
  model.sessionToken = req.get('session-token')
  model.user.role = req.get('user-role')
  next();
})

// * Routes * //

app.use('/api/auth', routes.auth)
app.use('/api/events', routes.events)
app.use('/api/blogs', routes.blogs)
app.use('/api/gallery', routes.gallery)
app.use('/api/accounts', routes.accounts)
// app.use('/users', routes.user);
// app.use('/messages', routes.message);

// * Start * //
app.listen(process.env.PORT, () =>
  console.log(`BACA API running on PORT ${process.env.PORT}!`),
);
