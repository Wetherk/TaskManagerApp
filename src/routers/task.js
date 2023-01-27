const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/tasks", auth, async (req, res) => {
    const match = {};
    if (req.query.completed) match.completed = req.query.completed === "true";

    const sort = {};
    if (req.query.sortBy) {
        const sortParams = req.query.sortBy.split("_");
        const sortingMethod =
            sortParams[1] === "desc" ? -1 : sortParams[1] === "asc" ? 1 : null;

        if (sortingMethod) {
            sort[sortParams[0]] = sortingMethod;
        }
    }

    try {
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: +req.query.limit,
                skip: +req.query.skip,
                sort,
            },
        });

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({
            _id,
            owner: req.user.id,
        });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch("/tasks/:id", auth, async (req, res) => {
    const allowedUpdates = ["completed", "description"];
    const updates = Object.keys(req.body);
    const areUpdatesValid = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!areUpdatesValid) {
        return res.status(400).send("Invalid Updates!");
    }

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => (task[update] = req.body[update]));

        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
