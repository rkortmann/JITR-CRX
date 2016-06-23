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

// Listeners for all
chrome.contextMenus.onClicked.addListener(function(info, tab) {
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
});