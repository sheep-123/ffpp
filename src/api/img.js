const baseUrl = "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/";

const getImg = (url)=>{
	return baseUrl+url;
}

export default {
	home:{
		leftArrow:getImg('left.png'),
		littleSearch:getImg('小搜索.png'),
		seatrh:getImg('搜索.png'),
		scan:getImg('扫描.png'),
		dingwei:getImg('定位.png'),
		scan:getImg('扫描.png'),
		near:getImg('附近.png'),
		more:getImg('more.png'),
		pull:getImg('pull.png'),
		location:getImg('location.png'),
		hot:getImg('火花.png'),
		noHot:getImg('无火花.png'),
	},
	dynamic:{
		topArrow:getImg('topArrow.svg'),
		tips:getImg('tips.png'),
		reload:getImg('reload.svg'),
		close:getImg('close.png'),
		location:getImg('location.png'),
		cup:getImg('news/cup.png'),
		basketball:getImg('news/basketball.png')
	}
}
