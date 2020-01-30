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

router.get('/:id', async (req, res) => { //* GET specific row (SELECT * FROM Accountrs WHERE id = i;)
  
  const { id } = req.params;

  try {
    const account = await db('accounts').where('id', id);
    res.status(200).json(account);
  }catch(err) {
    res.status(500).json({
      message: "There's been a problem retrieving account info.",
      err
    });
  }
});


//POST

router.post('/', async (req, res) => { //* POST new row (INSERT INTO Accounts (name, budget) VALUES (inputName, inputValue);)
  
  const acctData = req.body;

  try {
    const account = await db('accounts').insert(acctData);
    //TODO: see if you can add if statements for what returns here. Conditionals...name and budget required...maybe middleware later during class. Name must be unique. Budget must be a number
    res.status(201).json(account);
  }catch(err) {
    res.status(500).json({
      message: "There's been a problem adding new account.",
      err
    });
  }
})

//PUT

router.put('/:id', async (req, res) => { //*PUT existing row (UPDATE Accounts SET name/budget = Value WHERE id = i;)

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

router.delete('/:id', async (req, res) => { //*DELETE existing row (DELETE FROM Accounts WHERE id = i;)
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

module.exports = router;