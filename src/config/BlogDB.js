require('dotenv').config();
const Sequelize=require('sequelize');

const BlogDB=new Sequelize(process.env.DB_URI);

BlogDB
.authenticate()
.then(()=>{
    console.log("DB Connection Established");
})
.catch((err)=>{
    console.error("Failed to establish DB connection")
});

module.exports=BlogDB;