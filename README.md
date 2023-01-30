# Task Manager App

NodeJS application for managing tasks

# To start application locally:

-   install node 14+
-   execute `npm ci` in home directory to install all required modules
-   execute `npm run dev`, in the console output you should see:
    > `Server is listening on 3000`

# Endpoint capabilities:
Almost all requests are hidden behing auth, auth is made based on JWT token. Token is assign to user on login/user creation  
There is a connection between users & tasks, user can only see tasks created by him. User can create tasks, manage his account and add avatar to his account. App sends welcome email on registration & account deletion (only for whitelisted emails) 

`url` variable should be set to `https://task-manager-app-wetherk.vercel.app` in case testing on production and `http://localhost:3000` if testing locally,
also you need to setup `authToken` variable in postman envinroment, you can leave it empty, collection has scripts to fill it automatically on login/user creation

Postman collection is located in the project source files

Log in
```
POST {{url}}/users/login
Authorization: token
Body: {
  "email": "example@email.com",
  "password" : "password"
}
```

Log out
```
POST {{url}}/users/logout  
Authorization: token
```

Log out all devices
```
POST {{url}}/users/logoutAll
Authorization: token
```

Create user
```
POST {{url}}/users
Authorization: token
Body: {
  "name": "John Smith",
  "email": "example@email.com",
  "password": "password",
  "age": "20"
}
```

Create task
```
POST {{url}}/tasks
Authorization: token
Body: {
  "description": "Some task",
  "completed": false
} 
```

Upload user avatar
```
POST {{url}}/users/me/avatar
Authorization: token
Body: 
form-data
avatar file.jpg
```

Get user info 
```
GET {{url}}/users/me
Authorization: token
```

Get user avatar
```
GET {{url}}/users/{{userID}}/avatar
```

Get task info 
```
GET {{url}}/tasks/{{taskID}}
Authorization: token
```

Get all tasks 
```
GET {{url}}/tasks
Authorization: token
```

Update user
```
PATCH {{url}}/users/me
Body: {
  "name": "John Smith2",
  "email": "example2@email.com",
  "password": "password2",
  "age": "21"
}
Authorization: token
```

Update task
```
PATCH {{url}}/tasks/{{taskID}}
Body: {
  "name": "John Smith2",
  "email": "example2@email.com",
  "password": "password2",
  "age": "21"
}
Authorization: token
```

Delete user
```
DELETE {{url}}/users/me
Authorization: token
```

Delete task
```
DELETE {{url}}/tasks/{{taskID}}
Authorization: token
```

Delete avatar
```
DELETE {{url}}/users/me/avatar
Authorization: token
```

There is a possibility to filter fetched tasks. This can be made by providing additional query to the request
Here is an example:
```
GET {{url}}/tasks?sortBy=description_asc
```
First you provide attribute to be sorted by with underscore at the end ex: `description_`, then `asc` or `desc` depending on the ordering you need

# Application is hosted on [Vercel](https://vercel.com/)
Link: [Task Manager App](https://task-manager-app-wetherk.vercel.app/)
