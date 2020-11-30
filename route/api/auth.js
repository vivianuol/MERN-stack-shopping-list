const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../model/User');

// @route POST api/auth
// @desc  Autheticate user
// @access Public

router.post('/', (req, res) => {

    const { email, password } = req.body;
    
    // simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then( user => {
            if (!user) return res.status(401).json({ msg: 'User not exists' }); 

        // Validate password  
        // 第一个是用户输入，第二个是数据库中的user.password
        bcrypt.compare(password, user.password)
            .then( match => {
                if (!match) return res.status(401).json({
                    msg: 'Invalid password.'
                })

                jwt.sign(
                    {id: user.id },
                    'cao',
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token: token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }

                )

            })

        })

});

 // @route GET api/auth/user
 // @desc  Get user data
 // @access Private
 router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
 })
 // .select('-password') means disregard password, don't show password


module.exports = router;