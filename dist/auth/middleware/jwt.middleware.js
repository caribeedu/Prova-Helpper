"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// todo: remove-me
const jwtSecret = 'teste'; //process.env.JWT_SECRET;
class JwtMiddleware {
    static getInstance() {
        if (!JwtMiddleware.instance) {
            JwtMiddleware.instance = new JwtMiddleware();
        }
        return JwtMiddleware.instance;
    }
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res.status(400).send({ error: 'need body field: refreshToken' });
        }
    }
    ;
    validRefreshNeeded(req, res, next) {
        let refreshToken = Buffer.from(req.body.refreshToken, 'base64').toString();
        let hash = crypto_1.default.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + jwtSecret).digest("base64");
        if (hash === refreshToken) {
            delete req.jwt.iat;
            delete req.jwt.exp;
            req.body = req.jwt;
            return next();
        }
        else {
            return res.status(400).send({ error: 'Invalid refresh token' });
        }
    }
    ;
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                else {
                    req.jwt = jsonwebtoken_1.default.verify(authorization[1], jwtSecret);
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
    }
    ;
}
exports.default = JwtMiddleware.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hdXRoL21pZGRsZXdhcmUvand0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLGtCQUFrQjtBQUNsQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQSx5QkFBeUI7QUFFbkQsTUFBTSxhQUFhO0lBR2YsTUFBTSxDQUFDLFdBQVc7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUN6QixhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7U0FDaEQ7UUFDRCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVELHNCQUFzQixDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtRQUMxRixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkMsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSwrQkFBK0IsRUFBQyxDQUFDLENBQUM7U0FDekU7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLGtCQUFrQixDQUFDLEdBQVEsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQzFFLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0UsSUFBSSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRyxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDdkIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNuQixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNuQixPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLHVCQUF1QixFQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUYsY0FBYyxDQUFDLEdBQVEsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQ3RFLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM5QixJQUFJO2dCQUNBLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDakM7cUJBQU07b0JBQ0gsR0FBRyxDQUFDLEdBQUcsR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ2xELElBQUksRUFBRSxDQUFDO2lCQUNWO2FBRUo7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakM7U0FDSjthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDO0lBRUwsQ0FBQztJQUFBLENBQUM7Q0FDTDtBQUVELGtCQUFlLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyJ9