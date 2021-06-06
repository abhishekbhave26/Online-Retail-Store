var common = require("./common");
var server = common.server;

//clear db before all tests
//let Help = require('../models/help.model');
//Help.collection.drop();

// run helps test
//const test_helps = require('./test-helps/test-helps');
//test_helps.test();


//clear db before all tests
let User = require('../models/user.model');
User.collection.drop();

// run users test
const test_users = require('./test-users/test-users');
test_users.test();

server.close();