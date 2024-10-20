// reactions.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../library'); // Adjust the path based on your plugin structure
const db = require.main.require('./src/database');
const user = require.main.require('./src/user');

chai.use(chaiHttp);
const { expect } = chai;

describe('Emoji Reactions API', () => {
  let server;
  let authenticateStub;

  before((done) => {
    // Initialize the plugin or start the server if needed
    server = app.init(); // Adjust based on your plugin's initialization
    done();
  });

  beforeEach(() => {
    // Stub authentication middleware to simulate a logged-in user
    authenticateStub = sinon.stub(user, 'isAdmin').returns(true);
  });

  afterEach(() => {
    // Restore the stubbed methods
    authenticateStub.restore();
  });

  describe('POST /api/post/:postId/reaction', () => {
    it('should add a reaction successfully', (done) => {
      const postId = '3';
      const reaction = '👍';
      const userId = 1;

      // Stub the database method to simulate adding a reaction
      const setAddStub = sinon.stub(db, 'setAdd').resolves();

      chai.request(server)
        .post(`/api/post/${postId}/reaction`)
        .send({ reaction })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(setAddStub.calledOnce).to.be.true;
          setAddStub.restore();
          done();
        });
    });
  });

    it('should return 400 for invalid reaction', (done) => {
      const postId = '3';
      const reaction = 'invalid';

      chai.request(server)
        .post(`/api/post/${postId}/reaction`)
        .send({ reaction })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Invalid reaction.');
          done();
        });
    });

    it('should return 403 if user is not authenticated', (done) => {
      // Modify the authentication stub to simulate an unauthenticated user
      authenticateStub.returns(false);

      const postId = '3';
      const reaction = '👍';

      chai.request(server)
        .post(`/api/post/${postId}/reaction`)
        .send({ reaction })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error', 'You must be logged in to react.');
          done();
        });
    });

    it('should handle server errors gracefully', (done) => {
      const postId = '3';
      const reaction = '👍';

      // Stub the database method to simulate a server error
      const setAddStub = sinon.stub(db, 'setAdd').rejects(new Error('Database Error'));

      chai.request(server)
        .post(`/api/post/${postId}/reaction`)
        .send({ reaction })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error', 'Database Error');
          setAddStub.restore();
          done();
        });
    });

});