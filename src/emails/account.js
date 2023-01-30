// const formData = require("form-data");
// const Mailgun = require("mailgun.js");

// const mailgun = new Mailgun(formData);
// const client = mailgun.client({
//     username: "api",
//     key: process.env.MAILGUN_API_KEY,
// });

// const sendWelcomeEmail = async (email, name) => {
//     const messageData = {
//         from: "Task Manager App Owner <me@samples.mailgun.org>",
//         to: email,
//         subject: "Tasks App Registration",
//         text: `Welcome to the app, ${name}, thanks for registering in Task Manager. Have Fun!`,
//     };
//     try {
//         const response = await client.messages.create(
//             process.env.MAILGUN_DOMAIN,
//             messageData
//         );
//         return response;
//     } catch (e) {
//         throw new Error(e);
//     }
// };

// const sendFarewellEmail = async (email, name) => {
//     const messageData = {
//         from: "Task Manager App Owner <me@samples.mailgun.org>",
//         to: email,
//         subject: "Tasks App User Cancellation",
//         text: `Hi, ${name}, thanks for using Task Manager app. What can we do to improve our services? Feel free to reach out to us.`,
//     };

//     try {
//         const response = await client.messages.create(
//             process.env.MAILGUN_DOMAIN,
//             messageData
//         );
//         return response;
//     } catch (e) {
//         throw new Error(e);
//     }
// };

// module.exports = {
//     sendWelcomeEmail,
//     sendFarewellEmail,
// };
