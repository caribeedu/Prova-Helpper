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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// todo: remove-me
const jwtSecret = 'teste'; //process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;
class AuthController {
    static getInstance() {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshId = req.body.id + jwtSecret;
                const salt = crypto_1.default.randomBytes(16).toString('base64');
                const hash = crypto_1.default.createHmac('sha512', salt).update(refreshId).digest("base64");
                req.body.refreshKey = salt;
                const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, { expiresIn: tokenExpirationInSeconds });
                const refreshToken = Buffer.from(hash).toString('base64');
                return res.status(201).send({ accessToken: token, refreshToken: refreshToken });
            }
            catch (err) {
                return res.status(500).send(err);
            }
        });
    }
}
exports.default = AuthController.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXV0aC9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLGtCQUFrQjtBQUNsQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQSx5QkFBeUI7QUFDbkQsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLENBQUM7QUFFdkMsTUFBTSxjQUFjO0lBR2hCLE1BQU0sQ0FBQyxXQUFXO1FBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdkQsSUFBSTtnQkFDQSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7Z0JBRTFDLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWxGLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFFM0IsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDO2dCQUNuRixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFMUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7YUFDakY7WUFDRCxPQUFPLEdBQUcsRUFBRTtnQkFDUixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMifQ==