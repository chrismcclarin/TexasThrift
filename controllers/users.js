const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user')
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

// Login Routes
usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {error: ''});
});

usersRouter.post('/login', (req, res) => {
    User.findOne({email:req.body.email}, (err,user) => {
        if (!user) return res.render('login', {error: 'Invalid Credentials'});
        const isMatched = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatched) return res.render('login', {error: 'Invalid Credentials'});
        req.session.user = user._id;
        res.redirect('/');
    })
})

// Sign up Routes
usersRouter.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

usersRouter.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create(req.body, (err, user) => {
        res.redirect('/login');
    })
})

// Logout Routes
usersRouter.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    });
});

module.exports = usersRouter;