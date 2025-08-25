const UniPackageOptimization = require('subpackage-optimize');
const pro = process.env.NODE_ENV === 'production'; // 判断生产环境
module.exports = {
	configureWebpack: config => {
	    // 微信小程序打包优化
	    // 需要其他平台小程序打包优化增加判断就可以了
	    if(process.env.UNI_PLATFORM === "mp-weixin" && pro) {
	    	config.plugins.push(new UniPackageOptimization(['components'], []))
	    }
	}
}
