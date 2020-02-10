const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;



// const calendar = new p.Calendar(document.getElementById('calendar'))

// calendar.render()  