//creating scheme for list for todo items.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({ 
    list: String,
    content: { type: String, required: true },
    created_at: Date,
    updated_at: Date
});

var List = mongoose.model('List', listSchema);

module.exports = List;


listSchema.pre('save', function(next) {
    //get current date
    var currentDate = new Date();
    //change the updated_at field
    this.updated_at = currentDate;

    //if created_at does't exist add to field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

//creating new item
var newList = List({
    myItem: 'bread',
    content: 'french bread'
});

newList.save(function(err) {
    if(err)throw err;
    console.log('List created!');
});

//get list items

List.find({}, function(err, list){
    if(err) throw err;
    console.log(list);
});

