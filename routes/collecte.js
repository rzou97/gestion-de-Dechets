var express = require('express');
var router = express.Router();
var collecteController=require('../controller/collectesController');


router.post("/add",collecteController.ajout);

router.get("/showall",collecteController.show);

router.put("/update/:id",collecteController.update);

router.delete("/delete/:id",collecteController.remove);


module.exports = router
 