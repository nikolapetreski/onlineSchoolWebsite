const express = require('express');
const morgan = require('morgan');



const app = express();

const dbURI = 'mongodb+srv://ninj:test1234@cluster0.schqpii.mongodb.net/?retryWrites=true&w=majority'
app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    
    res.render('index', {title: 'Home', blogs});
})

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
    })