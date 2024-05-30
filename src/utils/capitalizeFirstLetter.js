const capitalizeFirstLetter = (string) => {
    //return the first letter of the string in uppercase and the entire string without the first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export default capitalizeFirstLetter;
