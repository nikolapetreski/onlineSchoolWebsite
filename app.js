const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Class = require('./models/Class');
const app = express();

const dbURI = 'mongodb+srv://ninj:dq3beK7QGFxCEcMu@cluster0.schqpii.mongodb.net/finalP?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(4001))  
.catch((err) => console.log(err));

app.set('view engine', 'ejs'); 



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    
    res.render('index');
})


    
app.get('/schedule', (req, res) => {
    
    res.render('schedule');
})

app.get('/mySchedule', (req, res) => {
    
    res.render('/classes', { title: 'My Schedule' });
})


app.get('/classes/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

app.get('/classes', (req, res) => {
Class.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('mySchedule', { title: 'All Classes', classes: result })
    })
    .catch((err) => {
        console.log(err);
    });
})

app.post('/classes', (req, res) => {
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

app.get('/classes/:id', (req, res) => {
    const id = req.params.id;
    Class.findById(id)
        .then(result => {
            res.render('details', { newClass: result, title: 'Class Details' })
            })
            .catch(err => {
                console.log(err);
            })

})

app.delete('/classes/:id', (req, res) => {
    const id = req.params.id;

    Class.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/classes' });
        })
        .catch(err => {
            console.log(err);
        })
})
// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
/*
    app.get('/about', (req, res) => {
        res.render('about', {title: 'About'});
    })


    app.get('blogs/create', (req, res) => {
res.render('create', {title: 'Create a new blog'});
    })

    app.get('blogs/create', (req, res) => {
        res.render('create', {title: 'Create a new blog'});
            })

            app.get('blogs/create', (req, res) => {
                res.render('create', {title: 'Create a new blog'});
                    })
                
    
    app.use((req, res) => {
        res.status(404).render('404', {title: '404'});
    }) */ 