// Create context menus
chrome.runtime.onInstalled.addListener(function() {
	var contexts = [ "selection" ];

	var selection_order = chrome.contextMenus.create({
		"id" : "selection_order",
		"title" : "Caesar Order #%s",
		"contexts" : contexts
	});

	var selection_user = chrome.contextMenus.create({
		"id" : "selection_user",
		"title" : "Caesar User %s",
		"contexts" : contexts
	});

	var selection_tryout = chrome.contextMenus.create({
			"id" : "selection_tryout",
			"title" : "Tryout #%s",
			"contexts" : contexts
	});
});

// Listeners for Context Menus
var contextListeners = function(info, tab) {
	console.log(info);
	console.log(tab);

	switch(info.menuItemId) {
		case 'selection_order':
			var order_id = info.selectionText.replace(/\D/g,'');
			var url = "https://admin.jackthreads.com/JITRAdmin/CsrAdmin?order_id=" + encodeURIComponent(order_id); 
			break;
		case 'selection_user':
			selection = info.selectionText;
			if(selection.indexOf('@') != -1) {
				user_id = selection;
			} else {
				user_id = selection.replace(/\D/g,'');
			}
			var url = "https://admin.jackthreads.com/JITRAdmin/CsrAdmin?user_id=" + encodeURIComponent(user_id); 
			break;
		case 'selection_tryout':
			var tryout_id = info.selectionText.replace(/\D/g,'');
			var url = "https://admin.jackthreads.com/JITRAdmin/TryoutAdmin/" + encodeURIComponent(tryout_id); 
			break;
	}

	window.open(url, '_blank');
}

chrome.contextMenus.onClicked.addListener(contextListeners);

// Page Action (staging servers)
var pageActions = function(tabId, changeInfo, tab) {
	console.log(tabId);
	console.log(changeInfo);
	console.log(tab);

	var url = tab.url;

	// Only show for *.jackthreads.com that is not www.jackthreads.com
	if(url.indexOf('.jackthreads.com') != -1) {
		if(url.indexOf('www.jackthreads.com') == -1) {
			chrome.pageAction.show(tabId);
		}
	}
}

chrome.tabs.onUpdated.addListener(pageActions);