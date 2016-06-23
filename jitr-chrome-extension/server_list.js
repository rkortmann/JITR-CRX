var production_servers = [
	{
		'name' : 'Admin',
		'server' : 'admin',
	},
	{
		'name' : 'API',
		'server' : 'api'
	}
];

var staging_servers = [
	{
		'name' : 'Stage 1',
		'server' : 'stage-jitr-api-01-jt',
	},
	{
		'name' : 'Stage 2',
		'server' : 'stage-jitr-api-02-jt',
	},
	{
		'name' : 'Stage 3',
		'server' : 'stage-jitr-api-03-jt',
	}
];

var dev_servers = [
	{
		'name' : 'Development (Local)',
		'server' : 'dev.jitr',
	}
];

function buildServerList(servers) {
	var list = document.createElement('ul');

	for(var i = 0; i < servers.length; i++) {
		var server = servers[i];

		var li = document.createElement('li');
		var a = document.createElement('a');
		a.setAttribute('class', 'internal');
		a.setAttribute('href', '#');
		a.appendChild(document.createTextNode(server.name));

		var external_a = document.createElement('a');
		external_a.setAttribute('class', 'external');
		external_a.appendChild(document.createTextNode('new tab'));
		setUrlExternal(external_a, server);

		(function(s) {
			$(a).click(function() {
				serverRedirect(s);
			});
		})(server.server);

		var div = document.createElement('div');
		setUrlText(div, server);

		li.appendChild(external_a);
		li.appendChild(a);
		li.appendChild(div);
		list.appendChild(li);
	}

	var container = document.getElementById('container');
	container.appendChild(list);
}

function serverRedirect(server) {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		if(tabs.length) {
			var url = tabs[0].url;

			var parsed_url = parseUrl(url);
			var new_url = parsed_url.protocol + '://' + server + parsed_url.path;

			chrome.tabs.update({url : new_url});
			window.close();
		}
	});
}

function setUrlText(element, server) {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		if(tabs.length) {
			var url = tabs[0].url;

			var parsed_url = parseUrl(url);
			var new_url = parsed_url.protocol + '://' + server.server + '.jackthreads.com';

			$(element).text(new_url);
		}
	});
}

function setUrlExternal(element, server) {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		if(tabs.length) {
			var url = tabs[0].url;

			var parsed_url = parseUrl(url);
			var new_url = parsed_url.protocol + '://' + server.server + parsed_url.path;

			$(element).attr('href', new_url);
			$(element).attr('target', '_blank');
		}
	});
}

function parseUrl(url) {
	// http or https
	var pre_index = url.indexOf('://');
	var protocol = 'http';
	if(pre_index != -1) {
		protocol = url.substring(0, pre_index);
	}

	// preserve the path
	var post_index = url.indexOf('.jackthreads.com');
	var path = url.substring(post_index);

	return {
		protocol : protocol,
		path : path
	};
}

function reset() {
	buildServerList(production_servers);
	buildServerList(staging_servers);
	buildServerList(dev_servers);
}


$(document).ready(reset);