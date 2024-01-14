import Logger from './logging.js'
import cors from 'cors';
import compression from 'compression'
import express from 'express';
import tracks from './src/routes/tracks/index.js';
import images from './src/routes/images/index.js';
import regions from './src/routes/regions/index.js';
import { dotEnv } from './src/utils.js'
import { model } from './src/model.js'

dotEnv()



const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());
app.use(compression());

// Built-In Middleware

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// app.use(bodyParser.json());
app.use(Logger())
// Custom Middleware


app.use((req, _, next) => {
  model.sessionToken = req.get('session-token')
  model.user.role = req.get('user-role')
  next();
})

// * Routes * //

// app.use('/api/auth', auth)
app.use('/api/tracks', tracks)
app.use('/api/images', images)
app.use('/api/regions', regions)
// app.use('/users', user);
// app.use('/messages', message);

// * Start * //
app.listen(process.env.PORT, () =>
  console.log(`Story Board API running on PORT ${process.env.PORT}!`),
);
