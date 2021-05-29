const router = require('express').Router();
const axios = require('axios');
const queryString = require('query-string');
const jwt = require('jwt-simple');

let User = require('../models/user.model');
let token = null;

router.route('/traditional').post((req, res) => {
    User.findOne({ user_email: req.body.user_email })
        .then(user => {
            if (req.body.user_password === user.user_password) {
                var expires = new Date();
                expires.setHours(expires.getHours() + 24);
                var token = jwt.encode({ user_email: user.user_email, exp: expires }, process.env.JWT_SECRET_STRING);
                res.json({
                    token: token,
                    header: 'SUCCESS'
                })
            }
            else {
                res.json('Wrong password')
            }
        })
        .catch(err => res.status(400).json('Error ' + err));

});

router.route('/token/:token').get((req, res) => {
    token = req.params.token;
    if (token) {
        try {
            var decoded = jwt.decode(token, process.env.JWT_SECRET_STRING);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
            User.findOne({ user_email: decoded.user_email }, function (err, user) {
                res.json({
                    user: user.toJSON(),
                    header: 'TOKEN VALID'
                })
            });
        } catch (err) {
            res.send('BAD TOKEN');
        }
    } else {
        res.send('BAD TOKEN');
    }
});

router.route('/github').get((req, res) => {
    getGithubAccessTokenFromCode(req.query.code).
        then(token => {
            if (token != null) {
                getGitHubUserData(token).
                    then(data => {
                        res.send(data);
                    });
            }
            else {
                res.send('Not authenticated through github, Please try again');
            }
        });
});

router.route('/facebook').get((req, res) => {
    getFacebookAccessTokenFromCode(req.query.code).
        then(token => {
            console.log(token)
            if (token != null) {
                getFacebookUserData(token).
                    then(data => {
                        res.send(data);
                    });
            }
            else {
                res.send('Not authenticated through facebook, Please try again');
            }
        });
});

async function getGithubAccessTokenFromCode(code) {
    let token = null;
    const params = {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
        code: code
    }
    await axios.post('https://github.com/login/oauth/access_token', params)
        .then(
            res => {
                parsedData = queryString.parse(res.data);
                token = parsedData.access_token;
            }
        );
    return token;
};

async function getGitHubUserData(access_token) {
    const { data } = await axios({
        url: 'https://api.github.com/user',
        method: 'get',
        headers: {
            Authorization: `token ${access_token}`,
        },
    });
    console.log(data); // { id, user_email, name, login, avatar_url }
    return data;
};

async function getFacebookAccessTokenFromCode(code) {
    let token = null;
    const params = {
        client_id: process.env.REACT_APP_FACEBOOK_ID,
        client_secret: process.env.REACT_APP_FACEBOOK_SECRET,
        code: code,
        redirect_uri: 'http://localhost:5000/authenticate/facebook'
    }
    await axios.post('https://graph.facebook.com/v4.0/oauth/access_token', params)
        .then(
            res => {
                parsedData = queryString.parse(res.data);
                token = parsedData.access_token;
            }
        );
    return token;
};

async function getFacebookUserData(access_token) {
    const { data } = await axios({
        url: 'https://api.github.com/user',
        method: 'get',
        headers: {
            Authorization: `token ${access_token}`,
        },
    });
    console.log(data); // { id, user_email, name, login, avatar_url }
    return data;
};


module.exports = router;