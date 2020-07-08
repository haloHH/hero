const mongoose = require('mongoose')
 const bcrypt = require('bcrypt')
const schema = new mongoose.Schema({
	username:{
		type:String
		},
	password:{
		type:String,
		//有这个属性后，编辑的密码就不会被加载出来了
		select:false,
		// 自定义如何修改和保存
		// val  原来的密码值   hashSync使密码散列，值越高越耗时
		set(val){
			return bcrypt.hashSync(val,10)
		}
	}
	
	
})

module.exports = mongoose.model('AdminUser',schema)