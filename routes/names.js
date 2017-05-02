var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var numberOfNames = []
var colors = []

//define schema
var nameSchema = new mongoose.Schema({
	name: {type: String, require: true}, 
	1900: {type: Number, min:0, max:1000},
	1910: {type: Number, min:0, max:1000},
	1920: {type: Number, min:0, max:1000},
	1930: {type: Number, min:0, max:1000},
	1940: {type: Number, min:0, max:1000},
	1950: {type: Number, min:0, max:1000},
	1960: {type: Number, min:0, max:1000},
	1970: {type: Number, min:0, max:1000},
	1980: {type: Number, min:0, max:1000},
	1990: {type: Number, min:0, max:1000},
	2000: {type: Number, min:0, max:1000}
});

// create the model
var Name = mongoose.model('names', nameSchema);

function existName(name){
  for (var i = 0; i < numberOfNames.length; i++) {
    if(numberOfNames[i]['name'] == name){
      return true
    }
  };
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



/* GET names listing. */
router.get('/', function(req, res, next) {

  	var input = req.query.name;
  	Name.findOne({ name: input}, function(err, name){
    	if(err){
    		console.log(err);
    		res.json({ result: null });
    	}
    	else if(name == null){
    		res.json({ result: null });
    	}
    	else{
        
        if(!existName(name['name'])){
          var color = random_rgba();
          
          colors.push(color)
          numberOfNames.push(name);
        }

        console.log(numberOfNames)

    		res.render('names2',{names: numberOfNames, colors: colors})
    		//res.json(name);
    	}

  })
});

module.exports = router;
