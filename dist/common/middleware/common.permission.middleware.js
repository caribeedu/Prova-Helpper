"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CommonPermissionMiddleware {
    constructor() {
        this.FREE_PERMISSION = CommonPermissionMiddleware.FREE_PERMISSION;
        this.ADMIN_PERMISSION = CommonPermissionMiddleware.ADMIN_PERMISSION;
    }
    static getInstance() {
        if (!CommonPermissionMiddleware.instance) {
            CommonPermissionMiddleware.instance = new CommonPermissionMiddleware();
        }
        return CommonPermissionMiddleware.instance;
    }
    onlyAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPermissionLevel = parseInt(req.jwt.permissionLevel);
            if (userPermissionLevel & CommonPermissionMiddleware.ADMIN_PERMISSION) {
                return next();
            }
            else {
                return res.status(403).send({});
            }
        });
    }
    ;
}
CommonPermissionMiddleware.FREE_PERMISSION = 1;
CommonPermissionMiddleware.ADMIN_PERMISSION = 2;
exports.default = CommonPermissionMiddleware.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLDBCQUEwQjtJQUFoQztRQU1JLG9CQUFlLEdBQUcsMEJBQTBCLENBQUMsZUFBZSxDQUFDO1FBQzdELHFCQUFnQixHQUFHLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDO0lBbUJuRSxDQUFDO0lBakJHLE1BQU0sQ0FBQyxXQUFXO1FBQ2QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRTtZQUN0QywwQkFBMEIsQ0FBQyxRQUFRLEdBQUcsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1NBQzFFO1FBQ0QsT0FBTywwQkFBMEIsQ0FBQyxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVLLHdCQUF3QixDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUzs7WUFDeEQsSUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM1RCxJQUFJLG1CQUFtQixHQUFHLDBCQUEwQixDQUFDLGdCQUFnQixFQUFFO2dCQUNuRSxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2pCO2lCQUNJO2dCQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkM7UUFDTCxDQUFDO0tBQUE7SUFBQSxDQUFDOztBQXRCSywwQ0FBZSxHQUFHLENBQUMsQ0FBQztBQUNwQiwyQ0FBZ0IsR0FBRyxDQUFDLENBQUM7QUF5QmhDLGtCQUFlLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDIn0=