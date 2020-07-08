const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{ type : String },
	banner:{ type : String },
	url:{type : String},
	//一个英雄可能有两个定位
	categories: [
	  {
	    type: mongoose.SchemaTypes.ObjectId,
	    ref: 'Category'
	  }
	],
	partners:[{
		video:{type:mongoose.SchemaTypes.ObjectId,ref:'Video'},
		description:{ type:String}
	}]
	
})

module.exports = mongoose.model('Video',schema,'videoes')