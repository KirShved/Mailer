const jwt = require('jsonwebtoken');


class TokenService{

    generateAccessToken=(id,roles)=>{
        return jwt.sign({id,roles},
                process.env.SECRET_KEY,
                {expiresIn:'24h'})
    }

    // generateAccessToken(id,roles) {

    //     return jwt.sign({id,roles}, process.env.SECRET_KEY, {expiresIn: '24h'})
    // }

}

module.exports=new TokenService()