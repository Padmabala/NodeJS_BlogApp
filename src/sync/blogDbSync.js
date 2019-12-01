const {userSync}=require('../models/Users');
const {postSync}=require('../models/Posts');
const {authorSync}=require('../models/Authors');

userSync({force:true});
authorSync({force:true})
.then(author=>postSync({force:true,author}));



