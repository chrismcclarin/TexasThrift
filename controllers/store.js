const express = require('express');
const storeRouter = express.Router();
const Store = require('../models/product');
const Seed = require('../models/seed.js');
const auth = require('../middleware/auth');

// Seed
storeRouter.get('/seed', (req, res) => {
    Store.deleteMany({}, (error, store) => {});

    Store.create(Seed, (error, data) => {
        res.redirect('/');
    });
});

//Homepage
storeRouter.get("/", (req, res) => {
    Store.find({}, (err, store) => {
        res.render("home", {
            store
        })
    })
})

// Admin
storeRouter.get("/admin", auth.isAuthenticated, (req, res) => {
    if(!req.user.isAdmin) return res.redirect('/home');
    Store.find({}, (err, store) => {
        res.render("admin", {
            store
        })
    })
})

// Index
storeRouter.get("/browse", (req, res) => {
    Store.find({}, (err, store) => {
        res.render("index", {
            store
        })
    })
})

// New
storeRouter.get('/new', (req, res) => {
    res.render('new');
})

// Delete
storeRouter.delete("/:id", (req, res) => {
    Store.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/browse")
    })
})

// Update
storeRouter.put("/:id", (req, res) => {
    Store.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        },
        (error, store) => {
            res.redirect(`/${req.params.id}`)
        }
)})

// Create
storeRouter.post("/", (req, res) => {
    Store.create(req.body, (err, store) => {
        res.redirect('/')
    })
})

// Edit
storeRouter.get("/:id/edit", (req, res) => {
    Store.findById(req.params.id, (error, store) => {
        res.render("edit", {
            store
        })
    })
})

// Show
storeRouter.get("/:id", (req, res) => {
    Store.findById(req.params.id, (err, store) => {
        res.render('show', {
            store
        })
    })
})

module.exports = storeRouter