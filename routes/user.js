module.exports = app => {
    const UserCont = require("../controller/user");  
    var router = require("express").Router();

    router.post("/signup", UserCont.signup);
    router.post("/login", UserCont.login);
    router.get("/", UserCont.verifyToken, UserCont.findAll);
    router.get("/:id", UserCont.verifyToken, UserCont.findOne);
    router.put("/:id", UserCont.verifyToken, UserCont.update);
    router.delete("/:id", UserCont.verifyToken, UserCont.delete);
    router.delete("/", UserCont.verifyToken, UserCont.deleteAll);
  
    app.use('/api/user', router);
  };