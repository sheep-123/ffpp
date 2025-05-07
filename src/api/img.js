const baseUrl = "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/";

const templateUrl = "/static/templateImage/"

const getImg = (url) => {
	return baseUrl + url;
}

const getTemplateImg = (url) => {
	return templateUrl + url;
}

export default {
	home: {
		leftArrow: getImg('left.png'),
		littleSearch: getImg('小搜索.png'),
		seatrh: getImg('搜索.png'),
		scan: getImg('扫描.png'),
		dingwei: getImg('定位.png'),
		scan: getImg('扫描.png'),
		near: getImg('附近.png'),
		more: getImg('more.png'),
		pull: getImg('pull.png'),
		location: getImg('location.png'),
		hot: getImg('火花.png'),
		noHot: getImg('无火花.png'),
		changdi: getTemplateImg('home/changdi.png'),
		huodong: getTemplateImg('home/huodong.png'),
		saishi: getTemplateImg('home/saishi.png'),
		zhangzhao: getTemplateImg('home/zhangzhao.png'),
		caption	: getTemplateImg('home/caption.png'),
		sitemark: getTemplateImg('home/sitemark.png'),
	},
	dynamic: {
		topArrow: getImg('topArrow.svg'),
		tips: getImg('tips.png'),
		reload: getImg('reload.svg'),
		close: getImg('close.png'),
		location: getImg('location.png'),
		cup: getImg('news/cup.png'),
		Frie: getImg('news/red_fire.png'),
		collectEd: getImg('news/yellow_star.png'),
		basketball: getImg('news/basketball.png'),
		noFrie: getImg('frie.svg'),
		collect: getImg('collect.svg'),
		comment: getImg('comment.svg'),
	}
}
