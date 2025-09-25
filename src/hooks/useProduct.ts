import { ProductService } from "@services/ProductService";
import { useEffect, useState } from "react";

export const useBestSellingProducts = ({
    searchPhrase,
    product_page,
    size,
    color,
    sort_price,
}: {
    searchPhrase: string | null;
    product_page: number | null | undefined;
    size: string | null;
    color: string | null;
    sort_price: string | null;
}) => {
    const [bestSellingProducts, setBestSellingProducts] = useState({
        data: [],
        links: [],
    });
    const [bestSellingSizes, setBestSellingSizes] = useState([]);
    const [bestSellingColors, setBestSellingColors] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            await ProductService.getBestSellingProducts(
                isPending,
                setIsPending,
                setBestSellingProducts,
                setBestSellingSizes,
                setBestSellingColors,
                searchPhrase,
                product_page,
                size,
                color,
                sort_price
            );
        };

        fetchProducts();
    }, [searchPhrase, product_page, size, color, sort_price]);

    return {
        bestSellingProducts,
        bestSellingSizes,
        bestSellingColors,
        isPending,
    };
};