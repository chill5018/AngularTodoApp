// Import the Todo model so we can query the DB
import Todo from '../models/Todo'

let mainController = {
  getIndex: (req, res) => {
    // Compiles the file named "index" in the views directory (`/views`)\
    // using the view engin (Jade)
    res.render('index')
  },
  // Allows us to access our Angular Templates
  getTemplate: (req, res) => {
    res.render('templates/' + req.params.template)
  },
  // This gets all Todos in the collection and sends it back in JSON formate
  getAllTodos: (req, res) => {
    Todo.find({}, (err, todos) ={
      if (err) {
        // Send error to the client if there is one
        return res.send(err)
      }
      // Send todos in JSON format
      res.json(todos)
    })
  },
  postNewTodo: (req, res) => {
    // This creates a new todo using POSTed Data in (req.body)
    Todo.create({
      text: req.body.text,
      done: false
    }, (err, todo) => {
      if (err) {
        return res.send(err)
      }
      Todo.find({}, (err, todos) => {
        if (err) {
          return res.send(err)
        }
        // Send list of all todos after new one has been created and saved
        res.json(todos)
      })
    })
  },
  deleteTodo: (req, res) => {
    Todo.remove({
      _id: req.params.id
    }, (err, todo) => {
      if (err) {
        return res.send(err);
      }
      Todo.find({}, (err, todos) => {
        if (err) {
          return res.send(err);
        }
        res.json(todos);
      })
    })
  }
}

export default mainController
