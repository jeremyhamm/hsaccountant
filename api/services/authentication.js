const { google } = require('googleapis');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

/**
 * Get Oauth 2 Google client
 * @returns {google.auth.OAuth2}
 */
const getOauthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
};

/**
 * Decode user details
 * @param {string} token
 * @return {JSON}
 */
const decodeUser = (token) => {
  const tokenPayload = token.split('.')[1];
  return JSON.parse(atob(tokenPayload));
}

/**
 * Find and create user
 * @param {object} details
 * @return {string}
 */
const configureUser = async (details) => {
  
  // Find user
  let user = await userModel.findUser({
    'column': 'email',
    'value': details.email
  });

  // Create new user if not found
  if (!user.length) {
    user = await userModel.createUser([
      details.email,
      details.given_name,
      details.family_name,
      details.picture
    ]);
  };

  return user[0].email;
};

/**
 * Once authorized assign token as cookie
 * @param {string} accessToken
 */
const createToken = (user) => {
  return jwt.sign(
    { user: user },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

}

/**
 * Sign in with Google Oauth
 * @return {string}
 */
const signin = () => {
  const oauth2Client = getOauthClient();
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes
  });
};

/**
 * Get access token from authorization code
 * @param {string} code
 * @return {string}
 */
const getAccessToken = async (code) => {
  const oauth2Client = getOauthClient();
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Confiugure user
  const decodedUser = decodeUser(tokens.id_token);
  const user = await configureUser(decodedUser);

  // Assign access token
  return createToken(user);
}

module.exports = {
  decodeUser,
  signin,
  getAccessToken
}