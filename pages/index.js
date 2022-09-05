import {getAllProducts} from "../libs/shopify"
import ProductCard from "../Components/ProductCard";

export default function Home({ products }) {
    return (
        <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Products
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <ProductCard key={product.node.id} item={product}></ProductCard>
                ))}
            </div>
        </main>
    )
}

export async function getStaticProps() {
    const products = await getAllProducts()

    return {
        props: {products},
    }
}