import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import Dial from "./Dial";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

const AddProduct = ({ closeAddProduct, isShow }) => {
  const [brands, setBrands] = useState([]);
  const [families, setFamilies] = useState([]);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    //fetch the brand list
    //fetch the family list
    //fetch the movement list
    const fetchBrands = async () => {
      try {
        const response = await axios.get("general-info/brands");
        setBrands(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovements = async () => {
      try {
        const response = await axios.get("general-info/movements");
        setMovements(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
    fetchMovements();
  }, []);

  const [pbrand, setPBrand] = React.useState(null);

  const [pfamily, setPFamily] = React.useState("");

  const [pname, setPName] = useState("");
  const [pref, setPref] = useState("");
  const [pgender, setPGender] = useState("");
  const [porigin, setPOrigin] = useState("");
  const [pProduceYear, setPProduceYear] = useState("");
  const [pdescription, setPDescription] = useState("");
  const [pimages, setPImages] = useState("");
  const [pweight, setPWeight] = useState(0);
  const [pwarranty, setPWarranty] = useState(0);
  const [plimited, setPLimited] = useState(false);
  const [pprice, setPPrice] = useState(0);
  const [pinventory, setPInventory] = useState(0);
  const [pmaterial, setPMaterial] = useState("");
  const [pdiameter, setPDiameter] = useState(0);
  const [pshape, setPShape] = useState("");
  const [pback, setPBack] = useState("");
  const [pwaterproof, setPWaterproof] = useState(0);
  const [pthickness, setPThickness] = useState(0);
  const [pbezel, setPBezel] = useState("");
  const [pcrystal, setPCrystal] = useState("");
  const [plugwidth, setPLugWidth] = useState(0);
  const [pcrystaldescription, setPCrystalDescription] = useState("");
  const [pmname, setPMName] = useState("");
  const [pmtype, setPMType] = useState("");
  const [pmpower, setPMPower] = useState("");
  //new attribute
  const [watchStyle, setWatchStyle] = useState("");
  const [psmovement, setPSMovement] = useState("");
  const [psbrand, setPSBrand] = useState("");
  const [psfamily, setPSFamily] = useState("");
  const [psmvtid, setPSMvtId] = useState("");
  const [psfamilyid, setPSFamilyId] = useState("");
  const [psbrandid, setPSBrandId] = useState("");
  //mvt
  const [pmorigin, setPMOrigin] = useState("");
  const [pmfunctions, setPMFunctions] = useState("");
  const [pmcalendar, setPMCalendar] = useState("");
  const [pmcaliber, setPMCaliber] = useState("");
  const [pmpowerReserve, setPMPowerReserve] = useState("");
  const [pmjewels, setPMJewels] = useState(0);
  const [pmReferece, setPMReference] = useState("");

  const fileInputRef = React.createRef();

  const handleFileChange = (e) => {
    // e.target.files là một FileList, chuyển đổi thành mảng để dễ xử lý
    const selectedFiles = Array.from(e.target.files);
    setPImages(selectedFiles);
  };

  useEffect(() => {
    const fetchFamiliesByBrandName = async () => {
      try {
        const response = await axios.get(`general-info/families/${psbrand}`);
        setFamilies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (psbrand) {
      fetchFamiliesByBrandName();
    } else {
      setFamilies([]);
    }
  }, [psbrand]);

  console.log(
    pbrand,
    pfamily,
    pname,
    pref,
    pgender,
    porigin,
    pProduceYear,
    pdescription,
    pimages,
    pweight,
    pwarranty,
    plimited,
    pprice,
    pinventory,
    pmaterial,
    pdiameter,
    pshape,
    pback,
    pwaterproof,
    pthickness,
    pbezel,
    pcrystal,
    plugwidth,
    pcrystaldescription,
    pmname,
    pmtype,
    pmpower
  );

  const [dials, setDials] = useState([]);
  console.log(dials.length);
  const [dialColorData, setDialColorData] = useState([]);
  const [dialIndexesData, setDialIndexesData] = useState([]);
  const [dialHandsData, setDialHandsData] = useState([]);
  const [dialTypeData, setDialTypeData] = useState([]);
  const [dialLuminescenceData, setDialLuminescenceData] = useState([]);
  const [dialGemSettingData, setDialGemSettingData] = useState([]);
  const [dialImgFileData, setDialImgFileData] = useState([]);

  const [pbref, setPBRef] = useState("");
  const [pbmaterial, setPBMaterial] = useState("");
  const [pbcolor, setPBColor] = useState("");
  const [pbwidth, setPBWidth] = useState(0);
  const [pbtype, setPBType] = useState("");
  const [pbclasp, setPBCLasp] = useState("");
  const [pblength, setPBLength] = useState(0);

  const selectStyles = {
    padding: "5px 10px",
    paddingRight: "30px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    cursor: "pointer",
    appearance: "none" /* Remove default arrow icon */,
    backgroundImage:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')' /* Custom arrow icon */,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0px top 50%",
    backgroundSize: "24px",
    backgroundColor: "#fff",
    fontWeight: "600",
  };
  const hoverStyles = {
    borderColor: "#999",
  };

  // CSS styles for focus effect
  const focusStyles = {
    borderColor: "#333",
  };

  const [jsonFromData, setJsonFromData] = useState({});
  useEffect(() => {
    const setData = () => {
      setJsonFromData({
        reference: pref,
        name: pname,
        produced: pProduceYear,
        origin: porigin,
        weight: pweight,
        gender: pgender,
        warranty: pwarranty,
        limited: plimited,
        description: pdescription,
        inventoryQuantity: pinventory,
        defaultPrices: pprice,
        watchStyle: watchStyle,
        brand: {
          addNew: psbrand === "" ? true : false,
          brandName: psbrand === "" ? pbrand : psbrand,
        },
        family: {
          addNew: psfamily === "" ? true : false,
          familyName: psfamily === "" ? pfamily : psfamily,
        },

        watchCase: {
          material: pmaterial,
          diameter: pdiameter,
          shape: pshape,
          back: pback,
          waterResistance: pwaterproof,
          thickness: pthickness,
          bezel: pbezel,
          crystal: pcrystal,
          // lugWidth: plugwidth,
          // crystalDescription: pcrystaldescription,
        },
        movement:
          psmovement === ""
            ? {
                addNew: true,
                name: pmname,
                type: pmtype,
                power: pmpower,
                // jewels: pmjewels,
                origin: pmorigin,
                functions: pmfunctions,
                calendar: pmcalendar,
                caliber: pmcaliber,
                powerReserve: pmpowerReserve,
              }
            : {
                name: psmovement,
                addNew: false,
              },
        dials: dials.map((dial, idx) => {
          return {
            type: dialTypeData[idx],
            color: dialColorData[idx],
            indexes: dialIndexesData[idx],
            hands: dialHandsData[idx],
            luminescence: dialLuminescenceData[idx],
            // gemSetting: dialGemSettingData[idx],
          };
        }),
        band: {
          // reference: pbref,
          material: pbmaterial,
          color: pbcolor,
          width: pbwidth,
          type: pbtype,
          clasp: pbclasp,
          length: pblength,
        },
      });
    };
    setData();
  }, [
    pname,
    pref,
    pgender,
    porigin,
    pProduceYear,
    pdescription,
    pweight,
    pwarranty,
    plimited,
    pprice,
    pinventory,
    pmaterial,
    pdiameter,
    pshape,
    pback,
    pwaterproof,
    pthickness,
    pbezel,
    pcrystal,
    plugwidth,
    pcrystaldescription,
    pmname,
    pmtype,
    pmpower,
    pbrand,
    pfamily,
    watchStyle,
    psbrand,
    psfamily,
    psmovement,
    pmorigin,
    pmfunctions,
    pmcalendar,
    pmcaliber,
    pmpowerReserve,
    pmjewels,
    dials,
    dialColorData,
    dialIndexesData,
    dialHandsData,
    dialTypeData,
    dialLuminescenceData,
    dialGemSettingData,
    pbref,
    pbmaterial,
    pbcolor,
    pbwidth,
    pbtype,
    pbclasp,
    pblength,
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  const handelSubmit = (e) => {
    e.preventDefault();
    setIsAdding(true);
    console.log(jsonFromData);
    const formDataToSubmit = new FormData();
    pimages.forEach((image) => {
      formDataToSubmit.append(`img`, image);
    });
    dialImgFileData.forEach((image) => {
      formDataToSubmit.append(`dialImg`, image);
    });
    formDataToSubmit.append("formData", JSON.stringify(jsonFromData));

    axios
      .post(
        "http://localhost:8080/api/v1/admin-watch-mgt/add-watch",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("File uploaded successfully", response.data);
        setIsAdding(false);
        clearAllData();
        alert("Product added successfully");

        // window.location.reload();
      })
      .catch((error) => {
        setIsAdding(false);
        console.error("Error uploading file", error);
      });
    console.log(formDataToSubmit);
  };
  const handleDialColorChange = (index, value) => {
    const newInputValues = [...dialColorData];
    newInputValues[index] = value;
    setDialColorData([...newInputValues]);
  };
  const handleDialIndexesChange = (index, value) => {
    const newInputValues = [...dialIndexesData];
    newInputValues[index] = value;
    setDialIndexesData([...newInputValues]);
  };
  const handleDialHandsChange = (index, value) => {
    const newInputValues = [...dialHandsData];
    newInputValues[index] = value;
    setDialHandsData([...newInputValues]);
  };
  const handleDialTypeChange = (index, value) => {
    const newInputValues = [...dialTypeData];
    newInputValues[index] = value;
    setDialTypeData([...newInputValues]);
  };
  const handleDialLuminescenceChange = (index, value) => {
    const newInputValues = [...dialLuminescenceData];
    newInputValues[index] = value;
    setDialLuminescenceData([...newInputValues]);
  };
  const handleDialGemSettingChange = (index, value) => {
    const newInputValues = [...dialGemSettingData];
    newInputValues[index] = value;
    setDialGemSettingData([...newInputValues]);
  };
  const handleDialImgFileChange = (index, value) => {
    const newInputValues = [...dialImgFileData];
    newInputValues[index] = value;
    setDialImgFileData([...newInputValues]);
  };
  const handleAddDialClick = () => {
    const newInputValues = [
      ...dials,
      <Dial
        key={dials.length}
        idx={dials.length}
        onColorChange={handleDialColorChange}
        onIndexesChange={handleDialIndexesChange}
        onHandsChange={handleDialHandsChange}
        onTypeChange={handleDialTypeChange}
        onLuminescenceChange={handleDialLuminescenceChange}
        onGemSettingChange={handleDialGemSettingChange}
        onImgFileChange={handleDialImgFileChange}
        onDelete={handleDeleteDial}
        size={dials.length}
      />,
    ];
    setDials([...newInputValues]);
  };

  console.log(dialColorData);
  console.log(dialIndexesData);
  console.log(dialHandsData);
  console.log(dialTypeData);
  console.log(dialLuminescenceData);
  console.log(dialGemSettingData);
  console.log(dialImgFileData);

  const handleDeleteDial = (index) => {
    const newDials = dials.filter((_, i) => i !== index);

    const newInputValues = dialColorData.filter((_, i) => i !== index);

    setDialColorData(newInputValues);
    setDials(newDials);
  };

  const clearAllData = () => {
    setPName("");
    setPref("");
    setPGender("");
    setPOrigin("");
    setPProduceYear("");
    setPDescription("");
    setPImages("");
    setPWeight(0);
    setPWarranty(0);
    setPLimited(false);
    setPPrice(0);
    setPInventory(0);
    setPMaterial("");
    setPDiameter(0);
    setPShape("");
    setPBack("");
    setPWaterproof(0);
    setPThickness(0);
    setPBezel("");
    setPCrystal("");
    setPLugWidth(0);
    setPCrystalDescription("");
    setPMName("");
    setPMType("");
    setPMPower("");
    setWatchStyle("");
    setPSMovement("");
    setPSBrand("");
    setPSFamily("");
    setPBrand("");
    setPFamily("");
    setDials([]);
    setDialColorData([]);
    setDialIndexesData([]);
    setDialHandsData([]);
    setDialTypeData([]);
    setDialLuminescenceData([]);
    setDialGemSettingData([]);
    setDialImgFileData([]);
    setPMReference("");
    setPMPowerReserve("");
    setPMOrigin("");
    setPMFunctions("");
    setPMCalendar("");
    setPMCaliber("");
    setPMJewels(0);
    setPBRef("");
    setPBMaterial("");
    setPBColor("");
    setPBWidth(0);
    setPBType("");
    setPBCLasp("");
    setPBLength(0);
  };

  return (
    <div
      className={`ad-add-prod-cont ${
        isShow ? "show-right-add-prod" : "hide-right-add-prod"
      }`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <Header title={"Add a Product"} />
        <div className="d-flex gap-2">
          <button
            className="ad-prod-add-close-btn"
            style={{
              border: "none",
              padding: "5px 15px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "space-between",
              borderRadius: "5px",
              border: "1px solid #aaaaaa",
              background: "#fff",
              fontWeight: "600",
              boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => {
              clearAllData();
            }}
          >
            <span>Clear</span>
          </button>
          <button
            className="ad-prod-add-close-btn"
            style={{
              border: "none",
              padding: "5px 15px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "space-between",
              borderRadius: "5px",
              border: "1px solid #aaaaaa",
              background: "#fff",
              fontWeight: "600",
              boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => {
              clearAllData();
              closeAddProduct();
            }}
          >
            <span>Close</span>
            <CloseOutlinedIcon />
          </button>
        </div>
      </div>
      <div className="line-container">
        <span className="line"></span>
      </div>
      <div className="row h-100">
        <div className="col-12">
          <form onSubmit={handelSubmit} className="">
            <div className="ad-add-product-area">
              <InputLabel
                htmlFor="pname"
                style={{ fontWeight: "600", color: "black" }}
                sx={{ marginTop: "10px" }}
              >
                Product Name
              </InputLabel>
              <Input
                id="pname"
                color="primary"
                placeholder="Name of the product"
                value={pname}
                onChange={(e) => setPName(e.target.value)}
                sx={{ width: "100%" }}
              />
              <InputLabel
                htmlFor="pref"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Reference Number
              </InputLabel>
              <Input
                id="pref"
                color="primary"
                placeholder="Reference number of the product"
                sx={{ width: "100%" }}
                value={pref}
                onChange={(e) => setPref(e.target.value)}
              />
              <InputLabel
                htmlFor="pgender"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Gender
              </InputLabel>
              <Input
                id="pgender"
                color="primary"
                placeholder="For whom is the product?"
                sx={{ width: "100%" }}
                value={pgender}
                onChange={(e) => setPGender(e.target.value)}
              />
              <InputLabel
                htmlFor="porigin"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Origin
              </InputLabel>
              <Input
                id="porigin"
                color="primary"
                placeholder="Where is the product from?"
                sx={{ width: "100%" }}
                value={porigin}
                onChange={(e) => setPOrigin(e.target.value)}
              />
              <InputLabel
                htmlFor="pProduceYear"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Produce Year
              </InputLabel>
              <Input
                type="date"
                id="pProduceYear"
                color="primary"
                placeholder="When was the product produced?"
                sx={{ width: "100%" }}
                value={pProduceYear}
                onChange={(e) => setPProduceYear(e.target.value)}
              />
              <InputLabel
                htmlFor="pdescription"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Description
              </InputLabel>
              <textarea
                id="pdescription"
                className="form-control"
                placeholder="Describe the product"
                value={pdescription}
                onChange={(e) => setPDescription(e.target.value)}
              />

              <InputLabel
                htmlFor="pimages"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Upload Images
              </InputLabel>
              <input
                id="pimages"
                style={{ width: "100%" }}
                type="file"
                required
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
              />

              <InputLabel
                htmlFor="pwatchStyle"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Watch Style
              </InputLabel>
              <Input
                id="pwatchStyle"
                color="primary"
                placeholder="Style of the watch"
                sx={{ width: "100%" }}
                value={watchStyle}
                onChange={(e) => setWatchStyle(e.target.value)}
              />

              {/* <InputLabel
                htmlFor="pweight"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Weight (grams)
              </InputLabel>
              <Input
                id="pweight"
                color="primary"
                placeholder="Weight of the product"
                sx={{ width: "100%" }}
                value={pweight}
                onChange={(e) => setPWeight(e.target.value)}
              /> */}
              <InputLabel
                htmlFor="pwarranty"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Warranty
              </InputLabel>
              <Input
                id="pwarranty"
                color="primary"
                placeholder="Years of warranty"
                sx={{ width: "100%" }}
                value={pwarranty}
                onChange={(e) => setPWarranty(e.target.value)}
              />
              <InputLabel
                htmlFor="plimited"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Limited
              </InputLabel>
              <Input
                type="checkbox"
                id="plimited"
                color="primary"
                placeholder="Is the product limited?"
                sx={{ width: "100%" }}
                value={plimited}
                onChange={(e) => setPLimited(!plimited)}
              />
              <InputLabel
                htmlFor="pprice"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Price
              </InputLabel>
              <Input
                id="pprice"
                color="primary"
                placeholder="Price of the product"
                sx={{ width: "100%" }}
                value={pprice}
                onChange={(e) => setPPrice(e.target.value)}
              />
              <InputLabel
                htmlFor="pinventory"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Inventory
              </InputLabel>
              <Input
                id="pinventory"
                color="primary"
                placeholder="Number of products in stock"
                sx={{ width: "100%" }}
                value={pinventory}
                onChange={(e) => setPInventory(e.target.value)}
              />

              {/* <Label htmlFor="pbrand-select">Brand</Label> */}
              <div className="w-100 d-flex align-items-between justify-content-start gap-5">
                <div>
                  <InputLabel
                    htmlFor="pbrand"
                    sx={{ marginTop: "10px" }}
                    style={{ fontWeight: "600", color: "black" }}
                  >
                    Brand
                  </InputLabel>
                  <select
                    name="pbrand"
                    id="pbrand"
                    value={psbrand}
                    onChange={(e) => {
                      setPSBrand(e.target.value);
                    }}
                    style={selectStyles} // Apply styles directly using the style attribute
                    onMouseEnter={() => {
                      // Apply hover effect
                      document.getElementById("pbrand").style.borderColor =
                        hoverStyles.borderColor;
                    }}
                    onMouseLeave={() => {
                      // Remove hover effect
                      document.getElementById("pbrand").style.borderColor =
                        selectStyles.borderColor;
                    }}
                    onFocus={() => {
                      // Apply focus effect
                      document.getElementById("pbrand").style.borderColor =
                        focusStyles.borderColor;
                    }}
                    onBlur={() => {
                      // Remove focus effect
                      document.getElementById("pbrand").style.borderColor =
                        selectStyles.borderColor;
                    }}
                  >
                    <option value=""></option>
                    {brands &&
                      brands.map((brand) => (
                        <option key={brand.id} value={brand.brandName}>
                          {brand.brandName}
                        </option>
                      ))}
                  </select>
                </div>
                <div
                  style={{
                    flex: "1",
                    display: `${psbrand === "" ? "block" : "none"}`,
                  }}
                >
                  <InputLabel
                    htmlFor="paddbrand"
                    sx={{ marginTop: "10px" }}
                    style={{ fontWeight: "600", color: "black" }}
                  >
                    New Brand
                  </InputLabel>
                  <Input
                    id="paddbrand"
                    color="primary"
                    placeholder="Additional Brand"
                    sx={{ width: "100%" }}
                    value={pbrand}
                    onChange={(e) => setPBrand(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-100 d-flex align-items-between justify-content-start gap-5">
                <div>
                  <InputLabel
                    htmlFor="pfamily"
                    sx={{ marginTop: "10px" }}
                    style={{ fontWeight: "600", color: "black" }}
                  >
                    Family/Collection
                  </InputLabel>
                  <select
                    name="pfamily"
                    id="pfamily"
                    value={psfamily}
                    onChange={(e) => setPSFamily(e.target.value)}
                    style={selectStyles} // Apply styles directly using the style attribute
                    onMouseEnter={() => {
                      // Apply hover effect
                      document.getElementById("pfamily").style.borderColor =
                        hoverStyles.borderColor;
                    }}
                    onMouseLeave={() => {
                      // Remove hover effect
                      document.getElementById("pfamily").style.borderColor =
                        selectStyles.borderColor;
                    }}
                    onFocus={() => {
                      // Apply focus effect
                      document.getElementById("pfamily").style.borderColor =
                        focusStyles.borderColor;
                    }}
                    onBlur={() => {
                      // Remove focus effect
                      document.getElementById("pfamily").style.borderColor =
                        selectStyles.borderColor;
                    }}
                  >
                    <option value=""></option>
                    {families &&
                      families.map((family) => (
                        <option key={family.id} value={family.familyName}>
                          {family.familyName}
                        </option>
                      ))}
                  </select>
                </div>

                <div
                  style={{
                    flex: "1",
                    display: `${psfamily === "" ? "block" : "none"}`,
                  }}
                >
                  <InputLabel
                    htmlFor="paddfamily"
                    sx={{ marginTop: "10px" }}
                    style={{ fontWeight: "600", color: "black" }}
                  >
                    New Family/Collection
                  </InputLabel>
                  <Input
                    id="paddfamily"
                    color="primary"
                    placeholder="Additional Family/Collection"
                    sx={{ width: "100%" }}
                    value={pfamily}
                    onChange={(e) => setPFamily(e.target.value)}
                  />
                </div>
              </div>
              <div className="ad-add-prod-case">
                <InputLabel
                  htmlFor=""
                  sx={{ marginTop: "10px" }}
                  style={{
                    fontWeight: "600",
                    color: "black",
                    fontSize: "1rem",
                  }}
                >
                  Case
                </InputLabel>
                <InputLabel
                  htmlFor="pcmaterial"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Material
                </InputLabel>
                <Input
                  id="pcmaterial"
                  color="primary"
                  placeholder="Material of the case"
                  sx={{ width: "100%" }}
                  value={pmaterial}
                  onChange={(e) => setPMaterial(e.target.value)}
                />
                <InputLabel
                  htmlFor="pcdiameter"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Diameter
                </InputLabel>
                <Input
                  id="pcdiameter"
                  color="primary"
                  placeholder="Diameter of the case"
                  sx={{ width: "100%" }}
                  value={pdiameter}
                  onChange={(e) => setPDiameter(e.target.value)}
                />
                <InputLabel
                  htmlFor="pcshape"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Shape
                </InputLabel>
                <Input
                  id="pcshape"
                  color="primary"
                  placeholder="Shape of the case"
                  sx={{ width: "100%" }}
                  value={pshape}
                  onChange={(e) => setPShape(e.target.value)}
                />
                <InputLabel
                  htmlFor="pcback"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Back
                </InputLabel>
                <Input
                  id="pcback"
                  color="primary"
                  placeholder="Back of the case"
                  sx={{ width: "100%" }}
                  value={pback}
                  onChange={(e) => setPBack(e.target.value)}
                />
                <InputLabel
                  htmlFor="pcwaterproof"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Waterproof
                </InputLabel>
                <Input
                  id="pcwaterproof"
                  color="primary"
                  placeholder="Waterproof of the case"
                  sx={{ width: "100%" }}
                  value={pwaterproof}
                  onChange={(e) => setPWaterproof(e.target.value)}
                />
                <InputLabel
                  htmlFor="pcthickness"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Thickness
                </InputLabel>
                <Input
                  id="pcthickness"
                  color="primary"
                  placeholder="Thickness of the case"
                  sx={{ width: "100%" }}
                  value={pthickness}
                  onChange={(e) => setPThickness(e.target.value)}
                />
                <InputLabel
                  htmlFor="pcbezel"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Bezel
                </InputLabel>
                <Input
                  id="pcbezel"
                  color="primary"
                  placeholder="Bezel of the case"
                  sx={{ width: "100%" }}
                  value={pbezel}
                  onChange={(e) => setPBezel(e.target.value)}
                />
                <InputLabel
                  htmlFor="pccrystal"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Crystal
                </InputLabel>
                <Input
                  id="pccrystal"
                  color="primary"
                  placeholder="Crystal of the case"
                  sx={{ width: "100%" }}
                  value={pcrystal}
                  onChange={(e) => setPCrystal(e.target.value)}
                />
                {/* <InputLabel
                  htmlFor="pclugwidth"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Lug Width
                </InputLabel>
                <Input
                  id="pclugwidth"
                  color="primary"
                  placeholder="Lug Width of the case"
                  sx={{ width: "100%" }}
                  value={plugwidth}
                  onChange={(e) => setPLugWidth(e.target.value)}
                /> */}
                {/* <InputLabel
                  htmlFor="pccrystaldescription"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Crystal Description
                </InputLabel>
                <Input
                  id="pccrystaldescription"
                  color="primary"
                  placeholder="Crystal Description of the case"
                  sx={{ width: "100%" }}
                  value={pcrystaldescription}
                  onChange={(e) => setPCrystalDescription(e.target.value)}
                /> */}
              </div>
              <div className="ad-add-prod-movement">
                <InputLabel
                  htmlFor=""
                  sx={{ marginTop: "10px" }}
                  style={{
                    fontWeight: "600",
                    color: "black",
                    fontSize: "1rem",
                  }}
                >
                  Movement
                </InputLabel>

                {/* select movement */}
                <div>
                  <InputLabel
                    htmlFor="psmovement"
                    sx={{ marginTop: "10px" }}
                    style={{ fontWeight: "600", color: "black" }}
                  >
                    Select Movement
                  </InputLabel>
                  <select
                    name="psmovement"
                    id="psmovement"
                    value={psmovement}
                    onChange={(e) => setPSMovement(e.target.value)}
                    style={selectStyles} // Apply styles directly using the style attribute
                    onMouseEnter={() => {
                      // Apply hover effect
                      document.getElementById("psmovement").style.borderColor =
                        hoverStyles.borderColor;
                    }}
                    onMouseLeave={() => {
                      // Remove hover effect
                      document.getElementById("psmovement").style.borderColor =
                        selectStyles.borderColor;
                    }}
                    onFocus={() => {
                      // Apply focus effect
                      document.getElementById("psmovement").style.borderColor =
                        focusStyles.borderColor;
                    }}
                    onBlur={() => {
                      // Remove focus effect
                      document.getElementById("psmovement").style.borderColor =
                        selectStyles.borderColor;
                    }}
                  >
                    <option value=""></option>
                    {movements &&
                      movements.map((mvt) => (
                        <option key={mvt.id} value={mvt.name}>
                          {mvt.name}
                        </option>
                      ))}
                  </select>
                </div>

                {psmovement === "" && (
                  <div>
                    <InputLabel
                      htmlFor="pmname"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Movement Name
                    </InputLabel>
                    <Input
                      id="pmname"
                      color="primary"
                      placeholder="Name of the movement"
                      sx={{ width: "100%" }}
                      value={pmname}
                      onChange={(e) => setPMName(e.target.value)}
                    />

                    {/* <InputLabel
                      htmlFor="pmreference"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Reference
                    </InputLabel>
                    <Input
                      id="pmreference"
                      color="primary"
                      placeholder="Reference of the movement"
                      sx={{ width: "100%" }}
                      value={pmReferece}
                      onChange={(e) => setPMReference(e.target.value)}
                    /> */}

                    {/* private String type;  //ok
    private String power;  // */}
                    <InputLabel
                      htmlFor="pmtype"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Type
                    </InputLabel>
                    <Input
                      id="pmtype"
                      color="primary"
                      placeholder="Type of the movement"
                      sx={{ width: "100%" }}
                      value={pmtype}
                      onChange={(e) => setPMType(e.target.value)}
                    />
                    {/* <InputLabel
                      htmlFor="pmpower"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Power
                    </InputLabel>
                    <Input
                      id="pmpower"
                      color="primary"
                      placeholder="Power of the movement"
                      sx={{ width: "100%" }}
                      value={pmpower}
                      onChange={(e) => setPMPower(e.target.value)}
                    /> */}
                    <InputLabel
                      htmlFor="pmpowerReserve"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Power Reserve
                    </InputLabel>
                    <Input
                      id="pmpowerReserve"
                      color="primary"
                      placeholder="Power Reserve of the movement"
                      sx={{ width: "100%" }}
                      value={pmpowerReserve}
                      onChange={(e) => setPMPowerReserve(e.target.value)}
                    />
                    {/* <InputLabel
                      htmlFor="pmorigin"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Origin
                    </InputLabel>
                    <Input
                      id="pmorigin"
                      color="primary"
                      placeholder="Origin of the movement"
                      sx={{ width: "100%" }}
                      value={pmorigin}
                      onChange={(e) => setPMOrigin(e.target.value)}
                    /> */}

                    <InputLabel
                      htmlFor="pmfunctions"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Functions
                    </InputLabel>
                    <Input
                      id="pmfunctions"
                      color="primary"
                      placeholder="Functions of the movement"
                      sx={{ width: "100%" }}
                      value={pmfunctions}
                      onChange={(e) => setPMFunctions(e.target.value)}
                    />

                    <InputLabel
                      htmlFor="pmcalendar"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Calendar
                    </InputLabel>
                    <Input
                      id="pmcalendar"
                      color="primary"
                      placeholder="Calendar description of the movement"
                      sx={{ width: "100%" }}
                      value={pmcalendar}
                      onChange={(e) => setPMCalendar(e.target.value)}
                    />

                    {/* <InputLabel
                      htmlFor="pmcaliber"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Caliber
                    </InputLabel>
                    <Input
                      id="pmcaliber"
                      color="primary"
                      placeholder="Caliber of the movement"
                      sx={{ width: "100%" }}
                      value={pmcaliber}
                      onChange={(e) => setPMCaliber(e.target.value)}
                    /> */}

                    {/* <InputLabel
                      htmlFor="pmjewels"
                      sx={{ marginTop: "10px" }}
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Jewels
                    </InputLabel>
                    <Input
                      id="pmjewels"
                      color="primary"
                      placeholder="Caliber of the movement"
                      sx={{ width: "100%" }}
                      value={pmjewels}
                      onChange={(e) => setPMJewels(e.target.value)}
                    /> */}
                  </div>
                )}
              </div>
              <div className="ad-add-prod-dial">
                <InputLabel
                  htmlFor=""
                  sx={{ marginTop: "10px" }}
                  style={{
                    fontWeight: "600",
                    color: "black",
                    fontSize: "1rem",
                  }}
                >
                  Dials
                </InputLabel>
                {dials.map((dial, index) => (
                  <div key={index}>{dial}</div>
                ))}
                {(dials.length === 0 ||
                  (dialColorData.length > 0 &&
                    dialIndexesData.length > 0 &&
                    dialHandsData.length > 0 &&
                    dialTypeData.length > 0 &&
                    dialLuminescenceData.length > 0 &&
                    dialImgFileData.length > 0)) && (
                  <button type="button" onClick={handleAddDialClick}>
                    add dial
                  </button>
                )}
              </div>
              <div>
                <InputLabel
                  htmlFor=""
                  sx={{ marginTop: "10px" }}
                  style={{
                    fontWeight: "600",
                    color: "black",
                    fontSize: "1rem",
                  }}
                >
                  Band/Strap/Bracelet
                </InputLabel>
                {/* <InputLabel
                  htmlFor="pbref"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Reference
                </InputLabel>
                <Input
                  id="pbref"
                  color="primary"
                  placeholder="Reference"
                  sx={{ width: "100%" }}
                  value={pbref}
                  onChange={(e) => setPBRef(e.target.value)}
                /> */}

                <InputLabel
                  htmlFor="pbmaterial"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Material
                </InputLabel>
                <Input
                  id="pbmaterial"
                  color="primary"
                  placeholder="Material"
                  sx={{ width: "100%" }}
                  value={pbmaterial}
                  onChange={(e) => setPBMaterial(e.target.value)}
                />

                <InputLabel
                  htmlFor="pbcolor"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Color
                </InputLabel>
                <Input
                  id="pbcolor"
                  color="primary"
                  placeholder="Color"
                  sx={{ width: "100%" }}
                  value={pbcolor}
                  onChange={(e) => setPBColor(e.target.value)}
                />

                <InputLabel
                  htmlFor="pbtype"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Type
                </InputLabel>
                <Input
                  id="pbtype"
                  color="primary"
                  placeholder="Type"
                  sx={{ width: "100%" }}
                  value={pbtype}
                  onChange={(e) => setPBType(e.target.value)}
                />

                <InputLabel
                  htmlFor="pbclasp"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Clasp/Buckle
                </InputLabel>
                <Input
                  id="pbclasp"
                  color="primary"
                  placeholder="Clasp/Buckle"
                  sx={{ width: "100%" }}
                  value={pbclasp}
                  onChange={(e) => setPBCLasp(e.target.value)}
                />
                {/* width, length */}
                <InputLabel
                  htmlFor="pbwidth"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Width
                </InputLabel>
                <Input
                  id="pbwidth"
                  color="primary"
                  placeholder="Width"
                  sx={{ width: "100%" }}
                  value={pbwidth}
                  onChange={(e) => setPBWidth(e.target.value)}
                />
                <InputLabel
                  htmlFor="pblength"
                  sx={{ marginTop: "10px" }}
                  style={{ fontWeight: "600", color: "black" }}
                >
                  Length
                </InputLabel>
                <Input
                  id="pblength"
                  color="primary"
                  placeholder="Length"
                  sx={{ width: "100%" }}
                  value={pblength}
                  onChange={(e) => setPBLength(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        {/* <div className="col-6 d-flex align-items-start"></div> */}
      </div>
    </div>
  );
};

export default AddProduct;
