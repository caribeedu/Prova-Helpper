import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import JWTMiddleware from '../auth/middleware/jwt.middleware';
import CommonPermissionMiddleware from '../common/middleware/common.permission.middleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        this.app.route(`/users`)
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser);

        this.app.route(`/users/:id`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(
                JWTMiddleware.validJWTNeeded,
                CommonPermissionMiddleware.onlyAdminCanDoThisAction,
                UsersController.removeUser);

        this.app.put(`/users/:id`,[
            UsersMiddleware.validateRequiredUserBodyFields,
            CommonPermissionMiddleware.onlyAdminCanDoThisAction,
            UsersController.put
        ]);

        return this.app;
    }
}