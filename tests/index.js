const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe("IP Location", () => {
  describe("GET /", () => {
    it("should get ip address", (done) => {
      chai.request(app)
        .get('/check-ip')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should not get ip address", (done) => {
      const id = 10;
      chai.request(app)
        .get(`/error/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});