const express = require("express");
const { Post } = require("../models/Posts");

const indexRouter = express.Router();

const myMiddleware=(req,res,next)=>{
  console.log("middleware enabled");
  next();//if this is not given , it'll wait for the server to respond.....could be array on the below get..get([myMiddleware],(req, res) => {
}

indexRouter.route("/")
  .get([myMiddleware],(req, res) => {
    Post.findAll()
      .then(postsInstance => {
        const posts = postsInstance.map(instance => instance.get());
        res.render("home", {
          layout: "hero",
          posts,
          title: "Blog Home"
        });
      })
      .catch(console.error);
  });


module.exports = indexRouter;