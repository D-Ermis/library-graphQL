"use strict";

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _schemas = _interopRequireDefault(require("./schemas"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _userModel = _interopRequireDefault(require("./models/userModel"));

var _bookModel = _interopRequireDefault(require("./models/bookModel"));

var _commentModel = _interopRequireDefault(require("./models/commentModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());

const getUser = async req => {
  const token = req.headers['token'];

  if (token) {
    try {
      return await _jsonwebtoken.default.verify(token, 'riddlemethis');
    } catch (e) {
      throw new _apolloServerExpress.AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schemas.default,
  resolvers: _resolvers.default,
  context: async ({
    req
  }) => {
    if (req) {
      const me = await getUser(req);
      return {
        me,
        models: {
          userModel: _userModel.default,
          bookModel: _bookModel.default,
          commentModel: _commentModel.default
        }
      };
    }
  }
});
server.applyMiddleware({
  app,
  path: '/graphql'
});

_mongoose.default.set('useUnifiedTopology', true);

_mongoose.default.set('useNewUrlParser', true);

_mongoose.default.set('useCreateIndex', true);

app.listen(5000, () => {
  _mongoose.default.connect('mongodb+srv://dev:dev@trouvkash-3px3t.mongodb.net/library');
});