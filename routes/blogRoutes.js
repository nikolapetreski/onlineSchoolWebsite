const express = require('express');
const Class = require('../models/Class');
const router = express.Router();

router.get('/classes/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

router.get('/classes', (req, res) => {
Class.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('mySchedule', { title: 'All Classes', classes: result })
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post('/classes', (req, res) => {
    const newClass = new Class(req.body);

    newClass.save()
        .then((result) => {
            res.redirect('/classes');
        }
        )
        .catch((err) => {
            console.log(err);
        }
        );
})

router.get('/classes/:id', (req, res) => {
    const id = req.params.id;
    Class.findById(id)
        .then(result => {
            res.render('details', { newClass: result, title: 'Class Details' })
            })
            .catch(err => {
                console.log(err);
            })

})

router.delete('/classes/:id', (req, res) => {
    const id = req.params.id;

    Class.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/classes' });
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;