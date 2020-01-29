const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

//GET

router.get('/', async (req,res) => { //GET all accts
//SELECT * FROM Accounts;
  try{
    const [accounts] = await db('accounts');
    res.status(200).json(accounts);
  } catch(err) {
    res.status(500).json({
      message: "There's been a problem retrieving accounts.",
      err
    });
  }
});

router.get('/:id', async (req, res) => { //GET specific acct
  //SELECT * FROM Accountrs WHERE id = i;
  const { id } = req.params;
  try {
    const [account] = await db('accounts').where('id', id);
    res.status(200).json(account);
  } catch(err) {
    res.status(500).json({
      message: "There's been a problem retrieving account info.",
      err
    });
  }
});


//POST



//PUT

//DELETE

module.exports = router;