//format all prices on the website to look alike
function formatPrice(price) {
    //if price is not a number
    if (isNaN(price)) {
        return "NaN";
    }

    //get the deconstructed integer and decimal from the price
    let [integerPart, decimalPart] = parseFloat(price).toFixed(2).split(".");
    //regex by chatGPT to add "." every thousands
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    //retun the price with a comma seperator
    return integerPart + "," + decimalPart;
}
export default formatPrice;
