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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const sequelize_service_1 = __importDefault(require("../../common/services/sequelize.service"));
let firstUserIdTest = '';
let firstUserBody = {
    "email": "admin@test.com",
    "permission_level": "2",
    "password": "m1t3stp4ssw0rd",
    "username": "admin",
    "name": "Administrator"
};
let authUserBody = {
    "email": "admin@test.com",
    "password": "m1t3stp4ssw0rd",
};
let accessToken = '';
let refreshToken = '';
const name = 'Henrique';
describe('Should test basic users endpoints', () => {
    const request = supertest_1.default.agent(app_1.default);
    beforeEach(function (done) {
        this.timeout(3000);
        setTimeout(done, 1500);
    });
    after(done => {
        app_1.default.close(() => { sequelize_service_1.default.getSequelize().close().finally(done); });
    });
    it('should POST /users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .post('/users')
                .send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.message).to.equal(`Usuário ${firstUserBody.username} adicionado com sucesso.`);
            firstUserIdTest = res.body.id;
        });
    });
    it('should POST /auth', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .post('/auth')
                .send(authUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.accessToken).to.be.an('string');
            accessToken = res.body.accessToken;
            refreshToken = res.body.refreshToken;
        });
    });
    it(`should GET /users/:id`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.id).to.be.an('number');
            chai_1.expect(res.body.id).to.be.equals(firstUserIdTest);
            chai_1.expect(res.body.email).to.be.equals(firstUserBody.email);
        });
    });
    it(`should GET /users`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).to.be.an("array");
        });
    });
    it('should PUT /users/:id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .put(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send({ name });
            chai_1.expect(res.status).to.equal(204);
        });
    });
    it(`should GET /users/:id to have a new name`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.id).to.be.an('number');
            chai_1.expect(res.body.name).to.be.equals(name);
            chai_1.expect(res.body.email).to.be.equals(firstUserBody.email);
            chai_1.expect(res.body.id).to.be.equals(firstUserIdTest);
        });
    });
    it('should DELETE /users/:id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .delete(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(204);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL3VzZXJzL3VzZXJzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsMERBQWtDO0FBQ2xDLCtCQUE4QjtBQUM5QixnR0FBdUU7QUFFdkUsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHO0lBQ2hCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsa0JBQWtCLEVBQUUsR0FBRztJQUN2QixVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCLFVBQVUsRUFBRSxPQUFPO0lBQ25CLE1BQU0sRUFBRSxlQUFlO0NBQzFCLENBQUM7QUFDRixJQUFJLFlBQVksR0FBRztJQUNmLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsVUFBVSxFQUFFLGdCQUFnQjtDQUMvQixDQUFDO0FBRUYsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLElBQUksR0FBRyxVQUFVLENBQUM7QUFFeEIsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxNQUFNLE9BQU8sR0FBRyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUMsQ0FBQztJQUVyQyxVQUFVLENBQUMsVUFBUyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNULGFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsMkJBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FB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