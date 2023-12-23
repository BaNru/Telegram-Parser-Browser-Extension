"use strict";

var DATA = {messages : []};

/*
 * Сохранение данныйх
 */
function saveDATA(fn) {
	chrome.storage.local.set(
		DATA,
		function () {
			if (fn) { fn(); }
		}
	);
}

/*
 * Получаем данные из localstorage
 */
chrome.storage.local.get(function (result) {
	DATA = result;
});

/*
 * следим за localstorage
 */
chrome.storage.onChanged.addListener(function(e) {
	chrome.storage.local.get(function(result) {
		DATA = result;
	});
});



var BODY = document.querySelector('body'),
	OBSEconfig = {
		// attributes: true,
		childList: true,
		subtree: true,
		// characterData: true
	},
	BudyOBSERVER;

setTimeout(()=>{

	BudyOBSERVER = new MutationObserver(mutations => {

		document.querySelectorAll('.photo[data-mid][data-peer-id][data-timestamp]').forEach(el=>{
			let image = el.querySelector('img.media-photo');
			if(!image || !image.src)return;
			if( DATA.messages.find( item=> item.timestamp == el.dataset.timestamp) )return


			let height = image.naturalHeight;
			let width = image.naturalWidth;

			let canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
			canvas.width  = width;  // Set the width of the Canvas
			canvas.height = height;  // Set the height of the Canvas
			let ctx = canvas.getContext("2d");  // Get the "context" of the canvas
			ctx.drawImage(image, 0, 0, width, height);  // Draw your image to the canvas

			let text = ''
			el.querySelector('.message').childNodes.forEach(function(value){
				if(value.nodeType === Node.TEXT_NODE) {
					text += value.nodeValue.trim();
				}
			});

			let message = {
				mid : el.dataset.mid,
				peerid : el.dataset.peerId,
				timestamp: el.dataset.timestamp,
				img : canvas.toDataURL("image/jpeg"),
				text : text
			}


			DATA.messages.push(message);
		})
		saveDATA();


	})
	BudyOBSERVER.observe(BODY, OBSEconfig);

},3000)