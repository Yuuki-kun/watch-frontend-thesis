import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import "./product.style.css";
const ProductDetails = () => {
  const { reference } = useParams();
  const [product, setProduct] = useState(null);
  const axiosPrivate = usePrivateRequest();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch product by id
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const rs = await axiosPrivate.get("/products/details/" + reference);
        setProduct(rs.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    reference !== null && reference !== "undefined" && fetchProduct();
  }, [reference]);
  console.log(product);
  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };
  const handChangeMainImage = async (imgName) => {
    try {
      setLoading(true);
      const rs = await axiosPrivate.get(
        "/products/change-main-image/" + reference + "?imageName=" + imgName
      );
      setProduct(rs.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [brand, setBrand] = useState("");
  const [family, setFamily] = useState(null);
  const [gender, setGender] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [movement, setMovement] = useState(null);
  const [powerReserve, setPowerReserve] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [description, setDescription] = useState(null);
  const [functions, setFunctions] = useState(null);

  const [obrand, setoBrand] = useState(null);
  const [ofamily, setoFamily] = useState(null);
  const [ogender, setoGender] = useState(null);
  const [oorigin, setoOrigin] = useState(null);
  const [omovement, setoMovement] = useState(null);
  const [opowerReserve, setoPowerReserve] = useState(null);
  const [ocalendar, setoCalendar] = useState(null);
  const [odescription, setoDescription] = useState(null);
  const [ofunctions, setoFunctions] = useState(null);

  const [updatePrice, setUpdatePrice] = useState(product?.defaultPrices * 1000);

  useEffect(() => {
    if (product) {
      setUpdatePrice(product.defaultPrices * 1000);
      setBrand(product.brand.brandName);
      setFamily(product.family.familyName);
      setGender(product.gender);
      setOrigin(product.origin);

      setMovement(product.movement.name);
      setPowerReserve(product.movement.powerReserve);
      setCalendar(product.movement.calendar);
      setDescription(product.description);
      setFunctions(product.movement.functions);

      setoBrand(product.brand.brandName);
      setoFamily(product.family.familyName);
      setoGender(product.gender);
      setoOrigin(product.origin);

      setoMovement(product.movement.name);
      setoPowerReserve(product.movement.powerReserve);
      setoCalendar(product.movement.calendar);
      setoDescription(product.description);
      setoFunctions(product.movement.functions);
    }
  }, [product]);
  const handleChangeProductData = async () => {
    var updateList = [];
    if (brand !== obrand) {
      updateList.push({ key: "brand", value: brand });
    }
    if (family !== ofamily) {
      updateList.push({ key: "family", value: family });
    }
    if (gender !== ogender) {
      updateList.push({ key: "gender", value: gender });
    }
    if (origin !== oorigin) {
      updateList.push({ key: "origin", value: origin });
    }
    if (movement !== omovement) {
      updateList.push({ key: "movement", value: movement });
    }
    if (powerReserve !== opowerReserve) {
      updateList.push({ key: "powerReserve", value: powerReserve });
    }
    if (calendar !== ocalendar) {
      updateList.push({ key: "calendar", value: calendar });
    }
    if (description !== odescription) {
      updateList.push({ key: "description", value: description });
    }
    if (functions !== ofunctions) {
      updateList.push({ key: "functions", value: functions });
    }
    console.log(updateList);
    try {
      setLoading(true);
      const rs = await axiosPrivate.post(
        `api/v1/admin/products/update/${product.id}`,
        updateList
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // try {
    //   setLoading(true);
    //   const rs = await axiosPrivate.post("/products/update", {});
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
  };
  const handleUpdateprice = async () => {
    try {
      setLoading(true);
      const rs = await axiosPrivate.post(
        `api/v1/admin/products/update/price/${product.id}/${updatePrice}`
      );
      setProduct(rs.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div
      className="admin-prod-cont"
      style={{
        fontSize: "20px !important",
      }}
    >
      {product && (
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-start gap-5 mb-5">
            <img
              style={{
                width: "150px",
                height: "auto",
                boxShadow: "0 0 4px 1px #aaaaaa",
                borderRadius: "10px",
              }}
              src={findMainImage(product.images)}
              alt="product"
            />
            <div>
              <h4>{product.name}</h4>
              <h5>{(product.defaultPrices * 1000).toLocaleString()} VND</h5>
              <h5>Đang giảm: {product.discount}%</h5>
              <h5>Đã bán: {product.soldQuantity}</h5>
              <h5>Tồn kho: {product.inventoryQuantity}</h5>
            </div>
          </div>
          <h4>Giá bán:</h4>
          <div>
            <input
              type="number"
              style={{
                width: "200px",
                marginBottom: "20px",
              }}
              value={updatePrice}
              onChange={(e) => setUpdatePrice(e.target.value)}
            />
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "black",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
              onClick={() => handleUpdateprice()}
            >
              Cập nhật giá
            </button>
          </div>
          <h4>Chi tiết</h4>
          <button onClick={handleChangeProductData}>Lưu thay đổi</button>
          <div className="line-container">
            <span className="line"></span>
          </div>
          <div className="col-12">
            <div className="details-row-container">
              <div className="details-row">
                <p className="details-key">MÔ TẢ</p>
                <textarea
                  className="details-value"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">THƯƠNG HIỆU</p>
                <input
                  className="details-value"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">BỘ SƯU TẬP</p>
                <input
                  className="details-value"
                  type="text"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">GIỚI TÍNH</p>
                <input
                  className="details-value"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">REFERENCE</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.reference}
                />
              </div>
              <div className="details-row">
                <p className="details-key">XUẤT XỨ</p>
                <input
                  className="details-value"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">MOVEMENT</p>

                <input
                  className="details-value"
                  type="text"
                  value={movement}
                  onChange={(e) => setMovement(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">DỰ TRỮ NĂNG LƯỢNG</p>
                <input
                  className="details-value"
                  type="text"
                  value={powerReserve}
                  onChange={(e) => setPowerReserve(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">CHỨC NĂNG</p>
                <input
                  className="details-value"
                  type="text"
                  value={functions}
                  onChange={(e) => setFunctions(e.target.value)}
                />
              </div>
              <div className="details-row">
                <p className="details-key">LỊCH</p>
                <input
                  className="details-value"
                  type="text"
                  value={calendar}
                  onChange={(e) => setCalendar(e.target.value)}
                />
              </div>
            </div>
            <h6 style={{ color: "black", fontStyle: "italic" }}>VỎ</h6>
            <div className="details-row-container">
              <div className="details-row">
                <p className="details-key">ĐƯỜNG KÍNH</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.diameter + "mm"}
                />
              </div>
              <div className="details-row">
                <p className="details-key">BỀ DÀY</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.thickness + "mm"}
                />
              </div>
              <div className="details-row">
                <p className="details-key">CHẤT LIỆU VỎ</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.material}
                />
              </div>
              <div className="details-row">
                <p className="details-key">HÌNH DÁNG</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.shape}
                />
              </div>
              <div className="details-row">
                <p className="details-key">MẶT LƯNG</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.back}
                />
              </div>
              <div className="details-row">
                <p className="details-key">BEZEL</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.bezel}
                />
              </div>

              <div className="details-row">
                <p className="details-key">CRYSTAL</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.crystal}
                />
              </div>

              <div className="details-row">
                <p className="details-key">KHẢ NĂNG CHỐNG NƯỚC</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.watchCase.waterResistance}
                />
              </div>
            </div>

            <h6 style={{ color: "black", fontStyle: "italic" }}>DÂY ĐEO</h6>
            <div className="details-row-container">
              <div className="details-row">
                <p className="details-key">LOẠI DÂY</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.band.type}
                />
              </div>
              <div className="details-row">
                <p className="details-key">CHẤT LIỆU</p>{" "}
                <input
                  className="details-value"
                  type="text"
                  value={product.band.material}
                />
              </div>

              <div className="details-row">
                <p className="details-key">MÀU SẮC</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.band.color}
                />
              </div>
              <div className="details-row">
                <p className="details-key">CHIỀU RỘNG</p>
                <input
                  className="details-value"
                  type="text"
                  value={
                    product.band.width > 0 ? product.band.width + "mm" : ""
                  }
                />
              </div>
              <div className="details-row">
                <p className="details-key">LOẠI KHÓA</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.band.clasp}
                />
              </div>
            </div>

            <h6 style={{ color: "black", fontStyle: "italic" }}>MẶT</h6>
            <div className="details-row-container">
              <div className="details-row">
                <p className="details-key">MÀU SẮC</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.dials[0].color}
                />
              </div>
              <div className="details-row">
                <p className="details-key">LOẠI HIỂN THỊ</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.dials[0].type}
                />
              </div>

              <div className="details-row">
                <p className="details-key">KIM</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.dials[0].hands}
                />
              </div>
              <div className="details-row">
                <p className="details-key">CHỈ MỤC</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.dials[0].indexes}
                />
              </div>

              <div className="details-row">
                <p className="details-key">PHÁT QUANG</p>
                <input
                  className="details-value"
                  type="text"
                  value={product.dials[0].luminescence}
                />
              </div>
            </div>
          </div>
          <h5>Hình Ảnh </h5>
          <h6>Bấm vào ảnh để thay đổi hình ảnh hiển thị </h6>

          <div className="line-container">
            <span className="line"></span>
          </div>
          <div className="col-12">
            <div className="row">
              {product.images.map((img) => (
                <div className="col-3 mb-4">
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                      boxShadow: "0 0 4px 1px #aaaaaa",
                      borderRadius: "10px",
                      border: img.main ? "2px solid green" : "none",
                    }}
                    src={"http://localhost:8080/image/fileSystem/" + img.name}
                    alt="product"
                    onClick={() => handChangeMainImage(img.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
