var common = require('../common');
var assert = common.assert;
var chai = common.chai;
var should = common.should;
var server = common.server;

function createContact() {
    describe("POST on /contact", function () {
        var contacts = [{
            "name": "Abhishek Bhave",
            "description": "World Is Best",
            "email": "abhave@buffalo.edu"
        }, {
            "name": "John Larry",
            "description": "Node JS",
            "email": "john@gmail.com"
        }]
        it("Should add Contacts in DB", (done) => {
            for (contact in contacts) {
                chai.request(server)
                    .post("/contact/")
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
    describe("POST on /contact", function () {
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
                    .post("/contact/")
                    .send(contacts[contact])
                    .end((err, res) => {
                        res.should.have.status(400);
                    })
            }
            done()
        })
    })
};

module.exports = {
    createContact,
    createContactWithValidationError
};