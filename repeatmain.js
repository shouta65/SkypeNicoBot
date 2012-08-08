// Skype ChatPush func
function Skype_MessageStatus(msg, status){
	if(status == skype.Convert.TextToChatMessageStatus('RECEIVED') || status == skype.Convert.TextToChatMessageStatus('SENDING')){
		var user = msg.FromDisplayName;
		var body = msg.Body.replace(/[\r\n]/g," ");
		var chat = msg.Chat;

		var mes = "";

		if(body.match(/Bot_Said/)) return;
		if(body.match(/:がファイル\".*\"を送信しました/)) return;
		if(body.match(/のコンピュータ上にあるトレンドマイクロのセキュリティソフト/)) return;
		WScript.Echo(user + ':' + body);
		
		for(var plugin in plugins_regex){
			if(plugins_regex[plugin].test(body)){
				WScript.Echo('Match Plugin:' + plugin);
				var ret = plugins_func[plugin](body, chat);
				if(ret != "") chat.sendMessage(ret);
			}
		}
	}
}

// NicoLive funcs
function getXML(url, callback)
{
	var xmlhttp = createXMLHttpRequest();
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("User-Agent","SkypeChat2Nicovideo 1.0.0");
	xmlhttp.send("");
	callback(xmlhttp.responseXML);
}
function getTEXT(url, callback)
{
	var xmlhttp = createXMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.setRequestHeader("User-Agent","SkypeChat2Nicovideo 1.0.0");
	xmlhttp.send("");
	callback(xmlhttp.responseText);
}
function getETC(url, callback)
{
	var xmlhttp = createXMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.setRequestHeader("User-Agent","SkypeChat2Nicovideo 1.0.0");
	xmlhttp.send("");
	callback(xmlhttp.responseText);
}

function createXMLHttpRequest(){
	var progIDs = [
		"Msxml2.XMLHTTP.6.0",
		"Msxml2.XMLHTTP.5.0",
		"Msxml2.XMLHTTP.4.0",
		"Msxml2.XMLHTTP.3.0",
		"Msxml2.XMLHTTP",
		"Microsoft.XMLHTTP"
	]; 
	for(var i=0,l=progIDs.length; i<l; i++){
		try{
			return new ActiveXObject(progIDs[i]);
		}catch(e){
			if(i==l-1){
				throw e;
			}
		}
	}
}

function clen(a){
	if((a-0)<10) a="0"+a;
	return a;
}

// Source Getter
function getPluginSrc(FName, FSO){
        var stream = FSO.OpenTextFile(FName);
        var Buff = stream.ReadAll();
        stream.Close(); 
        return Buff;
}

// Plugin Array
var plugins_regex = {};
var plugins_func = {};

// Plugin API
function addPlugin(pname, pfunc, pregex){
	plugins_func[pname] = pfunc;
	plugins_regex[pname] = pregex;
	WScript.Echo("Load Plugin:" + pname);
}

// INIT 
var fso = new ActiveXObject("Scripting.FileSystemObject");

//Plugin Load
var dir = fso.GetFolder('.\\plugins');
var files = new Enumerator(dir.Files);
for(; !files.atEnd(); files.moveNext()){
	var filename = files.item().Name;
	WScript.Echo("Loading: " + filename);
	eval(getPluginSrc('.\\plugins\\' + filename, fso));
}

// MAIN
var skype = new ActiveXObject('Skype4COM.Skype');
WScript.ConnectObject(skype, 'Skype_');
skype.Attach();

while(true){
	WScript.Sleep(1000);
}