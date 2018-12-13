#!/usr/bin/env nodejs
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require('request'),
    username = '5040874c6d38cbac61dc705337cf670ddb75edf9',
    password = '5a4434920eca7e675fd67f318f3c9625f5f14d37',
    jsonurl = 'http://squirrel.ool.co.uk/data/xAPI/statements',
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var propertiesObject = { agent : '{"mbox" : "mailto:jonathan@flint-street.co.uk"}'};


    http.createServer(function (req, res) {
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;

  res.writeHead(200, {'Content-Type': 'text/plain'});

    const options = {
        uri : jsonurl,
        method : 'POST',
        //json : true ,
        headers : {
            "Authorization" : auth ,
            "Content-Type": "application/json",
            "x-experience-api-version" : "1.0.3"
        },
        body : JSON.stringify({
        	"actor" : { "mbox": "mailto:jonathan@flint-street.co.uk" },
        	"verb" : { "id": "http://learn.ool.co.uk/verb" },
        	"object" : { "id": "http://learn.ool.co.uk/activity" ,
        	    "definition": {
        	    	    "type": "http://activitystrea.ms/schema/1.0/application",
        	    	    "name": {
        	    	    	    "en": "Example Application"
        	    	    }
        	    }
        	},
        	"context": {
        		"platform": "Example Platform",
        		"language": "en",
        		"extensions": {
        			"http://www.example.org/transition_tool_version": "1.0.0"
        		}
        	}


        })
        	
}	
request(options,
  	  
  	  function(error, response, body){
 	var JSONstring = JSON.stringify(propertiesObject);
	res.end(JSON.parse(body) + JSONstring);
});

}).listen(8002, 'localhost');
console.log('Server running at http://localhost:8002/');
