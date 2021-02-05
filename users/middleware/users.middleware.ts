import express from 'express';
import userService from '../services/users.service';

class UsersMiddleware {
    private static instance: UsersMiddleware;

    static getInstance() {
        if (!UsersMiddleware.instance) {
            UsersMiddleware.instance = new UsersMiddleware();
        }
        return UsersMiddleware.instance;
    }

    async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.email) {
            next();
        } else {
            res.status(400).send({error: 'Campos obrigatórios de email/senha faltando.'});
        }
    }
    
    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.getByEmail(req.body.email);
        if (user) {
            res.status(400).send({error: 'Usuário com este email já existente.'});
        } else {
            next();
        }
    }
    
    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.readById(parseInt(req.params.id));
        if (user) {
            next();
        } else {
            res.status(404).send({error: 'Usuário não encontrado.'});
        }
    }
}

export default UsersMiddleware.getInstance();