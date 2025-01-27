const validUrl = require('valid-url');
require('dotenv').config();
let mongoose = require('mongoose');
const e = require('express');
let Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var lastUrlId = 1;
let urlSchema = new Schema({
    url: {type: String, required: true},
    urlId: {type: Number, required: true}
  });
  
let Url = mongoose.model('Url', urlSchema);
//Reset urls 
Url.deleteMany({}, function(err, result){
    if(err) return console.log(util.inspect(err));
    console.log("cleaned up ", result.deletedCount, " records");
  }); 
var createAndSaveUrl = function(done, urlName, res) {

    var url = new Url({url: urlName, urlId: lastUrlId});
    Url.find({url: urlName}, (err, doc) => {
        if (doc.length) {
            console.log("doc.lengh " + doc);
            return done(err, doc[0], res);
        } else {
            lastUrlId += 1;
            url.save((err, data)=>{
             if (err) {
                console.log("Error happened while saving: " + err);
                return done(err, data, res)
             }
             return done(null, data, res)
            });
        }
    })

   }

const findOneByid = (urlId, done) => {
    Url.findById(urlId,  (err, data) => {
      if (err) return done(err);
      return done(null, data);
    });
  };

var handleCreateAndSaveUrl = function(error, data, res) {
    console.log("Error: " + error );
    if (error) {
        res.json({"error": "Failed to save URL"})
        return;
    }
    res.json({original_url: data.url, short_url: data.urlId});
}

const validateUrl = (url) => {

    //should add https:// to the url if it doesnt have it
    //also check if the url really exists in the internet
    var expression = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    if (validUrl.isUri(url)) {
        if (url.match(expression)) return true;
    }
    return false;

}

exports.createAndSaveUrl = createAndSaveUrl;
exports.handleCreateAndSaveUrl = handleCreateAndSaveUrl;
exports.validateUrl = validateUrl;