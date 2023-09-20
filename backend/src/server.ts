import express from 'express';
import logger from 'jet-logger';
import cors from 'cors';
import mongoose from 'mongoose';
import process from 'process';
import userController from "@src/controllers/user.controller";
import questionController from "@src/controllers/question.controller";

const app = express();
const PORT = 5000;

const run = async () => {
    await mongoose.connect('mongodb://database/tester');

    app.listen(PORT, () => {
        logger.info(`Server is running on http://165.232.76.67:${PORT}`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};


app.use(express.static('src/public/uploads'));
app.use(express.json());
app.use(cors());

app.use('/user', userController);
app.use('/question', questionController);

run().catch(e => logger.err(e));