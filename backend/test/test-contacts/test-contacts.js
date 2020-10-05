var common = require('../common');
var assert = common.assert;
var chai = common.chai;
var should = common.should;
var server = common.server;


var contacts = [{
    "name": "Abhishek Bhave",
    "description": "World Is Best",
    "email": "abhave@buffalo.edu"
}, {
    "name": "John Larry",
    "description": "Node JS",
    "email": "john123@gmail.com"
}]

function createContact() {
    describe("POST on /contact/add", function () {
        it("Should add Contacts in DB", (done) => {
            for (contact in contacts) {
                chai.request(server)
                    .post("/contact/add")
                    .send(contacts[contact])
                    .end((err, res) => {
                        res.should.have.status(200);
                        assert(res.body == "Thank you for your details, our team members will reach out to you");
                    })
            }
            done()
        })
    })
};

function createContactWithValidationError() {
    describe("POST on /contact/add", function () {
        var contacts = [{
            "name": "Abhishek Bhave",
            "description": "World Is Best"
        }, {
            "description": "Node JS",
            "email": "john@gmail.com"
        }, {
            "description": "Node JS"
        }, {
        
        }]
        it("Should not add Contacts in DB", (done) => {
            for (contact in contacts) {
                chai.request(server)
                    .post("/contact/add")
                    .send(contacts[contact])
                    .end((err, res) => {
                        res.should.have.status(400);
                    })
            }
            done()
        })
    })
};

function getAllContacts() {
    describe("GET on /contact", function () {
        it("Should get all Contacts in DB", (done) => {
            chai.request(server)
                .get("/contact/")
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body);
                    assert(res.body.length == 2);
                })
            done()
        })
    })
};


function test() {
    createContact();
    getAllContacts();
    createContactWithValidationError();
};

module.exports = {
    test
};