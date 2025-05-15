const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1]; // since the word "bearer" is present with the token in the authorization header we are splitting using split and taking only the token
        const verifiedtoken = jwt.verify(token, "bookmyshow") // verifying using the secret keyword
        // with this verified token we can get the userId and can access all of his details
        req.body.userId = verifiedtoken.userId // setting up the userId taken form the jwt to the req body
        next()
    } catch(error){
        res.status(401).send('error while verifing the user', error)
        console.log('error while verifing the user', error)
    }
}