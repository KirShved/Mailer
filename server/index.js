require('dotenv').config()
const exppress= require('express')
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const authRouter=require('./routes/authRouter')

const app=exppress()

app.use(exppress.json())
app.use('/auth',authRouter)

const start=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT,()=>console.log(`Server start on PORT:${PORT}`))
    } catch (e) {
       console.log(e) 
    }
}

start()