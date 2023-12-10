var express = require('express');
var router = express.Router();
var dechetsController=require('../controller/dechetsController');

const app = express();


router.post("/add",dechetsController.ajout);

router.get("/showall",dechetsController.show);

router.put("/update/:id",dechetsController.update);

router.delete("/delete/:id",dechetsController.remove);

router.get('/detection', (req, res) => {
    res.render('detection.twig');
});


module.exports = router
 