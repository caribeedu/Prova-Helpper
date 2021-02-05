import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import sequelizeService from '../../common/services/sequelize.service';

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
    const request = supertest.agent(app);
    after(done => {
        app.close(() => { sequelizeService.getSequelize().close().finally(done); });
    });

    it('should POST /users', async function () {
        const res = await request
            .post('/users')
            .send(firstUserBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal(`Usuário ${firstUserBody.username} adicionado com sucesso.`);
        firstUserIdTest = res.body.id;
    });

    it('should POST /auth', async function () {
        const res = await request
            .post('/auth')
            .send(authUserBody);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.accessToken).to.be.an('string');
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
    });

    it(`should GET /users/:id`, async function () {
        const res = await request
            .get(`/users/${firstUserIdTest}`)
            .set({'Authorization': `Bearer ${accessToken}`})
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.an('number');
        expect(res.body.id).to.be.equals(firstUserIdTest);
        expect(res.body.email).to.be.equals(firstUserBody.email);
    });

    it(`should GET /users`, async function () {
        const res = await request
            .get(`/users`)
            .set({'Authorization': `Bearer ${accessToken}`})
            .send();
        
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });
    
    it('should PUT /users/:id', async function () {
        const res = await request
            .put(`/users/${firstUserIdTest}`)
            .set({'Authorization': `Bearer ${accessToken}`})
            .send({name});
        expect(res.status).to.equal(204);
    });

    it(`should GET /users/:id to have a new name`, async function () {
        const res = await request
            .get(`/users/${firstUserIdTest}`)
            .set({'Authorization': `Bearer ${accessToken}`})
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.an('number');
        expect(res.body.name).to.be.equals(name);
        expect(res.body.email).to.be.equals(firstUserBody.email);
        expect(res.body.id).to.be.equals(firstUserIdTest);
    });

    it('should DELETE /users/:id', async function () {
        const res = await request
            .delete(`/users/${firstUserIdTest}`)
            .set({'Authorization': `Bearer ${accessToken}`})
            .send();
        expect(res.status).to.equal(204);
    });
})