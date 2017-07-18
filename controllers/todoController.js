var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds163232.mlab.com:63232/myfirsttodo');

//create a schema 
var todoSchema = new mongoose.Schema({
    item: String 
});

//create a model 
var Todo = mongoose.model('todo',todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function (app){ 

app.get('/todo', function(req,res){

Todo.find({}, function(err,data){ 
    if(err) throw err;
    res.render('todo', {todos:data});
});

});

app.post('/todo', urlencodedParser, function(req,res){
  
 
    var newTodo = Todo(req.body).save(function(err,data){
     if(err) throw err;
     res.json(data); 
    });
 
 
});

app.delete('/todo/:item', function(req,res){

//delete the requested item from db

Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
if(err) throw err;
res.json(data);
});

});

}