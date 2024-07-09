import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function TabSection({ product, collection }) {
    //decalre states
    const [activeTab, setActiveTab] = useState("Beskrivelse");
    const showDescription = product.content?.length > 0;

    //if no description, begin on details
    useEffect(() => {
        if (!showDescription) {
            setActiveTab("Detaljer");
        }
    }, []);

    return (
        <div className="tabSection">
            <nav className="tabSection__navigation">
                {showDescription && (
                    <button
                        className={
                            activeTab === "Beskrivelse"
                                ? "tabSection__button tabSection__button--active"
                                : "tabSection__button"
                        }
                        onClick={() => {
                            setActiveTab("Beskrivelse");
                        }}
                    >
                        Beskrivelse
                    </button>
                )}
                <button
                    className={
                        activeTab === "Detaljer"
                            ? "tabSection__button tabSection__button--active"
                            : "tabSection__button"
                    }
                    onClick={() => {
                        setActiveTab("Detaljer");
                    }}
                >
                    Detaljer
                </button>
                <button
                    className={
                        activeTab === "Levering"
                            ? "tabSection__button tabSection__button--active"
                            : "tabSection__button"
                    }
                    onClick={() => {
                        setActiveTab("Levering");
                    }}
                >
                    Levering
                </button>
            </nav>
            <article hidden={activeTab !== "Beskrivelse"} className="markdown">
                <Markdown children={product.content} />
            </article>
            <div hidden={activeTab !== "Detaljer"}>
                <ul className="productDetails">
                    <li className="productDetails__detail" key={product.brand}>
                        <span className="productDetails__detailTitle">
                            Brand:
                        </span>
                        <a
                            href={
                                "/" + collection + "?preFilter=" + product.brand
                            }
                            className="link"
                        >
                            {product.brand}
                        </a>
                    </li>
                    <li className="productDetails__detail" key={product.type}>
                        <span className="productDetails__detailTitle">
                            Type:
                        </span>
                        <a
                            href={
                                "/" + collection + "?preFilter=" + product.type
                            }
                            className="link"
                        >
                            {product.type}
                        </a>
                    </li>
                    <li className="productDetails__detail" key={collection}>
                        <span className="productDetails__detailTitle">
                            Kategori:
                        </span>
                        <a href={"/" + collection} className="link">
                            {collection}
                        </a>
                    </li>
                    {product?.year && (
                        <li
                            className="productDetails__detail"
                            key={product.year}
                        >
                            <span className="productDetails__detailTitle">
                                Årgang:
                            </span>
                            <a
                                href={
                                    "/" +
                                    collection +
                                    "?preFilter=" +
                                    product.year
                                }
                                className="link"
                            >
                                {product.year}
                            </a>
                        </li>
                    )}
                    {product.details?.map((detail) => {
                        return (
                            <li
                                className="productDetails__detail"
                                key={detail.label}
                            >
                                <span className="productDetails__detailTitle">
                                    {detail.label}:
                                </span>
                                <span>{detail.value}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div hidden={activeTab !== "Levering"}>
                <p>
                    Mindre produkter som tøj og ekstradele kan leveres til hele
                    Danmark med GLS Standardlevering (2-3 arbejdsdage).
                </p>
                <p>
                    Boards, master, bomme og sejl kan kun blive leveret til
                    adresser i Storkøbenhavn eller afhentes ved restlageret på
                    Frederiksberg efter aftale.
                </p>
            </div>
        </div>
    );
}
