const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./router.js')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json())
app.use(express.static('./src/build'))
app.use('/', api.router)

app.listen(8081, () => {
    console.log("listening")
})
