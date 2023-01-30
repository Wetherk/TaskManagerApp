const express = require("express");
const path = require("path");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(userRouter);
app.use(taskRouter);
app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/welcome.html"));
});

app.get("/live", (req, res) => {
    res.send("Endpoint is alive!");
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
