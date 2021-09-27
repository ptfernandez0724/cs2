const jwt = require('jsonwebtoken');
const user = require('./models/user');

const secret = 'Capstone2';

// create Access Token
module.exports.createAccessToken = (user) => {

    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, secret, {})

}

// token verification
module.exports.verify = (req, res, next) => {

	let token = req.headers.authorization;


	if(typeof token !== "undefined"){
		console.log(token);

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {

			if(err){
				return res.send( {auth: "failed"} )
			}else{
				next()
			}
		})
	} else {

		return res.send({auth: "failed"});
	}
}

// token decryption

module.exports.decode = (token) => {


	if(typeof token !== "undefined"){


		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if(err){
				return null;
			}else{

				return jwt.decode(token, {complete:true}).payload
			}
		})

	} else {
		return null;
	}
}