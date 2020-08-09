require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const indexRouter=require('./routers/indexRouter.js');
const expressHbs=require('express-handlebars');
const path=require('path');
const userRouter=require('./routers/userRouter');
const cookieParser=require('cookie-parser');
const app=express();

const hbs=expressHbs.create({
  extname:'.hbs',
  layoutsDir:path.join(__dirname,"./views/layouts"),
  partialsDir:path.join(__dirname,"./views/partials")
});

app.engine(".hbs",hbs.engine);
app.set("view engine",".hbs");
app.set("views",path.join(__dirname,"./views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(cookieParser());

app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/logout',indexRouter);

const server=app.listen(process.env.PORT,()=>{
    console.log("Server running at: ",server.address().port);
})