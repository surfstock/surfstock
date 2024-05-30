import { useState } from "react";
import toSlugOrName from "../utils/toSlugOrName";

export default function ProductGallery({ product }) {
    //decalre states
    const [activeImage, setActiveImage] = useState(product.image);
    const imageAltText = toSlugOrName(product, "name");
    const changeActiveImage = (newImage) => {
        setActiveImage(newImage);
    };
    return (
        <div className="productGallery">
            <img
                src={activeImage}
                alt={imageAltText}
                className="productGallery__activeImage"
                decoding="async"
                loading="eager"
                width="300"
                height="400"
            />
            {product.images && (
                <ul className="productGallery__thumbnails">
                    <li>
                        <button
                            className="productGallery__button"
                            onClick={() => {
                                changeActiveImage(product.image);
                            }}
                        >
                            <img
                                src={product.image}
                                alt={imageAltText}
                                className="productGallery__thumbnail"
                            />
                        </button>
                    </li>
                    {/*if product.images is an array == there is multiple images (then map)*/}
                    {/*else it is just one image, show that one*/}
                    {Array.isArray(product.images) ? (
                        product.images.map((image, index) => {
                            return (
                                <li key={index}>
                                    <button
                                        className="productGallery__button"
                                        onClick={() => {
                                            changeActiveImage(image);
                                        }}
                                    >
                                        <img
                                            src={image}
                                            alt={imageAltText}
                                            className="productGallery__thumbnail"
                                        />
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <li key="extraImage">
                            <button
                                className="productGallery__button"
                                onClick={() => {
                                    changeActiveImage(product.images);
                                }}
                            >
                                <img
                                    src={product.images}
                                    alt={imageAltText}
                                    className="productGallery__thumbnail"
                                />
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}
