const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2021-07/graphql.json`

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    }

    try {
        return await fetch(URL, options).then(response => {
            return response.json()
        })
    } catch (error) {
        throw new Error("Products not fetched")
    }
}

export async function getAllProducts() {
    const query = `
  {
  products(first: 25) {
    edges {
      node {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first:1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
}
`
    const response = await ShopifyData(query)

    return response.data.products.edges ? response.data.products.edges : []
}

export async function getProductByHandle(handle){
    const query = `
 {
  product(handle: "${handle}"){
    title
    description
    tags
    priceRange{
      minVariantPrice {
        amount
      }
    }
    images(first: 5) {
    edges {
      node {
        originalSrc
        altText
      }
    }
  }
    updatedAt
  }
}`

    const response = await ShopifyData(query, handle)

    return response.data.product ? response.data.product : []
}