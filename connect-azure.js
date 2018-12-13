var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'cm97@uobe7kufo3',  
        password: 'Azur3Pswd',  
        server: 'uobe7kufo3.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'Teledata', rowCollectionOnRequestCompletion: true}  
    };  
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
