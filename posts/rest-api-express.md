---
title: 'Building A REST API Using Express'
date: '2021-06-24'
image: '/images/express.png'
---

## REST Basics
Most, if not all, applications these days follow client-server architecture. The client, or front end, is what users interact with. The client must communicate with the server, or back end, in order to get or save data.

This communication happens via HTTP protocol, the same protocol that powers the web. On our server, we want expose a bunch of services that are accessible via the HTTP protocol. The client can call these services by making HTTP requests.

REST is short for Representational State Transfer, and is a convention for building these HTTP services. What we want to provide is the ability to perform CRUD operations, which stands for _Create_, _Read_, _Update_, and _Delete_.

We start by providing an endpoint for the client to access the data with. This is simply a URL on the domain with a specific route, it is a common convention is to include /api in this route, followed by the resource. For example, if we had a library and we want to provide an API endpoint for accessing book data, our endpoint could possibly look like:
`http://library.com/api/books`
All operations involving books would go to this endpoint. The kind of operations depends on the HTTP method. There are 4 main HTTP methods to start out with:
- POST for creating data
- GET for reading data
- PUT for updating data
- DELETE for deleting data

In order to allow the client to make these kinds of requests to the server, you have to have routes set up on the server side that will be able to interact with these requests, communicate with a database, and send back the right responses to the client.

## Enter Express
Express is a free and open-source back end web application framework for Node, designed for building web applications and APIs. It has been called the de facto standard server framework for Node. It is used a ton and the documentation for it is great.

To get started with Express, you simply need to install it via `npm install express` inside of a project. If you're getting started from scratch, just create a new project folder, and inside that folder in terminal run `npm init --yes` which will give you a package.json file, then run `npm install express`.

Create a file for your Express application, we'll call it index.js. The basic shell of an Express application looks like this:
```js
const express = require('express');
const app = express();

app.get();
app.post();
app.put();
app.delete();

app.listen(3000, () => console.log('Listening on port 3000'));
```
 
We first call the `require` function on the `express` module, which returns a function. `express()` returns an object, which we will save in the constant `app`. The `app` object represents our applications, and it has a bunch of useful methods built into it. As we can see above, there are methods for get, post, put, and delete. 

Finally, we need to listen on a given port. To do this we call `app.listen()` and pass it a port number, and optionally, you can pass a function that will be called when the app begins listening on a given port. So we'll log to the console a message to confirm the app is listening on port 3000.

Those methods correspond to the same HTTP methods. A full list of the properties and methods can be found at:
https://expressjs.com/en/4x/api.html#app
 
#### GET
We'll start with the `get()` method and create a couple of endpoints that will respond to an HTTP GET request.
 
The `get()` method accepts two arguments. The first argument is the route, the second is a callback function, often referred to as the _route handler_, that will be called when the server receives an HTTP GET request to that endpoint. This callback function should always have two arguments: first the request, then the response (commonly abbreviated to `req` and `res`).
 
The request object has a bunch of useful properties that can give us information about the incoming request. 
The response object has a few properties but a lot more methods on it, and it represents the HTTP response that your Express app sends when it gets a request. 

Throughout the course of this post, we'll the most common and essential of these, but a full list of the properties and methods on these objects can be found in the Express documentation at: 
https://expressjs.com/en/4x/api.html#req
https://expressjs.com/en/4x/api.html#res

We will start out by sending a simple response back to the client using the `send` method.
 
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello world');
});
 
app.listen(3000, () => console.log('Listening on port 3000'));
```

Now, in the terminal we can run `node index.js` and go in a browser to http://localhost:3000/ and we should see 'Hello world' printed onto the screen. Now let's define another route.

Let's start defining our route to get books from the server for our library API. We'll say our endpoint for this will be `/api/books`. In a real-world application, we would make some kind of communication between our Express app route handler and a database to get this data and send it back as an object, but that's beyond the scope of this post. For now, we'll simply create an array of objects in our express app that we will send back.

```js
const express = require('express');
const app = express();

const books = [
   { id: 1, title: "Clean Code" },
   { id: 2, title: "The Road to React" },
   { id: 3, title: "You Don't Know JS" },
];

app.get('/', (req, res) => {
   res.send('Hello world');
});

app.get('/api/books', (req, res) => {
   res.send(books)
});
 
