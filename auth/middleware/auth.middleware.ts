import express from 'express';
import usersService from '../../users/services/users.service';
import * as argon2 from 'argon2';

class AuthMiddleware {
    private static instance: AuthMiddleware;

    static getInstance() {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    async validateBodyRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({error: 'Campos obrigatórios de email/senha faltando.'});
        }
    }

    async verifyUserPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await usersService.getByEmail(req.body.email);
        if (user) {
            let passwordHash = user.password;
            if (await argon2.verify(passwordHash, req.body.password)) {
                req.body = {
                    userId: user.id,
                    email: user.email,
                    provider: 'email',
                    permissionLevel: user.permission_level,
                };
                return next();
            } else {
                res.status(400).send({error: 'Email e/ou senha inválido(s)'});
            }
        }
        else {
            res.status(400).send({error: 'Email e/ou senha inválido(s)'});
        }
    }
}

export default AuthMiddleware.getInstance();