const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../models/task");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            default: 0,
            validate: {
                validator: (value) => value >= 0,
                message: "Age should be a positive number",
            },
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: "Invalid email address",
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
            validate: {
                validator: (value) => !value.toLowerCase().includes("password"),
                message: "Password should not contain 'password'",
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Unable to log in :(");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Unable to log in :(");

    return user;
};

// Hash the plain text password before saving it to the database
userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete all user tasks on user deletion
userSchema.pre("remove", async function (next) {
    const user = this;

    await Task.deleteMany({
        owner: user._id,
    });

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
