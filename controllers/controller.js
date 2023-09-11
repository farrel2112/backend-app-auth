const express = require('express')
const router = express.Router()
const db = require('../database/db')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
require('dotenv').config()

router.post(
  'api/v1/users/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
  ],
  (req, res) => {
    const { email, password } = req.body

    // Si les champs sont invalides on renvoie des erreurs
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    // vérification si l'utilisateur existe déjà avec le même email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Erreur serveur')
      }

      if (results.length > 0) {
        return res.status(409).json({ error: 'Cet utilisateur existe déjà' })
      }

      // hachage du mot de passe avec bcrypt
      const saltRounds = 10
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Erreur serveur')
        }

        // insertion de l'utilisateur dans la base de données
        db.query(
          'INSERT INTO users ( email, password) VALUES ( ?, ?)',
          [email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error(err)
              res.status(500).send('Erreur serveur')
            } else {
              res.status(201).json({ userId: result.insertId, email })
            }
          },
        )
      })
    })
  },
)
