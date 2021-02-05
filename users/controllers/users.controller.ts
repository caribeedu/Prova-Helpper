import express from 'express';
import usersService from '../services/users.service';
import argon2 from 'argon2';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:users-controller');

class UsersController {
    private static instance: UsersController;

    static getInstance(): UsersController {
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }

    async listUsers(_: express.Request, res: express.Response) {
        const users = await usersService.list();
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await usersService.readById(parseInt(req.params.id));

        if(!user)
            res.status(404).send('Usuário não encontrado.');

        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        try {
            req.body.password = await argon2.hash(req.body.password);
            await usersService.create(req.body);
            res.status(201).send(`Usuário ${req.body.username} adicionado com sucesso.`);
        }
        catch (err) {
            debugLog(err);
            res.status(500).send();
        }
    }

    async put(req: express.Request, res: express.Response) {
        try {
            req.body.password = await argon2.hash(req.body.password);
            await usersService.updateById({id: parseInt(req.params.id), ...req.body});
            res.status(204).send(``);
        }
        catch (err) {
            debugLog(err);
            res.status(500).send();
        }
    }

    async removeUser(req: express.Request, res: express.Response) {
        try {
            await usersService.deleteById(parseInt(req.params.id));
            res.status(204).send(``);
        }
        catch (err) {
            debugLog(err);
            res.status(500).send();
        }
    }
}

export default UsersController.getInstance();