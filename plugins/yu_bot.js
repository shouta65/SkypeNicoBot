function yubot(body, chat){
	body = body.replace(/@[Yy]u_[Bb]ot/, "");
	while(body.match(/@[Yy]u_[Bb]ot/)){
		body = body.replace(/@[Yy]u_[Bb]ot/, "");
	}
	var ret = "[YuBot]";
	if(body.match(/����ف[/))
	{
		ret = ret + "����ف[�I";
	}
	else if(body.match(/����/))
	{
		ret = ret + "�Ɂ[�����ɂ����ǁ[����";
	}
	else if(body.match(/�ڂ��Ȃ܂���/))
	{
		ret = ret + "�_�{�N�ڂ��Ȃ܂���I�I�^";
	}
	else if(body.match(/�Ƃɂ���(���|��)����/))
	{
		ret = ret + "�݂炢�I�����W�I�i�E�́E�j";
	}
	else if(body.match(/�^�O�����u(.+?)�v/))
	{
		getXML("http://www.nicovideo.jp/tag/" + encodeURIComponent(RegExp.$1) + "?rss=2.0", function(xmldom){
			if(xmldom){
				var description = xmldom.getElementsByTagName("description")[0].text;
				var tag = description.match(/�^�O�u(.+)�v/)[1];
				var num = description.match(/�S ([0-9\,]+) ��/)[1];
				ret = ret + "�u" + tag + "�v���t���Ă铮���" + (num == 0 ? "����Ȃ���I" : num + "�����");
			}
		});
	}
	else if(body.match(/[��w]{3,}/))
	{
		ret = ret + "���A���₵��������Ȃ��H";
	}
	else
	{
		ret = ret + "�c�c�H";
	}

	return ret;
}

addPlugin("YuBot", yubot, /@[Yy]u_[Bb]ot/);