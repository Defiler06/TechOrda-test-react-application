import {Request, Response, Router} from "express";
import User from "@src/models/User";
import {UserDto} from "@src/dto/user.dto";
import Question from "@src/models/Question";
import {QuestionDto} from "@src/dto/question.dto";
import question from "@src/models/Question";

const controller = Router();

controller.post('/', async (req: Request, res: Response) => {
    const question = new Question(req.body as QuestionDto);

    try {
        await question.save();
        res.send(question);
    } catch (e) {
        res.status(400).send("Не получилось создать вопрос");
    }
});

controller.get('/', async (req: Request, res: Response) => {
    try {
        const result = await Question.find()
        res.send(result);

    } catch (e) {
        res.sendStatus(400).send({message: 'Не получилось получить ответ'});
    }
});

controller.post('/AddMany', async (req: Request, res: Response) => {
    const {questions} = req.body

    try {
        questions.map((element: any) => {
            const question = new Question(element as QuestionDto);
            question.save();
            // res.send(question);
        })
    } catch (e) {
        res.status(400).send("Не получилось создать вопрос");
    }
});


export default controller;