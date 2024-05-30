//do not prerender server-rendered on demand api
export const prerender = false;

//import API key from .env file
const secretAPIKey = import.meta.env.SNIPCART_SECRET_API + ":"

export async function GET({ params }) {
  //get product slug from params
  const { slug } = params
  try {
    //try to fetch product data from Snipcart API
    const result = await fetch("https://app.snipcart.com/api/products/" + slug, {
        headers: {
            //authorize the request with the imported API key
            "Authorization": "Basic "+ btoa(secretAPIKey),
            "Accept": "application/json"
        }
    })

    //if product response is OK
    return new Response(
      JSON.stringify(await result.json()), {
        status: 200,
      });

  } catch (error) {
    //if product response is NOT OK
    return new Response(
      JSON.stringify({error: error, slug: slug}), {
        status: 500,
      });
  }
}