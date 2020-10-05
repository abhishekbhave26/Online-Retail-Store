var common = require('../common');
var assert = common.assert;
var chai = common.chai;
var should = common.should;
var server = common.server;


var users = [{
    "name": "Abhishek Bhave",
    "password": "abhishek1234",
    "email": "abhave@buffalo.edu"
}, {
    "name": "John Larry",
    "password": "nodeLarry2000",
    "email": "abhave@buffalo.edu"
}]

async function createUser(user) {
    await chai.request(server)
        .post("/users/add")
        .send(users[user])
        .catch()
  }

function createUserTest() {
    describe("POST on /users/add", function () {
        it("Should add Users in DB", () => {
            for (user in users) {
                const res = createUser(user)
                //assert(res.body == "User added!")
                //assert(res.status = 200);
            }
        })
    })
};

function createUserWithValidationError() {
    describe("POST on /users/add", function () {
        var users = [{
            "name": "Abhishek Bhave",
            "password": "abhishek1234"
        }, {
            "description": "Node JS",
            "email": "abhishekbhave26@gmail.com"
        }, {
            "description": "Node JS"
        }, {
        
        }]
        it("Should give validation error", (done) => {
            for (user in users) {
                chai.request(server)
                    .post("/users/add")
                    .send(users[user])
                    .end((err, res) => {
                        res.should.have.status(400);
                        assert(res.body == "Error");
                    })
            }
            done()
        })
    })
};


function getAllUsers() {
    describe("GET on /users", function () {
        it("Should get all Users in DB", (done) => {
            chai.request(server)
                .get("/users/")
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    assert(res.body.length == 2); 
                })
            done()
        })
    })
};

function getAllUsersEmptyResponse() {
    describe("GET on /users", function () {
        it("Should return empty response", (done) => {
            chai.request(server)
                .get("/users/")
                .end((err, res) => {
                    res.should.have.status(200);
                    assert(res.body.length == 0);
                })
            done()
        })
    })
};

function test() {
    getAllUsersEmptyResponse();
    createUserTest();
    //createUserWithValidationError();
    //getAllUsers();

};

module.exports = {
    test
};
