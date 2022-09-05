import {getAllProducts} from "../../libs/shopify"

export default async function handler(req, res) {

    const products = await getAllProducts()

    return res.status(200).json({
        success: true,
        data: products
    });
}