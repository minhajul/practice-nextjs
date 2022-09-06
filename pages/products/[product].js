import React, {useState} from "react";
import {getAllProducts, getProductByHandle} from "../../libs/shopify";
import {formatter} from '../../libs/helper'

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {FreeMode, Navigation, Thumbs} from "swiper";

export default function ProductPage({product}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const price = product.priceRange.minVariantPrice.amount

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <div className="flex flex-col-reverse">
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {
                                product.images.edges.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image.node.originalSrc}
                                            alt={image.node.altText}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>

                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {
                                product.images.edges.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image.node.originalSrc}
                                            alt={image.node.altText}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
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