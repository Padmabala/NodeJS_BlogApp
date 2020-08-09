const Sequelize=require('sequelize');
const BlogDB=require('../config/BlogDB');
const {Author}=require('./Authors');
const Post=BlogDB.define("post",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:Sequelize.STRING,
    content:Sequelize.TEXT,
    visible:Sequelize.BOOLEAN,
    authorId:
    {
        type:Sequelize.INTEGER,
        references:{
            model: Author,
            key:"id"
        }
    }
});





const postSync=({force=false,author={}}={force:false})=>{
    Post.sync({force})
        .then(()=>{
            const testPost=Post.build({
                title:"Nebula",
                content:"Nebula is where stars are born and it looks like a cloud",
                visible:true,
                authorId:author.id
            });
            testPost.save()
                .then(result=>{
                    console.log(testPost.get())
                })
                .catch(console.error);
        })
        .catch(console.error);
}

exports.Post=Post;
exports.postSync=postSync;