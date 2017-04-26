/**
 * 工具区
 */
/********************************************/

var Utils = {};
(function(Utils) {
	var utilsData = {};
	//获取 数据
	Utils.getData = function(key) {
		if (Utils.isNull(key)) {
			return utilsData;
		} else {
			return utilsData[key];
		}
	};
	//设置数据
	Utils.setData = function(k, v, concat) {
		if (concat === 1) {
			if (Utils.isNull(utilsData[k])) {
				utilsData[k] = [];
			}
			utilsData[k].push(v);
			return utilsData[k];
		}
		utilsData[k] = v;
		return utilsData[k];
	};
	//判断数据是否存在
	Utils.isHaveKey = function(k) {
		if (Utils.isNull(utilsData[k])) {
			return false;
		} else {
			return true;
		}
	};
})(Utils)
/**
 * [isNull description] 判断 传入的 参数 是否是 空或 空字符串 或者为空数组,空对象
 * @return {Boolean} [description]
 */
Utils.isNull = function() {
	var args = arguments;
	var is = false;
	for (var i = 0; i < args.length; i++) {
		var temp = args[i];
		if (temp == null || temp == "") {
			is = true;
			break;
		}
		if (typeof temp === "object") {
			if (Array.isArray(temp)) {
				temp.length == 0 && (is = true);
				break;
			} else {
				Utils.isEmptyObject(temp) && (is = true);
				break;
			}
		}

	}
	return is;
};
//判断一个对象 是否是空对象
Utils.isEmptyObject = function(obj) {
	for (var key in obj) {
		return false;
	}
	return true;
};

Utils.parseURL = function(url) {
	var a = document.createElement('a');
	a.href = url;
	var obj = {
		source: url,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function() {
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^\/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/')
	};
	obj.rootpath = obj.protocol + "://" + obj.host + (obj.port == "" ? "" : (":" + obj.port)) + "/" + obj.segments[0] + "/";
	return obj;
};
 
module.exports =  Utils;