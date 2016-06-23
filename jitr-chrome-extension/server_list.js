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

function buildServerList(servers) {
	var list = document.createElement('ul');

	for(var i = 0; i < servers.length; i++) {
		var server = servers[i];

		var li = document.createElement('li');
		var a = document.createElement('a');
		a.setAttribute('href', '#');
		a.appendChild(document.createTextNode(server.name));
		(function(s) {
			$(a).click(function() {
				serverRedirect(s);
			});
		})(server.server);

		var div = document.createElement('div');
		attachNewUrl(div, server);

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

function attachNewUrl(element, server) {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		if(tabs.length) {
			var url = tabs[0].url;

			var parsed_url = parseUrl(url);
			var new_url = parsed_url.protocol + '://' + server.server + parsed_url.path;

			$(element).text(new_url);
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
}


$(document).ready(reset);