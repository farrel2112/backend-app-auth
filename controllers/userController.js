const db = require('../database/db')

const getUsers = (req, res) => {
  const query = 'SELECT * FROM users'
  db.query(query, (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.status(200).json(results)
    }
  })
}

module.exports = getUsers
