const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');

// Services
const authentication = require('../services/authentication');

/**
 * Sign in with Google
 * /api/user/google/signin
 */
 router.post('/google/signin', (req, res) => {
  try {
    const redirectUrl = authentication.signin(res);
    res.redirect(301, redirectUrl);
  }
  catch(err) {
    res.sendStatus(400);
  }
});

/**
 * Google Oauth 2 redirect
 * /api/user/google/redirect
 */
 router.get('/google/redirect', async (req, res) => {
  try {
    const authCode = req.query.code;
    const userEmail = await authentication.getAccessToken(authCode);

    // Set authorization cookie
    res.cookie("access_token", userEmail, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
    });
    
    res.sendStatus(200);
  }
  catch(err) {
    res.sendStatus(400);
  }
});

module.exports = router;