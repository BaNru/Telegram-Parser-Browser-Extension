"use strict";

var DATA = {messages : []};

/*
 * Получаем данные из localstorage
 */
chrome.storage.local.get(function (result) {
	DATA = result;
	renderPage();
});

/*
 * следим за localstorage
 */
chrome.storage.onChanged.addListener(function(e) {
	chrome.storage.local.get(function(result) {
		DATA = result;
		renderPage();
	});
});


function renderPage(){
	let html = '';
	DATA.messages.forEach(el=>{
		html += `<div>
			<img src="${el.img}">
			<p>${el.text}</p>
		</div>`;
	})
	document.querySelector('div').innerHTML = html;

	document.querySelector('h1').textContent = 'Парсер TG ' + DATA.messages.length;
}
