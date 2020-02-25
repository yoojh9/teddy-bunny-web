var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    var id = req.user
    console.log("id : " + id)
    if(!id){
        res.render("signup", {isLogin: false})
    } else {
        res.render("signup", {isLogin:true})
    }
});

module.exports = router;