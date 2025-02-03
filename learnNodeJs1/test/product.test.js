const chai = require('chai')
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
// then install super test library  (npm i supertest)
// ✅ What is Supertest?
// Supertest is a popular Node.js library used for testing HTTP APIs. It provides an easy way to 
// send requests to your app and assert the responses, making it great for testing RESTful APIs.
// Supertest works seamlessly with Mocha or other testing frameworks.
const request = require('supertest');
const app = require('../6_advanced/app')

describe('GET /audits', function(){
    it('should return an array of audit objects', async function(){
        return await request(app)
           .get('/audits')
           .expect(200)
           .expect((res) => {
               console.log('audits list:'+ JSON.stringify(res.body));
           });
    });
});

//! now to run the test code open terminal and write (npm test)
// will get all audits from database and will see this if your application pass the test :
//✔ should return an array of audit objects (524ms)
//1 passing (569ms)