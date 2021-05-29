var common = require("./common");
var server = common.server;

//clear db before all tests
let Contact = require('../models/contact.model');
Contact.collection.drop();

// run contacts test
const test_contacts = require('./test-contacts/test-contacts');
//test_contacts.test();


//clear db before all tests
let User = require('../models/user.model');
User.collection.drop();

// run users test
const test_users = require('./test-users/test-users');
test_users.test();

server.close();