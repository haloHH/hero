const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{
		type:String
		},
	//里面可能有多个广告
	items:[
		{
			image:{type:String},
			url:{ type:String }
		}
	]
	
})

module.exports = mongoose.model('Ad',schema)