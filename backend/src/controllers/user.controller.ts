import {Request, Response, Router} from "express";
import User from "@src/models/User";
import {UserDto} from "@src/dto/user.dto";

const controller = Router();

controller.post('/', async (req: Request, res: Response) => {
    const user = new User(req.body as UserDto);



    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send("Не получилось создать ответы от пользователя");
    }
});

controller.get('/', async (req: Request, res: Response) => {
    try {
        const result = await User.find()
        res.send(result);

    } catch (e) {
        res.sendStatus(400).send({message: 'Не получилось получить ответ'});
    }
});

export default controller;