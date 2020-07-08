
	//资源中间件
module.exports = options=>{
    return async(req,res,next)=>{
		const modelName = require('inflection').classify(req.params.resource)
		// const model = require(`../../models/${MODEL_NAME}`);
  // 为什么不使用 const   router 会访问不到model 所以挂载到req上
		 req.Model = require(`../models/${modelName}`)
		next()
	}
}