const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a Schema
const questionSchema = new Schema({
  title: String,
  content: String,
  email: String,
  slug: {
    type: String,
    unique: true
  },
  votes: Number,
  answer : [{
    answer_content : String,
    answer_email : String,
    answer_votes : Number
     }]
},{collection: 'questions'})

//middleware - make sure slug is created from title
questionSchema.pre('save', function(next){
  this.slug = slugify(this.title)
  this.content = contenify(this.content)
  next()
})

function contenify(text) {
  return text
    .replace(/\n/g, '<br>') // Replace \n with <br>
}

// function to slugify a title
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

//create the model
const Question = mongoose.model('Question', questionSchema)

//export model
module.exports = {Question}
