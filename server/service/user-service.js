const uuid=require('uuid')
const User=require('../models/User')
const Role=require('../models/Role')
const bcrypt=require('bcryptjs')
const mailService = require('../service/mail-service')
const tokenService=require('../service/token-service')
const UserDto=require('../dtos/user-dto')

class UserService{
    async registration(email,password){
        
        const candidate=await User.findOne({email})
        if(candidate){
            return res.status(400).json({massage:'Пользователь с таким email уже существует'})
        }
        const hashPassword=await bcrypt.hashSync(password,7)
        const userRole=await Role.findOne({value:'USER'})

        const activationLink=uuid.v4()

        const user=await User.create({email,password:hashPassword,roles:[userRole.value],activationLink})
        // await user.save()
        await mailService.sendActivationMail(email,`${process.env.API_URL}/auth/activate/${activationLink}`)
        
        const userDto=new UserDto(user) // id, email, isActivated
        const token=tokenService.generateAccessToken({...userDto})
        return {token,user: userDto}
    }

    async activate(activationLink){
        const user=await User.findOne({activationLink})
        if(!user){
            throw new Error('Неккоректная ссылка активации')
        }
        user.isActivated=true
        await user.save()
    }

}

module.exports=new UserService()
