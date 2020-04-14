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

async function handleRequest(request) {
	try{
		let response = await fetch(variantURL);
		let data = await response.json();
		let variantURLs = data["variants"];
		console.log(variantURLs);

		let returnURL = await fetch(variantURLs[getRandomInt(2)]);
		let returnContent = await returnURL.text();
		console.log(returnContent);


		return new Response(returnContent, {
		    headers: { 'content-type': 'text/html' },
		  })



		// return Response.redirect(variantURLs[getRandomInt(2)], 302);
	}
	catch (err){
		console.log('fetch failer', err)
	}
}



function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max))
}



const testURL = ['https://www.google.com', 'https://github.com/AnthonyTsui']
const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants'

