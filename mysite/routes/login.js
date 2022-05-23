const express = require('express');
var router = express.Router();


//Get Users listing
router.get('/', async function(req, res, next)
{

    //console.log(req.session);
    // Save in the session the current date
    // Save amount of Actions until now
    //Every Day The Actions will be reset?

    res.render('login', {result: "true"});
});


module.exports = router;