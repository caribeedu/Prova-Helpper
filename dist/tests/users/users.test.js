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
let firstUserIdTest = '';
let firstUserBody = {
    "email": 'admin@test.com',
    "password": "Sup3rSecret!23"
};
let accessToken = '';
let refreshToken = '';
const name = 'Jose';
describe('Should test basic users endpoints', () => {
    const request = supertest_1.default.agent(app_1.default);
    // after(done => {
    //     app.close(() => { mongoose.connection.close(done); });
    // });
    it('should POST /users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .post('/users')
                .send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body.id).to.be.an('string');
            firstUserIdTest = res.body.id;
        });
    });
    it('should post /auth', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .post('/auth')
                .send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body.accessToken).to.be.an('string');
            accessToken = res.body.accessToken;
            refreshToken = res.body.refreshToken;
        });
    });
    it(`should GET /users/:userId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body._id).to.be.an('string');
            chai_1.expect(res.body._id).to.be.equals(firstUserIdTest);
            chai_1.expect(res.body.email).to.be.equals(firstUserBody.email);
        });
    });
    it(`should GET /users`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(403);
        });
    });
    it.skip('should Patch /users/:userId', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .patch(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send({
                firstName: name
            });
            chai_1.expect(res.status).to.equal(204);
        });
    });
    it.skip(`should GET /users/:userId to have a new name`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body.id).to.be.an('string');
            chai_1.expect(res.body.name).to.be.equals(name);
            chai_1.expect(res.body.email).to.be.equals(firstUserBody.email);
            chai_1.expect(res.body.id).to.be.equals(firstUserIdTest);
        });
    });
    it('should DELETE /users/:userId', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .delete(`/users/${firstUserIdTest}`)
                .set({ 'Authorization': `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(204);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL3VzZXJzL3VzZXJzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsMERBQWtDO0FBQ2xDLCtCQUE0QjtBQUU1QixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUc7SUFDaEIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixVQUFVLEVBQUUsZ0JBQWdCO0NBQy9CLENBQUM7QUFFRixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUVwQixRQUFRLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO0lBQy9DLE1BQU0sT0FBTyxHQUFHLG1CQUFTLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxDQUFDO0lBQ3JDLGtCQUFrQjtJQUNsQiw2REFBNkQ7SUFDN0QsTUFBTTtJQUVOLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTs7WUFDckIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPO2lCQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV6QixhQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDakMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUks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