//get current product id
const productID = document.querySelector("#buy-button").getAttribute("data-item-id")

//fetch product data
fetch(`/api/productstock/${productID}`)
.then(response => {
    if (!response.ok) {
        //throw error if response NOT OK
      throw new Error('Network response was not ok');
    }
    //return product data to next step
    return response.json();
})
.then(data => {
    //get dropdown element
    const selectElement = document.querySelector("select#size")

    //if product is out of stock
    if (data.totalStock === 0) {
        //remove all options
        data.variants.forEach(variant => {
            const option = selectElement.querySelector("option[value='"+variant.variation[0].option+"']")
            option.remove()
        });
        //create informative option
        const outOfStock = document.createElement("option")
        outOfStock.innerText = "Udsolgt"
        selectElement.appendChild(outOfStock)

        //disable the add to cart button
        document.querySelector("#buy-button").disabled = true
        document.querySelector("#buy-button").innerText = "Produkt udsolgt"
    } else {
        //product has variants in stock
        data.variants.forEach(variant => {
            const option = selectElement.querySelector("option[value='"+variant.variation[0].option+"']")
            if (variant.stock === 0) {
                //remove variant if out of stock
                option.remove()
            }
            //add stock quantity on the option
            option.innerText = option.innerText + "("+variant.stock+" stk. tilbage)"

            //add available size to the buy button
            const button = document.getElementById("buy-button");
            const select = document.getElementById("size");
            button.setAttribute("data-item-custom1-value", select.value);
        });
    }
})
.catch(error => {
    //debug error
    console.error(error);
});
