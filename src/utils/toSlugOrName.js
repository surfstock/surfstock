//generate a unique slug or name for every product
const toSlugOrName = (product, slugOrName) => {
    //get the product information, if it exists
    const productBrand = product.data?.brand;
    const productTitle = product.data?.title;
    const productYear = product.data?.year;

    //filter productArray to only contain valid data
    const productArray = [productBrand, productTitle, productYear].filter(
        Boolean
    );

    if (slugOrName == "slug") {
        //create and return the slug
        const slug = productArray.join("-");
        return slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    } else if (slugOrName == "name") {
        //create and return the name
        const productName = productArray.join(" ");
        return productName;
    }
};
export default toSlugOrName;
