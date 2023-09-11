const express = require('express')
const router = express.Router()
const db = require('../database/db')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
require('dotenv').config()

router.post(
  '/api/v1/users/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body
      console.log(email, password)

      // Si les champs sont invalides, on renvoie des erreurs
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      // Vérification si l'utilisateur existe déjà avec le même email
      const userExists = await new Promise((resolve, reject) => {
        db.query(
          'SELECT * FROM users WHERE email = ?',
          [email],
          (err, results) => {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve(results.length > 0)
            }
          },
        )
      })

      if (userExists) {
        return res.status(409).json({ error: 'Cet utilisateur existe déjà' })
      }

      // Hachage du mot de passe avec bcrypt
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // Insertion de l'utilisateur dans la base de données
      const insertResult = await new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve(result)
            }
          },
        )
      })

      res.status(201).json({ userId: insertResult.insertId, email })
    } catch (error) {
      console.error(error)
      res.status(500).send('Erreur serveur')
    }
  },
)

module.exports = router
