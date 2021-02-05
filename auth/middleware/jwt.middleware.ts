import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// todo: remove-me
const jwtSecret = 'M1S3CR3T';//process.env.JWT_SECRET;

class JwtMiddleware {
    private static instance: JwtMiddleware;

    static getInstance() {
        if (!JwtMiddleware.instance) {
            JwtMiddleware.instance = new JwtMiddleware();
        }
        return JwtMiddleware.instance;
    }

    verifyRefreshBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res.status(400).send({error: 'Token de validação em falta.'});
        }
    };

    validRefreshNeeded(req: any, res: express.Response, next: express.NextFunction) {
        const refreshToken = Buffer.from(req.body.refreshToken, 'base64').toString();
        const hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + jwtSecret).digest("base64");
        if (hash === refreshToken) {
            req.body = req.jwt;
            return next();
        }
        else {
            return res.status(400).send({error: 'Token inválido.'});
        }
    };

    validJWTNeeded(req: any, res: express.Response, next: express.NextFunction) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    req.jwt = jwt.verify(authorization[1], jwtSecret);
                    next();
                }
            }
            catch (err) {
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    };
}

export default JwtMiddleware.getInstance();