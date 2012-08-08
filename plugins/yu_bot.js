function yubot(body, chat){
	body = body.replace(/@[Yy]u_[Bb]ot/, "");
	while(body.match(/@[Yy]u_[Bb]ot/)){
		body = body.replace(/@[Yy]u_[Bb]ot/, "");
	}
	var ret = "[YuBot]";
	if(body.match(/やっほー/))
	{
		ret = ret + "やっほー！";
	}
	else if(body.match(/時報/))
	{
		ret = ret + "にーっこにっこどーが♪";
	}
	else if(body.match(/ぼかなまくん/))
	{
		ret = ret + "＼ボクぼかなまくん！！／";
	}
	else if(body.match(/とにかく(わら|笑)って/))
	{
		ret = ret + "みらいオレンジ！（・∀・）";
	}
	else if(body.match(/タグ検索「(.+?)」/))
	{
		getXML("http://www.nicovideo.jp/tag/" + encodeURIComponent(RegExp.$1) + "?rss=2.0", function(xmldom){
			if(xmldom){
				var description = xmldom.getElementsByTagName("description")[0].text;
				var tag = description.match(/タグ「(.+)」/)[1];
				var num = description.match(/全 ([0-9\,]+) 件/)[1];
				ret = ret + "「" + tag + "」が付いてる動画は" + (num == 0 ? "一つもないよ！" : num + "個あるよ");
			}
		});
	}
	else if(body.match(/[ｗw]{3,}/))
	{
		ret = ret + "草、生やしすぎじゃない？";
	}
	else
	{
		ret = ret + "……？";
	}

	return ret;
}

addPlugin("YuBot", yubot, /@[Yy]u_[Bb]ot/);