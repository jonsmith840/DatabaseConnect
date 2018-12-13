#!/usr/bin/env nodejs
var http = require('http');
var url = require('url');
var fs = require('fs');
//var sql = require("mssql");


    http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var Connection = require('tedious').Connection;  
    var OutputText = "Initial var.";
    var JSONarray = 0;

    var config = {  
        userName: 'cm97@uobe7kufo3',  
        password: 'Azur3Pswd',  
        server: 'uobe7kufo3.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'Teledata', rowCollectionOnRequestCompletion: true}  
    };  
    
    var result = "";
res.write('<html>');
res.write('<body>');
res.write(OutputText);
   
    var connection = new Connection(config);  

    connection.on('connect', function(err) {
    		//res.write("Before testing for error with the connection");
    		if (err){
    			console.log(err);
    		} else {
    			executeStatement();
    		}
    // If no error, then good to proceed.  
        //result += "Connected"; 
        //OutputText = err;
        /*executeStatement(sqlResult, function(){
        		OutputText = sqlResult;
        }); */
    
    });
    connection.on('debug', function(err) {
    		console.log(err);
    });
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
    	console.log("Executing statement");
        request = new Request("select * from ManageDatabase where Item = 'Instalment Slip trust'", function(err, rowcount, rows) {  
        if (err) {  
            console.log(err);
            //res.write(rowcount);
        }
        JSONarray.push(rowcount);
        });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                result += 'NULL';  
              } else {  
                result += column.value + " ";  
              }  
            });
            
            //console.log(result);
            //JSONarray.push(result);
            //result ="";  
        });  

        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        res.write(rowCount + ' rows returned');  
        }); 
        connection.execSql(request);
    }  
  if (connection){
    res.write(JSON.stringify(JSONarray));
  } else {
  	  res.write("No output available.");
  }
res.write('</body>');
res.write('</html>');
   res.end();
}).listen(8083, 'localhost');
console.log('Server running at http://localhost:8083/');
/*
var config = {
        user: 'cm97@uobe7kufo3',
        password: 'Azur3Pswd',
        server: 'uobe7kufo3.database.windows.net', 
        database: 'Teledata' 
    };
    sql.connect(config);
  
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var sel = new sql.Request();
           
        // query to the database and get the records
        sel.query('select * from ManageDatabase', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(8083, function () {
    console.log('Server is running..');
});
*/

