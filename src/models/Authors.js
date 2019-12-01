const Sequelize=require('sequelize');
const BlogDB=require('../config/BlogDB');

const Author=BlogDB.define("author",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:Sequelize.STRING,
    

});
//const authorSync=(object={})=>{
const authorSync=({force=false}={force:false})=>{ 
    //force is a property of the sync function--when force is true it deletes the contents of the table and inserts fresh insert
    //when set to false, it just appends the contents to the table
    //with destructuring {force}={force:false}
    //with destructuring and default value to the object key==>{force=false}={force:false}
    return new Promise((resolve,reject)=>{
    Author.sync({force})
        .then(()=>{
            const testAuthor=Author.build({//this build only creates the row bu does not save it===>build our object and then save it
                firstName:'taylor',
                lastName:'swift',
                email:'taylor@gmail.com',
                
            });
            /*Author.create(testauthor)
                .then(result=>{
                    console.log(result)
                })*/
            testAuthor.save()
                .then(result=>{
                    console.log(result.get());
                    resolve(result.get())
            })
                .catch(error=>{reject(error)});         
        })
        .catch(error=>{reject(error)});         
    });
}

exports.Author=Author;
exports.authorSync=authorSync;
