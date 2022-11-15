 const express = require("express");
  const path = require("path");
  const bodyParser = require('body-parser');
  const app = express();
  const router = express.Router();
// const routeRoutes = require('./src/routes/route-routes');
  const PORT = process.env.PORT || 8080;
// const cookieParser = require("cookie-parser");np
// app.use(cookieParser());
const Control = require('./CONTROLS/Controls');
const CONTROL = new Control();

 router.get('/api', (req, res, next) => {
     res.send('Welcome to the server!');
 });

 router.post("/api/login", (req, response)=>{
     // Do not uncomment only if post
     let email = req.body.emailAddress;
     let pass = req.body.passwordSec;
     console.log('Starting login process...');
        if(!CONTROL.loginByEmailAndPassword(email, pass)){
            console.log('Backend: Invalid login!');
            response.json({user: undefined});
        }else{
            console.log('Backend: Valid login!');
            response.json({user: email});
        }
 });

 router.post("/api/ticketPurchase", (req, res)=>{
    let jaratid = req.body.jaratID;
    console.log("Buying ticket...", "Jaratid: ", jaratid);
     if(!CONTROL.ticketPurchaseHandler(jaratid)){
         console.log('Backend: Invalid ticketPurchase!');
         res.status(403);
         res.json({error: 'Invalid ticketPurchase!'});
     }else{
         console.log('Backend: Valid ticketPurchase!');
         res.status(200);
     }
     res.end();
 });

 router.get('/api/profile', (req, res)=>{
     setTimeout(()=>{
         let ticket = CONTROL.getTicketForLoggedInUser();
         console.log(ticket);
         if(ticket === false){
             console.log('No ticket found!');
         }else{
             res.json({ticketToSend: ticket});
         }
     }, 1000);

 });

 router.post('/api/register', (req, response)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const zipCode = req.body.zipcode;
    const street = req.body.street;
    const number = req.body.houseNumber;
    const birthDate = req.body.birthDate;

     // used email check
     // Any other case we can register, type check is done on the client side
    CONTROL.canRegisterUser(email).then(res=>{
        if(!res){
            response.json({error: 'Email address already in use!'});
        }else{
            CONTROL.registerUser(email, password, firstName, lastName, zipCode, street, number, birthDate).then(res=>{
                if(res){
                    response.json({success: true});
                }else{
                    response.json({success: false});
                }
            });
        }
    });
 });

 router.get('/api/bus', (req, res)=>{
     CONTROL.selectBuses().then(result=>{
         console.log('Buses to display:', result);
         res.json(result);
     });
 });

 router.get('/api/tram', (req, res)=>{
     CONTROL.selectTrams().then(result=>{
         // console.log('Trams to display:', result);
         res.json({trams: result});
     });
 });

 router.get('/api/news', (req, res)=>{
     CONTROL.getNews().then((result)=>{
         res.json(JSON.stringify(result));
         res.end();
     });
 });

 router.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
 });


  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "src/views"));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.urlencoded({extended: false}));
  app.use(bodyParser.json());
 // Have Node serve the files for our built React app
 app.use(express.static(path.resolve(__dirname, '../frontend/build')));
  app.use('/', router);

  app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/");
  });


module.exports = router;