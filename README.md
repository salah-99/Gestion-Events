
--------------------------------------------------------------------------
|                            nodejs express and ejs CRUD with maysql         |
------------- -------------------------------------------------------------
Creat Application Gestion Events

Firstable go Ampps open server then go to phpmyadmin create database (mydb) then create table (e_events) with 6 columns e_id auto_increment e_name 
e_start_date e_end_date e_desc e_location then follow bellow steps:



Step 1 : open new folder then install  npm init 
			 
		
Step 2 : Install Requred packages using NPM like this ===> 
			==> npm install  express mysql body-parser ejs --save
			
		
Step 3 : Add follwoing code in app.js
		
			const path = require('path');
			const express = require('express');
			const ejs = require('ejs');
			const bodyParser = require('body-parser');
			const mysql = require('mysql');
			const app = express();

			// Server Listening
			app.listen(3000, () => {
				console.log('Server is running at port 3000');
			});
			
		
		
Step 4 : Create Database Connection 
			const mysql=require('mysql');
			
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

Setp 5 : Define view engin with ejs / bodyParser

			app.set('view engine', 'ejs');
			app.use(bodyParser.urlencoded({extended: true}))

Setp 6 : Define index path with '/' and ejs file
			
			//route for user index page
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

Setp 7 : Run a server and check with Browser
			node app

			http://localhost:3000/
			
Step 8 : Get value from database and show in ejs template