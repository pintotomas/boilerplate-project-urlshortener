const validUrl = require('valid-url');
require('dotenv').config();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var lastUrlId = 1;
let urlSchema = new Schema({
    url: {type: String, required: true},
    urlId: {type: Number, required: true}
  });
  
let Url = mongoose.model('Url', urlSchema);

var createAndSaveUrl = function(done, urlName, res) {
    var url = new Url({url: urlName, urlId: lastUrlId});
    lastUrlId += 1;
    url.save((err, data)=>{
     if (err) {
        console.log("Error happened while saving: " + err);
        return done(err, data, res)
     }
     return done(null, data, res)
    });
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
    if (validUrl.isUri(url)) {
        return true;
    }
    return false;

}

exports.createAndSaveUrl = createAndSaveUrl;
exports.handleCreateAndSaveUrl = handleCreateAndSaveUrl;
exports.validateUrl = validateUrl;