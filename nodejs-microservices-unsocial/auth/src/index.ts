import dotenv from 'dotenv-safe';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from './app';

const parsedNodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: parsedNodeEnv === 'development' ? '.env.dev' : '.env.production',
});

const mongoMemoryServer = new MongoMemoryServer();

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  const mongoUri = await mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Listening on port 4000.');
});
