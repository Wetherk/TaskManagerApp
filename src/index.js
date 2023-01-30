const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

app.get("/live", (req, res) => {
    res.send("Endpoint is alive!");
});

app.get("/", (req, res) => {
    res.send({
        env: JSON.stringify(process.env),
    });
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
