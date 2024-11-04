import app from './app';
import mongoConnect from './utils/db';

const port = process.env.PORT || 3000;

// Connect to DB and start the server
(async () => {
  try {
    await mongoConnect();
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error in starting server: ', (error as Error).message);
  }
})();

