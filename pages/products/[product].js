import {getAllProducts, getProductByHandle} from "../../libs/shopify";
import {formatter} from '../../libs/helper'

export default function ProductPage({product}) {
    const {altText, originalSrc} = product.images.edges[0].node

    const price = product.priceRange.minVariantPrice.amount

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <div className="flex flex-col-reverse">
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                                <button id="tabs-1-tab-1"
                                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                        aria-controls="tabs-1-panel-1" role="tab" type="button">
                                    <span className="sr-only"> Angled view </span>
                                    <span className="absolute inset-0 rounded-md overflow-hidden">
                <img
                    src={originalSrc}
                    alt={altText}
                    className="w-full h-full object-center object-cover"/>
              </span>
                                    <span
                                        className="ring-transparent absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                                        aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>

                        <div className="w-full aspect-w-1 aspect-h-1">
                            <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabIndex="0">
                                <img
                                    src={originalSrc}
                                    alt={altText}
                                    className="w-full h-full object-center object-cover sm:rounded-lg"/>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">{formatter.format(price)}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div className="text-base text-gray-700 space-y-6">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <form className="mt-6">
                            <div className="mt-10 flex sm:flex-col1">
                                <button type="submit"
                                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                                    Add to bag
                                </button>
                            </div>
                        </form>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">Additional details</h2>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const products = await getAllProducts()

    const paths = products.map(item => {
        const product = String(item.node.handle)

        return {
            params: {product}
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const product = await getProductByHandle(params.product)

    return {
        props: {
            product
        },
    }
}