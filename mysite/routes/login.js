const express = require('express');
var router = express.Router();


//Get Users listing
router.get('/', async function(req, res, next)
{

    if(!req.session.mycounter)
    {
        req.session.mycounter = 1;
    }
    else{
        req.session.mycounter += 1;
    }
    // Save in the session the current date
    // Save amount of Actions until now
    //Every Day The Actions will be reset?

    res.render('login', {result: "true", counterVal : req.session.mycounter });
});


module.exports = router;