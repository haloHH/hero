module.exports = app=>{

  const express = require("express")
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')   //这个插件直接可以看存不存在
  // mergeParams:true   保留来自父路由器的req.params值。
  // 如果父对象和子对象具有冲突的参数名，则以子对象的值为准
	  // 不然获取不到路由里面的resource
  const router = express.Router({
	  mergeParams:true
  })
  
  //因为做了适用任何情况的CURD后,无法固定获取哪个模型,所以获取哪个应该写在方法里面
 // const Caregory = require('../../models/Category')

//新建
router.post('/',async(req,res)=>{
	
	// const modelName = require('inflection').classify(req.params.resource)
	// //加载相应的模型
	// const Model = require(`../../models/${modelName}`)
	
	//以下所有接口都有这种分别
	const model = await req.Model.create(req.body)
    // const model = await Caregory.create(req.body)
	
	res.send(model)
})

//通过id修改更新
router.put('/:id',async(req,res)=>{

    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
	res.send(model)
})


//找到该接口数据,进行渲染--分类列表
//进行接口是否有登录的验证，在中间多加一个中间件
router.get('/',async(req,res)=>{
	 // *inflection插件   inflection.classify( 'message_bus_properties' );=== 'MessageBusProperty' 
	 // 会把单词 复数 转换成 单数 因为mongoose中表名是单数  而接口中都是复数转一下子
	
	//populate('')  取出,关联什么东西 让它不只是一个数值,变成一个对象,通过对象取出想要的值
   const queryOptions = {}
   if(req.Model.modelName==='Category'){
	   queryOptions.populate = 'parent'
   }
	const items = await req.Model.find().setOptions(queryOptions).limit(100)
	res.send(items)
})

//通过点击编辑,进入到相应的页面
router.get('/:id',async(req,res)=>{
	
    const model = await req.Model.findById(req.params.id)
	res.send(model)
})

//通过id删除
router.delete('/:id',async(req,res)=>{

    const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
	res.send({
		success:true
	})
})

//登录校验中间件
	// const authMiddleWare = async(req,res,next)=>{
	// 	const token = String(req.headers.authorization || '').split(' ').pop()
	// 	assert(token,401,'请提供jwt token')
	// 	const {id} = jwt.verify(token,app.get('secret'))
	// 	//为了使以后的接口都能用，就需要挂载到req或者res上面
	// 	// const user = await AdminUser.findById(id)
	// 	assert(id,401,'请提供jwt token')
	// 	req.user = await AdminUser.findById(id)
	// 	assert(req.user,401,'请先登录')
	// 	console.log(req.user)
	// 	await next()
	// }
	const authMiddleWare = require('../../middleware/auth')
	

	//资源中间件
// 	const resourceMiddleWare = async(req,res,next)=>{
// 		const modelName = require('inflection').classify(req.params.resource)
// 		// const model = require(`../../models/${MODEL_NAME}`);
//   // 为什么不使用 const   router 会访问不到model 所以挂载到req上
// 		 req.Model = require(`../../models/${modelName}`)
// 		next()
//	}
const resourceMiddleWare = require('../../middleware/resource')

//父路由
//在路由中直接加中间件
//	const modelName = require('inflection').classify(req.params.resource)
	//const Model = require(`../../models/${modelName}`)
	
	// callback中定义的const let 在下一个callback中是无法访问的 要挂载到 req 或者 res 中
    app.use('/admin/api/rest/:resource',authMiddleWare(), resourceMiddleWare(),router)
	
	//multer  文件上传模块
	const multer = require('multer')
	const upload = multer({
		//dest  上传到哪里
		dest:__dirname + '/../../uploads'
	})//upload.single  表示单个文件的上传
	app.post('/admin/api/upload',authMiddleWare(), upload.single('file') ,async(req,res)=>{
		//加了upload   才有req.file
		const file = req.file
		
		file.url = `http://localhost:3000/uploads/${file.filename}`
		
		res.send(file)
	})
	
	//登录接口
	app.post('/admin/api/login',async(req,res)=>{
		//解构化赋值
		const {username,password} = req.body
		//1.根据用户名找用户
		//const AdminUser = require('../../models/AdminUser')
		const user = await AdminUser.findOne({
			//分别是数据库中的名字  ：   上面变量的名字   select('+password') 因为再模型设置select为false，就取不到，这里要加回来
			username:username}).select('+password')
			assert(user,422,'用户不存在')//直接可以替换下面的代码
			//上面代码的原理是让整个代码报错，抛出异常，让最下面的express错误函数去处理
			// if(!user){
			// 	return res.status(422).send({
			// 		message:'用户不存在'
			// 	})
			// }


		//2.校验密码
		//compareSync比较密码
		const isVaild =  require('bcrypt').compareSync(password,user.password)
		assert(isVaild,422,'密码错误')
		// if(!isVaild){
		// 	return res.status(422).send({
		// 		message:'密码错误'
		// 	})
		// }
		//3.返回token
		// const jwt = require('jsonwebtoken')
		const token = jwt.sign({
			id:user._id
			// _id:user._id,
			// username:user.username
		},app.get('secret'))

		//返回一个对象   token
		res.send({token})
	})

	//错误处理函数
	app.use(async(err,req,res,next)=>{
	console.log(err)
	res.status(err.statusCode || 500).send({
		message:err.message
	})
	})
}