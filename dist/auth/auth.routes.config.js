"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const jwt_middleware_1 = __importDefault(require("./middleware/jwt.middleware"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
    }
    configureRoutes() {
        this.app.post(`/auth`, [
            auth_middleware_1.default.validateBodyRequest,
            auth_middleware_1.default.verifyUserPassword,
            auth_controller_1.default.createJWT
        ]);
        this.app.post(`/auth/refresh-token`, [
            jwt_middleware_1.default.validJWTNeeded,
            jwt_middleware_1.default.verifyRefreshBodyField,
            jwt_middleware_1.default.validRefreshNeeded,
            auth_controller_1.default.createJWT
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXV0aC9hdXRoLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQWtFO0FBQ2xFLG9GQUEyRDtBQUMzRCxpRkFBd0Q7QUFDeEQsbUZBQTBEO0FBRzFELE1BQWEsVUFBVyxTQUFRLHlDQUFrQjtJQUM5QyxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIseUJBQWMsQ0FBQyxtQkFBbUI7WUFDbEMseUJBQWMsQ0FBQyxrQkFBa0I7WUFDakMseUJBQWMsQ0FBQyxTQUFTO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ2pDLHdCQUFhLENBQUMsY0FBYztZQUM1Qix3QkFBYSxDQUFDLHNCQUFzQjtZQUNwQyx3QkFBYSxDQUFDLGtCQUFrQjtZQUNoQyx5QkFBYyxDQUFDLFNBQVM7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQW5CRCxnQ0FtQkMifQ==