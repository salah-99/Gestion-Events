const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

con.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database is Connected');
}); 

const siteTitle = 'Gestion Event'
const baseURL = 'http://localhost:3000/'

// Get the event list 
app.get('/',(req, res) => {
    let sql = "SELECT * FROM e_events";
    let query = con.query(sql, (err, result) => {
        if(err) throw err;
        res.render('index', {
            siteTitle : siteTitle,
            pageTitle : 'Event list',
            items : result
        });
    });
});

// ADD new event

app.get('/event/add',(req, res) => {
    res.render('add-event', {
        siteTitle : siteTitle,
        pageTitle : 'Add new event',
        items : ''
    });
});
   
app.post('/event/add',(req, res) => { 
    let data = {e_name: req.body.e_name, e_start_date: req.body.e_start_date, e_end_date: req.body.e_end_date, e_desc: req.body.e_desc, e_location: req.body.e_location};
    let sql = "INSERT INTO e_events SET ?";
    let query = con.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect(baseURL);
    });
});


// update some data

app.get('/event/edit/:id',(req, res) => {

    const authorId = req.params.id;
    let sql = `Select * from e_events where e_id = ${authorId}`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit-event', {
            siteTitle : siteTitle,
            pageTitle : "Editing Event : " + result[0].e_name,
            item : result
        });
    });
});

app.post('/event/edit/:id',(req, res) => {
  
    let userId = req.body.e_id
      let sql = "update e_events SET e_name='"+req.body.e_name+"', e_start_date='"+req.body.e_start_date+"', e_end_date= '"+req.body.e_end_date+"', e_desc='"+req.body.e_desc+"', e_location='"+req.body.e_location+"' where e_id ="+userId;
      let query = con.query(sql,(err, results) => {
        if(err) throw err;
        res.redirect(baseURL);
      });
  });


//  Delete some data
app.get('/event/delete/:id', (req, res) => {
    const userId = req.params.id;
    let sql = `DELETE from e_events where e_id = ${userId}`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect(baseURL);
    });
});

app.listen(3000,function(){
    console.log('Server is running at port 3000')
})