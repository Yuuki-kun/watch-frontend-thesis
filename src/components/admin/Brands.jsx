import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products/fetch-collections");
        setBrands(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  console.log(brands);
  return (
    <div
      style={{
        margin: "16px",
      }}
    >
      <h4>Thương Hiệu</h4>
      <div>
        {brands &&
          brands.map((brand) => (
            <div key={brand.id}>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "black",
                  textDecoration: "underline",
                }}
              >
                {brand.brand.brandName}
              </p>
              {/* <img src={brand.img} alt={brand.name} /> */}
              {brand.family &&
                brand.family.length > 0 &&
                brand.family.map((family) => (
                  <div
                    style={{
                      marginLeft: "32px",
                    }}
                    key={family.id}
                  >
                    <p>{family.familyName}</p>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Brands;
