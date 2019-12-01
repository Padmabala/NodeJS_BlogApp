const Sequelize=require('sequelize');
const BlogDB=require('../config/BlogDB');
const {generateHashSync}=require('../utils/hash')

const User=BlogDB.define("user",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:{
       type:Sequelize.STRING,
       unique:true,
       validate:{
           isEmail:true
       }
    },
    password:Sequelize.STRING,
},
{
   /* setterMethods:{
        password:plainTextPassword=>{
            this.setDataValue()
        }
    }*/ //this setDataValue() does not work as it is a arrow function, it'll take the context of setter method rather than the user object..so, use normal function
    /* here using a normal function does not work..since the context is generateHash and it does not inherit the setDataValue() from user object
    //password inherits the users instance and inturn password has inherited the setDataValue() from user object..so, using a arrow function works here
    setterMethods:{
        password:plainTextPassword=>{
            generateHash(plainTextPassword)
                    .then(function (hash){
                        this.setDataValue("password",hash)
                    })
            }
    */
   //below does not work coz, setters and getters do not support async methods inside them
   /* generateHash(plainTextPassword)
                    .then(hash=>{
                        this.setDataValue("password",hash)
                    })*/ 
    setterMethods:{
        password:function(plainTextPassword){ //short hand is password(plainTextPassword){ 
            this.setDataValue("password",generateHashSync(plainTextPassword))
        }
    },
    getterMethods:{
         fullName(){  //or fullName:function(){}
             return  this.getDataValue("firstName")+" "+this.getDataValue("lastName");
         }
    }
}
);

const userSync=({force=false}={force:false})=>{
    User.sync({force})
        .then(()=>{
            const testUser={
                firstName:"Shan",
                lastName:"Lee",
                email:"Leegmail@gmail.com",
                password:"passwordLee"
            };
            User.create(testUser)
                .then(result=>{
                    console.log(result.get());
                })
                .catch(console.error);
            
        })
        .catch(console.error);
        //.catch(error=>console.error(error));===>abv is the ES6 form for it
}

exports.User=User;
exports.userSync=userSync;