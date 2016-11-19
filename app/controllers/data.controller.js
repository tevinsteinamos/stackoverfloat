  const Model = require('../models/datas')

  module.exports = {
      showQuestions: showQuestions,
      showQuestion: showQuestion,
      showAdd: showAdd,
      processAdd: processAdd,
      showEdit: showEdit,
      processEdit: processEdit,
      deleteQuestion: deleteQuestion,
      processAddAnswer: processAddAnswer,
      voteUp: voteUp,
      voteDown: voteDown,
      voteAnswerUp: voteAnswerUp,
      voteAnswerDown: voteAnswerDown
  }

function voteAnswerUp (req,res) {
  Model.Question.findOne({slug:req.params.slug}, (err,question) => {
    question.answer[req.params.idx].answer_votes += 1

    question.save((err) => {
      if(err)
        throw err;

      req.flash('success', 'Successfully up vote answer')
      res.redirect(`/questions/${question.slug}`)
    })
  })
}

function voteAnswerDown (req,res) {
    Model.Question.findOne({slug:req.params.slug}, (err,question) => {
    question.answer[req.params.idx].answer_votes -= 1

    question.save((err) => {
      if(err)
        throw err;

      req.flash('success', 'Successfully down vote answer')
      res.redirect(`/questions/${question.slug}`)
    })
  })
}

  function voteUp(req, res) {
      //finding a current question
      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
          //update the question
          question.votes += 1

          question.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Successfully up vote question')
              res.redirect(`/questions/${question.slug}`)
          })
      })
  }

  function voteDown(req, res) {
      //finding a current question
      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
          //update the question
          question.votes -= 1

          question.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Successfully down vote question')
              res.redirect(`/questions/${question.slug}`)
          })
      })
  }

  //delete question
  function deleteQuestion(req, res) {
      Model.Question.remove({ slug: req.params.slug }, (err) => {
          //set flash Question
          //redirect to questions page
          req.flash('success', 'Question is deleted!')
          res.redirect('/questions')
      })
  }

  //edit question
  function showEdit(req, res) {
      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
          res.render('pages/edit', {
              question: question,
              errors: req.flash('errors')
          })
      })
  }

  function processEdit(req, res) {
      //validate information
      req.checkBody('title', 'Title is required').notEmpty()
      req.checkBody('content', 'Content is required').notEmpty()
      req.checkBody('email', 'Email address is required').notEmpty()

      //if there are errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if (errors) {
          req.flash('errors', errors.map(err => err.msg))
          return res.redirect(`/questions/${req.params.slug}/edit`)
      }

      //finding a current question
      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
          //update the question
          question.title = req.body.title
          question.content = req.body.content
          question.email = req.body.email

          question.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Successfully updated question')
              res.redirect(`/questions/${question.slug}`)
          })
      })
  }

  //add question
  function showAdd(req, res) {
      res.render('pages/add', {
          errors: req.flash('errors')
      })
  }

  function processAdd(req, res) {
      //validate information
      req.checkBody('title', 'Title is required').notEmpty()
      req.checkBody('content', 'Content is required').notEmpty()
      req.checkBody('email', 'Email address is required').notEmpty()
            req.checkBody('email', 'Email address is not the right format').isEmail()

      //if there's errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if (errors) {
          req.flash('errors', errors.map(err => err.msg))
          return res.redirect('/questions/add')
      }

      //create a new question
      var question = new Model.Question({
          title: req.body.title,
          content: req.body.content,
          email: req.body.email,
          votes: 0
      })

      question.save((err) => {
          if (err)
              throw err

          //set successful flash message
          req.flash('success', 'Successfully created question!')

          //redirect to url, not ejs file!
          res.redirect(`/questions/${question.slug}`)
      })
  }

  //show all questions
  function showQuestions(req, res) {
      //get all questions
      Model.Question.find({}, (err, questions) => {
          if (err) {
              res.status(404)
              res.send('Questions not found!')
          }

          //return a view with question
          res.render('pages/datas', {
              questions: questions,
              success: req.flash('success')
          })
      })
  }

  //show single question
  function showQuestion(req, res) {
      //get a single question
      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
          if (err) {
              res.status(404)
              res.send('Question not found!')
          }

          res.render('pages/single', {
              question: question,
              success: req.flash('success')
          })
      })
  }

  function processAddAnswer(req, res) {

      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
          question.answer.push({
              answer_content: req.body.answer_content,
              answer_email: req.body.answer_email,
              answer_votes: 0
          })

          question.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Successfully added answer')
              res.redirect(`/questions/${question.slug}`)

          })
      })
  }
