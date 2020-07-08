const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{
        type : String
    },
	 body:{
        type : String
    },
	categories:[
		{
			type : mongoose.SchemaTypes.ObjectId,
		//看他Category关联的是哪个模型
		ref:'Category'}
		
	]
},{
	timestamps:true			//设置时间戳
})

module.exports = mongoose.model('Article',schema)