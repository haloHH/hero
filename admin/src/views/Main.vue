<template>
	<el-container style="height: 200vh;">
		<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<!--router这样点击才会跳转  :default-openeds="['1', '3']"  打开多少个    unique-opened一次只能打开一个  :default-active="$route.path"  根据路由来高亮    -->
			<el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-message"></i>内容管理</template>

					<el-menu-item-group>
						<template slot="title">物品</template>
						<el-menu-item index="/items/create">新建物品</el-menu-item>
						<el-menu-item index="/items/list">物品列表</el-menu-item>
					</el-menu-item-group>

					<el-menu-item-group>
						<template slot="title">英雄</template>
						<el-menu-item index="/heroes/create">新建英雄</el-menu-item>
						<el-menu-item index="/heroes/list">英雄列表</el-menu-item>
					</el-menu-item-group>

					<el-menu-item-group>
						<template slot="title">文章</template>
						<el-menu-item index="/articles/create">发表文章</el-menu-item>
						<el-menu-item index="/articles/list">文章列表</el-menu-item>
					</el-menu-item-group>

					<el-menu-item-group>
						<template slot="title">视频</template>
						<el-menu-item index="/videoes/create">发表视频</el-menu-item>
						<el-menu-item index="/videoes/list">视频列表</el-menu-item>
					</el-menu-item-group>



				</el-submenu>


				<el-submenu index="2">
					<template slot="title"><i class="el-icon-message"></i>运营管理</template>


					<el-menu-item-group>
						<template slot="title">广告位</template>
						<el-menu-item index="/ads/create">新建广告位</el-menu-item>
						<el-menu-item index="/ads/list">广告位列表</el-menu-item>
					</el-menu-item-group>

				</el-submenu>

				<el-submenu index="3">
					<template slot="title"><i class="el-icon-message"></i>系统设置</template>
					<el-menu-item-group>
						<template slot="title">分类</template>
						<el-menu-item index="/categories/create">新建分类</el-menu-item>
						<el-menu-item index="/categories/list">分类列表</el-menu-item>
					</el-menu-item-group>

					<el-menu-item-group>
						<template slot="title">管理员</template>
						<el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
						<el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
					</el-menu-item-group>


				</el-submenu>
			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
						<el-dropdown-item><router-link tag="span" to="/login">退出</router-link></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>王小虎</span>
			</el-header>

			<el-main>
				<!-- 在这里，我们编辑组件和新建组件用的是同一个，为了区分，这里需要加个key，不然会出现数据重载的情况 -->
				<router-view :key="$route.path"></router-view>

			</el-main>
		</el-container>
	</el-container>
</template>
<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>

<script>
	export default {
		data() {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item)
			}
		},
		methods:{
		
		}
	};
</script>
