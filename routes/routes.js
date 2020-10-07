const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/', function (req, res) {
    Todo.find({}).then(function (results) {
        const todos = results.filter((todo) => {
            return !todo.done;
        });
        const doneTodos = results.filter((todo) => {
            return todo.done;
        });
        res.render('index', { todos, doneTodos });
    })
});
router.post('/todos', function (req, res) {
    const newTodo = new Todo({ description: req.body.description });

    newTodo
        .save()
        .then((data) => {
            console.log(data);
            res.redirect('/');
        })
        .catch(function (err) {
            console.log(err);
            res.redirect('/');
        });
});
router.post('/todos/:id/completed', function (req, res) {
    const todoId = req.params.id;
    Todo
        .findById(todoId)
        .exec()
        .then(function (result) {
            result.done = !result.done;
            return result.save();
        }).then(function () {
            res.redirect('/');
        });
});

module.exports = router;