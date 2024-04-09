const {validationResult}=require('express-validator')
const userService = require('../service/user-service')


class authController{
    async registration(req,res,next){
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({massage:'Ошибка при регистрации',errors})
            }
            const{email,password}=req.body
            const userData=await userService.registration(email,password)

            return res.json(userData)

        } catch (e) {
            console.log(e)
            res.status(400).json({massage:'Registration error'})
        }
    }

    async login(req,res,next){
        // try {
        //     const {email,password}=req.body
        //     const user=await User.findOne({email})
        //     if(!user){
        //         return res.status(400).json({massage:`Пользователь ${email} не найден`})
        //     }
        //     const validPassword=bcrypt.compareSync(password,user.password)
        //     if(!validPassword){
        //         return res.status(400).json({massage:'Введен неверній пороль'})
        //     }
        //     const token=generateAccessToken(user._id,user.roles)
        //     return res.json({token})
        // } catch (e) {
        //     console.log(e)
        //     res.status(400).json({massage:'Login error'})
        // }
    }

    async activate(req,res,next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req,res){
        try {

            const users=await User.find()
            res.json(users)

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports=new authController()