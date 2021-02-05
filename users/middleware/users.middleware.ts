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
            res.status(400).send({error: `Missing required fields: email and/or password`});
        }
    }
    
    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.getByEmail(req.body.email);
        if (user) {
            res.status(400).send({error: `User email already exists`});
        } else {
            next();
        }
    }
    
    async validateSameEmailBelongToSameUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.getByEmail(req.body.email);
        if (user && user.id === req.body.id) {
            next();
        } else {
            res.status(400).send({error: `Invalid email`});
        }
    }
    
    async validatePatchEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body.email) {
            UsersMiddleware.getInstance().validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    }
    
    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.readById(req.body.id);
        if (user) {
            next();
        } else {
            res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    }
}

export default UsersMiddleware.getInstance();