const express = require("express");
const { connectTomongoDb } = require('./connect.js');
const app = express();
const urlroute = require('./routes/url.js');
const URL = require('./modules/url.js')

const PORT = 8001;

connectTomongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => {
        console.log("MongoDb connected");
    })

app.use(express.json());

app.use("/url", urlroute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    })
    res.redirect(entry.longUrl);
})


app.listen(PORT, () => {
    console.log(`Server is started at Port:  ${PORT}`);
})


// Express.js is a web application framework for Node.js that simplifies the process of building robust web applications. Here are some of the commonly used methods and functions provided by Express:

// 1. **Application:**
//    - `express()`: Creates an instance of an Express application.
//    - `app.listen(port, callback)`: Binds and listens for connections on the specified host and port.

// 2. **Routing:**
//    - `app.get(path, callback)`: Handles GET requests at the specified route.
//    - `app.post(path, callback)`: Handles POST requests at the specified route.
//    - `app.put(path, callback)`: Handles PUT requests at the specified route.
//    - `app.delete(path, callback)`: Handles DELETE requests at the specified route.
//    - `app.route(path)`: Returns a single route instance to handle multiple HTTP methods for a given route.

// 3. **Middleware:**
//    - `app.use([path,] callback)`: Mounts the middleware function at the specified path.
//    - `app.use(callback)`: Applies middleware to all routes.
//    - `app.use(path, express.static(root))`: Serves static files.

// 4. **Response:**
//    - `res.send([body])`: Sends the HTTP response.
//    - `res.json([body])`: Sends a JSON response.
//    - `res.render(view [, locals] [, callback])`: Renders a view template.

// 5. **Request:**
//    - `req.params`: Object containing properties mapped to the named route parameters.
//    - `req.query`: Object containing properties of the parsed query string.
//    - `req.body`: Object containing the parsed request body.

// 6. **Other:**
//    - `app.set(name, value)`: Sets the application setting to the given value.
//    - `app.get(name)`: Gets the value of the given setting.
//    - `app.locals`: Object to store application-level data.

// These are just a few of the methods and functions provided by Express. The framework is modular and extensible, allowing developers to use additional middleware and plugins for various functionalities. It's essential to refer to the official Express.js documentation for the most up-to-date and comprehensive information: [Express.js Documentation](https://expressjs.com/).