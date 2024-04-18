import { client, writeClient } from "../client";

export async function fetchAllProducts(){
    const data = await client.fetch(`*[_type == "products"]{
        _id,
        productname,
        "slug": producturl.current,
        price,
        stock,
        "catname": category->categorytitle,
        "catslug": category->categoryurl.current,
        "image": productimage.asset->url
    }`)
    return data
}

// funksjon som henter ett produkt basert på en slug:
export async function fetchProductsBySlug(slug) {
    const data = await client.fetch(`*[_type == "products" && producturl.current == $slug]{
        _id,
        productname,
        description,
        "categoryname": category->categorytitle,
        "catslug": category->categoryurl.current,
        "image": productimage.asset->url,
        price,
        stock,
        reviews
    }`,{slug})
    return data
}

// Funksjon som tar imot imformasjon og oppdaterer reviews arrayeb i et produkt.

export async function updateReview(productid, reviewer, comment, rating) {
    const result = await writeClient
    .patch(productid).setIfMissing({reviews: []})
    .append("reviews", [{reviewer: reviewer, comment: comment, rating: rating}])
    .commit({autoGenerateArrayKeys: true})
    .then(()=>{return "Success"})
    .catch((error)=> {return "Error: " + error.message})

    return result
}