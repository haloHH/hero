//在这里可以写在服务端里面给全局使用的东西

const express = require("express")

const app = express()

//给登录接口的校验密码用
app.set('secret','ads23sa21')

//允许跨域请求
app.use(require('cors')())

app.use(express.json())

//给admin前端进行静态托管
app.use('/admin',express.static(__dirname + '/admin'))
//给web前端进行静态托管到根路径
app.use('/',express.static(__dirname + '/web'))

//开放对在uploads路径下的静态文件
app.use('/uploads',express.static(__dirname+'/uploads'))



//这样在admin中就可以使用这个app了
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)
// require('./middleware/auth')(app)

app.listen(3000,()=>{
    console.log("running")
})