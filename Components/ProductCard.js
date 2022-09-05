import {formatter} from '../libs/helper'
import Link from "next/link";

export default function ProductCard({item}) {
    const product = item.node

    const {altText, originalSrc} = item.node.images.edges[0].node

    const price = item.node.priceRange.minVariantPrice.amount

    return (
        <Link href={`/products/${product.handle}`}>
            <div className="group relative">
                <div
                    className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                        src={originalSrc}
                        alt={altText}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"/>
                            {product.title}
                        </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                        {formatter.format(price)}
                    </p>
                </div>
            </div>
        </Link>
    )
}