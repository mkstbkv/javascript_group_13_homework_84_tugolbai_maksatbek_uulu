const express = require('express');
const Task = require("../models/Task");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find().populate("user");
        return res.send(tasks);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title is required'});
        }

        const taskData = {
            title: req.body.title,
            status: 'new'
        };

        if (req.body.user) {
            taskData.user = req.body.user;
        }

        const task = new Task(taskData);

        await task.save();

        return res.send({message: 'Created new task', id: task._id});
    } catch (e) {
        next(e);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        if (req.body.user) {
            return res.status(400).send({message: 'Only "status" and "user" fields can be edited'});
        }

        const taskData = {};

        if (req.body.status) {
            taskData.status = req.body.status;
        }

        if (req.body.user) {
            taskData.user = req.body.user;
        }

        const task = Task.updateOne({_id : req.params.id}, {$set: {taskData}});

        await task.save();

        return res.send({message: 'Successfully modified'});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const task = Task.deleteOne({_id : req.params.id});
        await task.save();

        return res.send({message: 'Deleted successfully'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;