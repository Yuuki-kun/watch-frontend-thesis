import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../api/services/productService";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import ClockLoader from "../../components/ClockLoader";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
const ProductList = ({ setIsFetching, typeOfFilter }) => {
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const size = searchParams.get("size");
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const cate = searchParams.get("cate");
  const color = searchParams.get("color");
  const brand = searchParams.get("brand");
  const band = searchParams.get("band");
  const mvt = searchParams.get("movement");
  const cs = searchParams.get("cs");
  const bt = searchParams.get("bt");
  const query = searchParams.get("query");
  const name = searchParams.get("name");
  const bid = searchParams.get("bid");
  const fname = searchParams.get("fname");
  const fid = searchParams.get("fid");
  const typeF = searchParams.get("typeF");

  const [products, setProducts] = useState(null);
  // console.log(page, size, type);
  // const [isFetching, setIsFetching] = useState(false);
  console.log(cate);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [mouseEnterOnImg, setMouseEnterOnImg] = useState(-1);
  const handleMouseEnterImg = (idx) => {
    // console.log("Mouse enter on img", idx);
    setMouseEnterOnImg(idx);
  };
  const [currentSize, setCurrentSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (type === "fetch" && cate !== "none") {
      if (cate === "men") {
        const fetchAllProducts = async () => {
          setIsFetching(true);
          try {
            const response = await axios.get(
              `http://localhost:8080/products/fetch-watches/Mens?size=${currentSize}&page=${currentPage}`
            );
            response && setProducts(response.data);
            setIsFetching(false);
          } catch (err) {
            setIsFetching(false);
            console.error(err);
          }
        };
        fetchAllProducts();
        // console.log("fetch men");
      } else if (cate === "women") {
        const fetchAllProducts = async () => {
          setIsFetching(true);
          try {
            const response = await axios.get(
              `http://localhost:8080/products/fetch-watches/Womens?size=${currentSize}&page=${currentPage}`
            );
            response && setProducts(response.data);
            setIsFetching(false);
          } catch (err) {
            setIsFetching(false);
            console.error(err);
          }
        };
        fetchAllProducts();
        // console.log("fetch women");
      } else if (cate === "brand") {
        const fetchAllProducts = async () => {
          setIsFetching(true);
          try {
            const response = await axios.get(
              `http://localhost:8080/products/fetch-watches/brand/${bid}?size=${currentSize}&page=${currentPage}`
            );
            response && setProducts(response.data);
            setIsFetching(false);
          } catch (err) {
            setIsFetching(false);
            console.error(err);
          }
        };
        fetchAllProducts();
      } else if (cate === "family") {
        const fetchAllProducts = async () => {
          setIsFetching(true);
          try {
            const response = await axios.get(
              `http://localhost:8080/products/fetch-watches/family/${fid}?size=${currentSize}&page=${currentPage}`
            );
            response && setProducts(response.data);
            setIsFetching(false);
          } catch (err) {
            setIsFetching(false);
            console.error(err);
          }
        };
        fetchAllProducts();
      }
    }

    if (type === "fetch" && cate === "none") {
      // console.log("Fetching all products");
      const fetchAllProducts = async () => {
        setIsFetching(true);
        try {
          const response = await getProducts(type, currentSize, currentPage);
          const { content, totalPages } = response.data;
          response && setProducts(content);
          setTotalPages(totalPages);
          setIsFetching(false);
        } catch (err) {
          setIsFetching(false);
          console.error(err);
        }
      };
      fetchAllProducts();
    } else if (type === "search") {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/products/similar/${query}?size=${currentSize}&page=${currentPage}`
          );
          // console.log(response.data);
          setProducts(response.data);
          setIsFetching(false);
        } catch (error) {
          setIsFetching(false);
          console.error(error);
        }
      };
      fetchProduct();
    } else if (type === "filter") {
      // console.log("????????");
      const start = searchParams.get("start");
      const end = searchParams.get("end");
      console.log("Price filter", start, end);
      const fetchProductByPriceFilter = async () => {
        try {
          setIsFetching(true);

          const response = await axios.get(
            `http://localhost:8080/products/filters?cate=${cate}&start=${start}&end=${end}&color=${color}&brand=${brand}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&size=${currentSize}&page=${currentPage}&typeF=${typeOfFilter}`
          );
          console.log(response.data);

          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
          setIsFetching(false);
        } catch (error) {
          console.error(error);
          setIsFetching(false);
        }
      };
      fetchProductByPriceFilter();
    }
  }, [location, currentPage]);
  // console.log(products);
  useEffect(() => {
    // console.log("????????");
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    // console.log("Price filter", start, end);
    const fetchProductByPriceFilter = async () => {
      try {
        setIsFetching(true);
        // console.log("caaaaa=" + cate);
        const response = await axios.get(
          `http://localhost:8080/products/filters?cate=${cate}&start=${start}&end=${end}&color=${color}&brand=${brand}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&size=${currentSize}&page=${currentPage}&typeF=${typeOfFilter}`
        );
        // console.log(response);
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setIsFetching(false);
      } catch (error) {
        console.error(error);
        setIsFetching(false);
      }
    };
    if (typeOfFilter !== "none" && type === "filter") {
      fetchProductByPriceFilter();
    }
  }, [typeOfFilter]);

  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };

  const handleChangePage = async (ctype) => {
    let page = 0;
    if (ctype === "next") {
      page = currentPage + 1;
    } else {
      page = currentPage - 1;
    }

    if (type === "fetch" && cate === "none") {
    }

    // setIsFetching(true);
    setCurrentPage(page);
    setCurrentInputPage(page + 1);

    // try {
    //   const data = await getProducts("fetch", currentSize, page);
    //   setProducts(data);
    //   setCurrentPage(page);
    //   setIsFetching(false);
    //   console.log(data);
    // } catch (err) {
    //   console.error(err);
    //   setIsFetching(false);
    // }
  };

  const [currentInputPage, setCurrentInputPage] = useState(1);

  return (
    <div className="products-list">
      <h5 style={{ textTransform: "capitalize" }}>
        {type === "fetch" && cate === "none" && `Watches  Department`}
        {type === "fetch" && cate === "brand" && `${name} Watches`}
        {type === "fetch" && cate === "family" && `${fname} Watches`}
        {type === "fetch" && cate === "men" && `Men's Watches`}
        {type === "fetch" && cate === "women" && `Women's Watches`}
      </h5>
      {/* <span>{totalProducts && totalProducts}</span> */}
      <div className="products-list-items">
        {products &&
          products.map((product, idx) => (
            <Link
              key={idx}
              className="pl-items"
              onMouseEnter={() => handleMouseEnterImg(idx)}
              onMouseLeave={() => setMouseEnterOnImg(-1)}
              to={`/products/${product.reference}`}
            >
              <div className="pl-brand-ref">
                <span className="pl-ref-span">{product.reference}</span>
              </div>
              <div className="pl-img-container">
                <img
                  src={
                    mouseEnterOnImg === idx
                      ? "http://localhost:8080/image/fileSystem/" +
                        product.images[1].name
                      : findMainImage(product.images)
                  }
                  alt={product && product.name}
                  className="pl-items-img"
                />
              </div>
              <div className="pl-contents">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="pl-brand-span">
                    {product.brand.brandName}
                  </span>
                  <ReactStars
                    count={5}
                    value={product.stars}
                    color1={"#aaa"}
                    color2={"#000"}
                    size={15}
                    edit={false}
                  />
                </div>
                <h5>
                  <span className="pl-family-span">
                    "{product.family.familyName}"{" "}
                  </span>
                  Collection
                </h5>
                <span className="mvt-type-span">{product.movement.type}</span>

                <h5>{(product.defaultPrices * 1000).toLocaleString()}đ</h5>
                {product.discount > 0 && (
                  <span className="pl-discount-span text-danger">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </Link>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItem: "center",
          justifyContent: "center",
          marginTop: "15px",
          gap: "10px",
          zIndex: 100,
        }}
      >
        <button
          style={{
            border: "1px solid #ddd",
            hover: "pointer",
            width: "35px",
            marginRight: "10px",
          }}
          disabled={currentPage === 0}
          onClick={() => handleChangePage("prev")}
        >
          <FcPrevious />
        </button>
        <span>
          {/* Page: {currentPage + 1} */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(currentInputPage - 1);
            }}
          >
            <input
              type="number"
              value={currentInputPage}
              onChange={(e) => setCurrentInputPage(e.target.value)}
              style={{
                width: "50px",
                textAlign: "center",
                marginRight: "10px",
              }}
            />
            <span>/ {totalPages}</span>
            <button
              type="submit"
              style={{
                border: "1px solid #ddd",
                cursor: "pointer",
                width: "60px",
                marginLeft: "10px",
              }}
            >
              Go
            </button>
          </form>
        </span>
        <button
          style={{
            border: "1px solid #ddd",
            hover: "pointer",
            width: "35px",
            marginLeft: "10px",
          }}
          onClick={() => handleChangePage("next")}
          disabled={currentPage === totalPages - 1}
        >
          <FcNext />
        </button>
      </div>
    </div>
  );
};

export default ProductList;
