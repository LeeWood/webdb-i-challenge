const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

//GET

router.get('/', async (req,res) => { //* GET all rows (SELECT * FROM Accounts;)

  try{
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  }catch(err) {
    res.status(500).json({
      message: "There's been a problem retrieving accounts.",
      err
    });
  }
});

router.get('/:id', validateAccountId, async (req, res) => { //* GET specific row (SELECT * FROM Accountrs WHERE id = i;)
  
  res.status(200).json(req.account);
});


//POST

router.post('/', validateAccount,async (req, res) => { //* POST new row (INSERT INTO Accounts (name, budget) VALUES (inputName, inputValue);)
  
  const acctData = req.body;

  try {
    const account = await db('accounts').insert(acctData);
    res.status(201).json(account);
  }catch(err) {
    res.status(500).json({
      message: "There's been a problem adding new account.",
      err
    });
  }
});

//PUT

router.put('/:id', validateAccountId, async (req, res) => { //*PUT existing row (UPDATE Accounts SET name/budget = Value WHERE id = i;)

  const { id } = req.params;
  const updatedInfo = req.body;

  try {
    const rowsUpdated = await db('accounts').where('id', id).update(updatedInfo);
    res.status(200).json({
      updated: rowsUpdated
    }); 
  }catch(err) {
    res.status(500).json({
      message: "There has been a problem editing account.",
      err
    });
  }
});

//DELETE

router.delete('/:id', validateAccountId, async (req, res) => { //*DELETE existing row (DELETE FROM Accounts WHERE id = i;)
  const { id } = req.params;
  
  try{
    const rowsDeleted = await db('accounts').where('id', id).del();
    res.status(200).json({
      deltetedRecords: rowsDeleted
    });
  }catch(err){
    res.status(500).json({
      message: "There has been a problem deleting account.",
      err
    });
  }
});

//MIDDLEWARE

async function validateAccountId(req, res, next) {
  const { id } = req.params;
  try{
    const [account] = await db('accounts').where('id', id);
    if(account) {
      req.account = account;
      next();
    } else {
      res.status(404).json({
        message: "An account with this ID could not be found."
      })
    }
  }catch(err){
    res.status(500).json({
      message: "There's been a problem getting account."
    });
  }
}

async function validateAccount(req, res, next) {

  const acctData = req.body;
  if(!acctData.name && !acctData.budget) {
    res.status(400).json({
      message: "Missing account data."
    });
  } else if(!acctData.name) {
    res.status(400).json({
      message: "Please enter account name."
    });
  } else if(!acctData.budget) {
    res.status(400).json({
      message: "Please enter account budget."
    })
  } else {
    next();
  }
}

module.exports = router;