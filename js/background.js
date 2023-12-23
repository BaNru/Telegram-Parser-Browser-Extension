 /**
 * Установка и обновление расширения
 */
chrome.runtime.onInstalled.addListener(details => {
	if (details.reason == "install") {
		// Открытие сайта после установки
		// chrome.tabs.create({ url: 'https://kaspi.kz/shop/shymkent/c/categories/' });
		chrome.storage.local.set({messages : []});
	}
	if (details.reason == "update"){
		// if(Number(details.previousVersion) <= 1){

		// }
	}
});


chrome.action.setPopup({popup:''});  //disable browserAction's popup
chrome.action.onClicked.addListener(()=>{
    chrome.tabs.create({url:'html/index.html'});
});


// chrome.declarativeNetRequest.getDynamicRules(previousRules => {
//     const previousRuleIds = previousRules.map(rule => rule.id);
//     chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: previousRuleIds, addRules: [rules]});
// });

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse)=>{
		var tabID = sender.tab.id;
		// Получение списка товара
		if (request.hasOwnProperty("get")){
			console.log(request.get);

			return true;
		}
		return false;
	}
);