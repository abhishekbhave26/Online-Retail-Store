var common = require("./common");
var server = common.server;

const test_contacts = require('./test-contacts/test-contacts');
test_contacts.createContact();
test_contacts.createContactWithValidationError();


server.close();