app.listen(3000, () => console.log('Listening on port 3000'));
```

Now when we run our server and go to http://localhost:3000/api/books we should see our array of books on the screen.

At this point it would be a good idea to install nodemon. The way we have it now whenever we make a change to the code we have to stop the server and restart it. We can install nodemon which will monitor our files and automatically restart the server for us when it detects changes. To do this we will install nodemon globally by simply running `npm install -g nodemon`. Now when we want to run our server instead of running `node index.js`, run `nodemon index.js`. We can also set up a script in our package.json file to use nodemon as well, if you wish to use that.

##### Route Parameters

Let's set up a route to get an individual book from our server. In order to do this we'll need to send as a parameter the id of the book we want to get as part of our request. It will look like this: `/api/books/1` for grabbing the first book. To do this we will add the following route:

```js
app.get('/api/books/:id', (req, res) => {
	res.send(req.params.id);
})
```

The first key part to pay attention to here is the `/:id` at the end of the route. By doing this with the colon we're giving our parameter the name 'id'. 'id' could be anything, 'bookID', whatever. By convention, it's shorter and easier to just say 'id'.

The second key part of this request is how we read this parameter. To do this we acces `req.params.id`. Now if we go to this `/api/books/1` endpoint in the browser, the id 1 on the page. You can add multiple parameters to a request in this way, by just adding a slash, colon, then the parameter name. 

If you want to access query parameters that are passed in the url, you would simply use the `query` property on the request object instead of `params`.

Now, what we want to do is send the book object back that corresponds with the id we're passing. In order to do that, we just add some code in our route handler to find the book that corresponds to the id parameter, and return that object. Again, in a real world application this would be communicating with a database, but we're just grabbing it from our books array. 

To do this, we use the `find` method on our books array to find the book with the given id, which we'll need to parse into an integer to do. If there's no book we want to set the status to 404 which is the HTTP response code for a resource not being found, and send a message back to the client indicating that. When a response is sent back to the client, it terminates the request->response cycle, it can be important to know that `send()` does not return a function, but it does end the request. So, if we send the error message, we won't also be sending the book object, becuase the request has been terminated, but other code in that route handler could still be executed. Because of this, when we're sending back errors, we want to `return` the function to end it as well. 

```js
app.get('/api/books/:id', (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.id));
	if (!book) return res.status(404).send('The book with the given id was not found');
	res.send(book);
})
```

You can test this in the browser by visiting http://localhost:3000/api/books/1. You should see the object that corresponds with that id. If you change the parameter to /10 or any number that doesn't have a corresponding id in your array, you should see the error message.

#### POST
Next we'll cover how to handle HTTP post requests. When we receive a post request from the client, we are expecting to receive a body object with the request that contains the data the client wants to send to the server. You can access this through the `body` property on the request object.

So, we want to create a `book` object, add the properties to it from the request, communicate with our data source, and send a response back to the client.  In this example, our book object has two properties: `id` and `title`. If this app were communicating with a database, the database would probably take care of setting the `id`. Since we're just using a simple example, we'll need to set the `id` ourselves by setting to 1 higher than the length of our books array. For the title, we'll expect to receive a body object as part of the request, with a `title` property in it. We'll access that title from the title property on the body object of the response: `req.body.title`. Now that we have our book object, we'll push that onto our array of books. Finally, by convention, when we post an object to the server, we should return that object in the body of the response. This is because we're assigning the id on the server, so we want to return the object to the server because chances are the client will need to know this id to use it for some purpose on the client side.

```js
app.post('/api/books', (req, res) => {
	const book = {
		id: books.length + 1,
		title: req.body.title
	};
	books.push(book);
	res.send(book);
});
```

Now, in order for this to work we'll need to enable parsing of JSON objects in the body of the request. By default, this is not enabled in Express. There is a builtin middleware in Express to enable it, so we need to use that middleware on our Express app. I will explain this in my next blog post which gets into middlewares, but for now, just know that this enables parsing of incoming JSON payloads. So right below where we define our Express app, we add:

```js
app.use(express.json());
```

You can now test this easily using Postman, by sending request to http://localhost:3000/api/books/ with a JSON object in the body that contains a title and some value in it.

![[Screen Shot 2021-06-24 at 2.38.17 PM.png]]

##### Validation Using Joi
As a security best practice, you should never trust what the client sends you. You should always validate it. The HTTP status code to indicate a bad request is 400. We can do this using vanilla JavaScript and conditionals to check our request, send back an error if they don't meet our criteria, and return the function early. Let's say we want to make sure the request includes a title, and that title is at least 2 characters. We could add the following to our post route handler.

```js
app.post('/api/books', (req, res) => {
	if (!req.body.title || req.body.title.length < 3) {
		res.status(400).send('Title is required and should be at least 3 characters.');
		return;
	}
	
	const book = {
		id: books.length + 1,
		title: req.body.title
	};
	books.push(book);
	res.send(book);
});
```

There are libraries out there that can help with validation. A popular one is Joi. To get started, install Joi via npm by running `npm install joi` in the terminal your project directory, and then requiring Joi in your app. Joi provides some powerful validation features, and is documented very well. The way it works is you define schemas which contain types and restraints. You then validate values against the schema. If the value is valid, error will be undefined. If the input is invalid, error is assigned a ValidationError object providing more information. You can extract specific properties from this object to send back to the client, or just send the whole thing. For now, we'll define a schema for our title property that has the same restraints as our vanilla JavaScript from before, and send the whole error response back so we can see what we get. Our post route handler looks like this using Joi:

```js
app.post("/api/books", (req, res) => {
  const schema = {
    title: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send(result.error);

  const book = {
    id: books.length + 1,
    title: req.body.title,
  };
  books.push(book);
  res.send(book);
});
```

If we try to make a post request now that, for example, has no value in the title property, our error response should look like this:

```js
{
    "isJoi": true,
    "name": "ValidationError",
    "details": [
        {
            "message": "\"title\" is not allowed to be empty",
            "path": [
                "title"
            ],
            "type": "any.empty",
            "context": {
                "value": "",
                "invalids": [
                    ""
                ],
                "key": "title",
                "label": "title"
            }
        }
    ],
    "_object": {
        "title": ""
    }
}
```

Optionally, we can choose to simply return the error message by accessing that message like so:

```js
if (result.error) return res.status(400).send(result.error.details[0].message);
```

Now, the same request would simply return to us:

```js
"title" is not allowed to be empty
```

You can learn more about what kind of constraints and schemas you can set up by referencing the Joi documentation here: https://joi.dev/api/?v=17.4.0.

#### PUT
Let's walk through the logic we'll need to implement for put requests. First, the request will need to pass an id parameter so we know which course we want to update. Then, we'll look up the course from our data source. If the course doesn't exist, we return a 404. Then we'll be expecting a body object with the request containing the update, we'll want to validate that, and return a 400 if it's invalid. If we make it past that, then we want to update the course, and return the updated course object as a response to the client.

You may be able to put this together on your own based on what we've done up to this point. If you've made it this far, I encourage you to give that a try.

Here is the code:

```js
app.put("/api/books/:id", (req, res) => {
  // Look up the book and return a 404 if we can't find it
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send("The book with the given id was not found");

  // Validate the request body, return a 400 if it's invalid
  const schema = {
    title: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  // Update the book and send the updated book back to the client
  book.title = req.body.title;
  res.send(book);
});
```

You may have noticed at this point that we're repeating ourselves with the validation, so as a best practice, we'll pull that out into a separate function that we can call to validate our requests. We can clean it up further by destructuring out the error property.

```js
app.put("/api/books/:id", (req, res) => {
  // Look up the book and return a 404 if we can't find it
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book with the given id was not found");

  // Validate the request body, return a 400 if it's invalid
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    
  
  // Update the book and send the updated book back to the client
  book.title = req.body.title;
  res.send(book);
});

function validateBook(book) {
  const schema = {
    title: Joi.string().min(3).required(),
  };

  return Joi.validate(book, schema);
};
```

#### DELETE
Finally, we set up our route handler to respond to HTTP delete requests. First, we'll be expecting the request to provide an id parameter again to indicate which book to delete. Then, we will look up that book, and if it doesn't exist in our data source, return a 404. If it does, we can go ahead and delete it. Finally, we will return the book object. Again, if you've gotten this far I'd encourage you to try setting up this route handler on your own.

```js
app.delete('/api/books/:id') {
  // Look up the book and return a 404 if we can't find it
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book with the given id was not found");

  // Find the index of the book and delete it
  const index = books.indexOf(book);
  books.splice(book, 1);

  // Send the book back to the client
  res.send(book);
}
```

Full Express app:

```js
const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

const books = [
  { id: 1, name: "Clean Code" },
  { id: 2, name: "The Road to React" },
  { id: 3, name: "You Don't Know JS" },
];

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book with the given id was not found");
  res.send(book);
});

app.post("/api/books", (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = {
    id: books.length + 1,
    title: req.body.title,
  };
  books.push(book);
  res.send(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book with the given id was not found");

  // Validate the request body, return a 400 if it's invalid
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  book.title = req.body.title;
  res.send(book);
});

function validateBook(book) {
  const schema = {
    title: Joi.string().min(3).required(),
  };

  return Joi.validate(book, schema);
};

app.delete('/api/books/:id') {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("The book with the given id was not found");

  const index = books.indexOf(book);
  books.splice(book, 1);

  res.send(book);
}

app.listen(3000, () => console.log("Listening on port 3000"));
```

## Conclusion
There you have it! That's a complete Express application. It's pretty simple right now, but you should have a good understanding of what goes into an Express application, some conventions and best practices for RESTful services, how to set up route handlers, and how to deal with requests and responses.
