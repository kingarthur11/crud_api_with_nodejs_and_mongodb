module.exports = app => {
    const UserCont = require("../controller/user");  
    var router = require("express").Router();

    router.post("/",UserCont.create);
    router.get("/",UserCont.findAll);
    router.get("/:id",UserCont.findOne);
    router.put("/:id",UserCont.update);
    router.delete("/:id",UserCont.delete);
    router.delete("/",UserCont.deleteAll);
  
    app.use('/api/user', router);
  };