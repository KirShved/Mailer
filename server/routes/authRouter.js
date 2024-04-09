const Router=require('express')
const router=new Router()
const controller=require('../controller/authController')
const {check}=require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware=require('../middleware/roleMiddleware')

router.post('/registration',
    [check('email','Имя пользователя не может быть пустым').notEmpty(),
    check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4,max:10})],
    controller.registration)
router.post('/login',controller.login)
router.get('/activate/:link',controller.activate)
router.get('/users',roleMiddleware(['ADMIN','USER']),controller.getUsers)


module.exports=router