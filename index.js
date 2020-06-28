// const express = require('express')
// const app = express();
// const bodyParser= require('body-parser')
// const MongoClient = require('mongodb').MongoClient

// var quotesCollection;
// app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view engine', 'ejs')
// const connectionString="mongodb+srv://mongouser:Velu@123@cluster0-e30qc.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(connectionString, {
//     useUnifiedTopology: true
//   }, (err, client) => {
//     if (err) return console.error(err)
//     const db = client.db('summa')
//      quotesCollection = db.collection('memo')
//     console.log('Connected to Database')
//   }

//   )
//   app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//     // Note: __dirname is directory current directory you're in. Try logging it and see what you get!
//     // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
//   })
//   app.post('/quotes', (req, res) => {
//     quotesCollection.insertOne(req.body)
//       .then(result => {
//         res.redirect('/')
//         console.log(result)
//       })
//       .catch(error => console.error(error))
//   })

// app.listen(8000, () => {
//   console.log('Example app listening on port 8000!')
// });

require('./model/mongo');
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
const memoController=require('./controller/memocontroller')
app.use(bodyparser.urlencoded({
    extended: true
    }));


    app.use(bodyparser.json());
    app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'hbs');
    app.engine('hbs', exphb({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname  }));
    const port = process.env.PORT || 8080;
    app.use('/memo', memoController);
    // app.use(app.router);
    // routes.initialize(app);
app.listen(port, () => console.log(`Listening on port ${port}..`));
