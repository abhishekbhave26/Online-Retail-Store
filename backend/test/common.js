var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);


exports.chai = chai;
exports.assert = assert;
exports.should = should;
exports.server = server;