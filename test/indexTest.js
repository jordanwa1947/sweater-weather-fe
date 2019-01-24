var expect = require('chai').expect;
const nock = require('nock');
pry = require('pryjs')

var forecastRequest = require('../src/index.js').forecastRequest
var response = require('./response.js')

describe('forecastRequest()', function (done) {
  beforeEach(() => {
   nock('https://sweater-weather-micro.herokuapp.com/api/v1')
     .get('/forecast?location=Denver, CO')
     .reply(200, response);
   });

  it ('gets forecast by location', function () {
    return forecastRequest('Denver, CO')
      .then(response => {
        var json = response.data.attributes;
        expect(typeof response).to.equal('object');
        expect(json.days.length).to.equal(8);
        expect(json.hours.length).to.equal(49);
      }).then(done, done);
  });
});
