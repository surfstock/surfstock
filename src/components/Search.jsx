import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import toSlugOrName from "../utils/toSlugOrName";

const Search = ({ products }) => {
    //declare reactive states
    const [query, setQuery] = useState("");
    const [results, setResults] = useState();
    const [showDialog, setShowDialog] = useState(false);

    //create the filed that the fuse will search through
    products.forEach((product) => {
        product.searchableString =
            product.data.brand +
            " " +
            product.data.title +
            " " +
            product.data.year +
            " " +
            product.data.type +
            " " +
            product.collection;
    });

    //create the fuse
    const fuse = new Fuse(products, { keys: ["searchableString"] });

    const handleFormSubmit = (e) => {
        //stop default browser behaviour (page refresh)
        e.preventDefault();
    };

    //check if a search has been made, show the search dialog accordingly
    useEffect(() => {
        if (query.length > 1) {
            setShowDialog(true);
            setResults(fuse.search(query));
        } else {
            setShowDialog(false);
            setResults([]);
        }
    }, [query]);

    return (
        <>
            <search className="globalHeader__searchLandmark">
                <form
                    onSubmit={handleFormSubmit}
                    autoComplete="off"
                    className="globalHeader__search"
                >
                    <input
                        className="globalHeader__searchInput"
                        autoComplete="off"
                        name="Søg efter produkter"
                        aria-label="Søg efter produkter"
                        placeholder="Søg her..."
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <img
                        src="/icons/search.svg"
                        alt=""
                        className="globalHeader__searchIcon globalHeader__icon"
                        height="25"
                    />
                </form>
            </search>
            {/*show dialog if search is made*/}
            {showDialog && (
                <dialog className="searchResults" open>
                    {results?.length > 0 && (
                        <ul className="searchResults__list">
                            {results.map((product, index) => (
                                <li key={index}>
                                    <a
                                        className="searchResults__result"
                                        href={
                                            `/${product.item.collection.replaceAll(
                                                "æ",
                                                "a"
                                            )}/` +
                                            toSlugOrName(product.item, "slug")
                                        }
                                    >
                                        <img
                                            className="searchResults__resultImage"
                                            src={product.item.data.image}
                                        />
                                        <span className="searchResults__resultTitle">
                                            {product.item.data.brand +
                                                " " +
                                                product.item.data.title}
                                        </span>
                                        {product.item.collection +
                                            " " +
                                            product.item.data.type +
                                            " " +
                                            (product.item.data.year || "")}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </dialog>
            )}
        </>
    );
};

export default Search;
