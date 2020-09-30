var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe ("CRUD OPERATIONS", function(){

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
                    console.log("Response Body:", res.body);
                    
                })
        }
        done()
    })
//...     
})

server.close();