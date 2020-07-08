//写成函数，这样想调用或者配置比较方便
//登录校验中间件
module.exports = options=>{
	const jwt = require('jsonwebtoken')
	const AdminUser = require('../models/AdminUser')
	const assert = require('http-assert')
    return async(req,res,next)=>{
		const token = String(req.headers.authorization || '').split(' ').pop()
		assert(token,401,'请提供jwt token')
		//在中间件里面是访问不到路由里面的app，这里需要req.app来取，不然就需要引入各种才能取到这个app
		const {id} = jwt.verify(token,req.app.get('secret'))
		//为了使以后的接口都能用，就需要挂载到req或者res上面
		// const user = await AdminUser.findById(id)
		assert(id,401,'请提供jwt token')
		req.user = await AdminUser.findById(id)
		assert(req.user,401,'请先登录')
		console.log(req.user)
		await next()
	}
}