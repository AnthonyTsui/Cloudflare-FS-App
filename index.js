//----ANTHONY TSUI-------
//-----------------------
//CLOUDFLARE SUMMER 2020 INTERNSHIP FULL-STACK ASSESSMENT

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
// async function handleRequest(request) {
//   return new Response('Hello worker!', {
//     headers: { 'content-type': 'text/plain' },
//   })
// }

// async function handleRequest(request) {
//   return Response.redirect(testURL[getRandomInt(2)], 302);
// }





class ElementHandler {
	constructor(variantNumber){
		this.variantNumber = variantNumber;
	}
	element(element) {
	  	if (element.tagName == 'title'){
	  		element.setInnerContent('Anthony Tsui');
	  	}
	  	else if (element.tagName == 'h1'){
	  		element.setInnerContent('Anthony Tsui Variant ' + (this.variantNumber+1))
	  	}
	  	else if(element.tagName == 'p'){
	  		element.setInnerContent('This is variant ' + (this.variantNumber==0 ? 'one' : 'two') + " of Anthony's take home project!")
  		}
  		else if(element.tagName == 'a'){
  			element.setInnerContent('Go to my repo!')
  			element.setAttribute('href', 'https://github.com/AnthonyTsui/Cloudflare-FS-App')
  		}
  }  
}



async function handleRequest(request) {
	try{
		let response = await fetch(variantURL);
		let data = await response.json();
		let variantURLs = data["variants"];

		const res = await fetch(variantURLs[0]);

		let variantNumber = getRandomInt(2)

		let returnURL = await fetch(variantURLs[variantNumber]);//


		const rewriter = new HTMLRewriter()
			.on('title', new ElementHandler(variantNumber))
			.on('h1#title', new ElementHandler(variantNumber))
			.on('p#description', new ElementHandler(variantNumber))
			.on('a#url', new ElementHandler(variantNumber));

		return rewriter.transform(returnURL);
	}
	catch (err){
		console.log('fetch failer', err)
	}
}

function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max))
}


const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants'

