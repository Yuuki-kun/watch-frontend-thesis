import React, { useState } from "react";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
const Dial = ({
  idx,
  onColorChange,
  onIndexesChange,
  onHandsChange,
  onTypeChange,
  onLuminescenceChange,
  onGemSettingChange,
  onImgFileChange,
  size,
  onDelete,
}) => {
  const [color, setColor] = useState("");
  const [indexes, setIndexes] = useState("");
  const [hands, setHands] = useState("");
  const [type, setType] = useState("");
  const [luminescence, setLuminescence] = useState("");
  const [gemSetting, setGemSetting] = useState("");
  const [img, setImg] = useState(null);

  console.log("Dial -> index", idx);
  const handInputColorChange = (e) => {
    onColorChange(idx, e.target.value);
    setColor(e.target.value);
  };
  const handleDeleteClick = () => {
    onDelete(idx);
  };

  // return (
  //   <div>
  //     <label htmlFor="">Input</label>
  //     <input type="text" onChange={handleInputChange} />
  //     <button onClick={handleDeleteClick}>Delete</button>
  //   </div>
  // );
  return (
    <div className="add-prod-dial">
      <InputLabel
        sx={{ marginTop: "10px" }}
        style={{
          fontWeight: "600",
          color: "black",
          textDecoration: "underline",
        }}
      >
        {`Dial ${idx + 1}`}
      </InputLabel>
      <InputLabel
        htmlFor={`pcolor-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Color
      </InputLabel>
      <Input
        id={`pcolor-${idx}`}
        color="primary"
        placeholder="Color of the dial"
        sx={{ width: "100%" }}
        value={color}
        onChange={handInputColorChange}
      />

      <InputLabel
        htmlFor={`pindexes-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Indexes
      </InputLabel>
      <Input
        id={`pindexes-${idx}`}
        color="primary"
        placeholder="Indexes of the dial"
        sx={{ width: "100%" }}
        value={indexes}
        onChange={(e) => {
          setIndexes(e.target.value);
          onIndexesChange(idx, e.target.value);
        }}
      />

      <InputLabel
        htmlFor={`phands-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Hands
      </InputLabel>
      <Input
        id={`phands-${idx}`}
        color="primary"
        placeholder="Hands of the dial"
        sx={{ width: "100%" }}
        value={hands}
        onChange={(e) => {
          setHands(e.target.value);
          onHandsChange(idx, e.target.value);
        }}
      />
      {/* private String subDials;
      private String luminescence;
      private String gemSetting;
      private String img; */}
      <InputLabel
        htmlFor={`ptype-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Type
      </InputLabel>
      <Input
        id={`ptype-${idx}`}
        color="primary"
        placeholder="Type"
        sx={{ width: "100%" }}
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          onTypeChange(idx, e.target.value);
        }}
      />
      <InputLabel
        htmlFor={`pluminescence-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Luminescence
      </InputLabel>
      <Input
        id={`pluminescence-${idx}`}
        color="primary"
        placeholder="Which part of the dial luminescence?"
        sx={{ width: "100%" }}
        value={luminescence}
        onChange={(e) => {
          setLuminescence(e.target.value);
          onLuminescenceChange(idx, e.target.value);
        }}
      />
      {/* <InputLabel
        htmlFor={`pimg-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Images
      </InputLabel>
      <input
        id={`pimg-${idx}`}
        style={{ width: "100%" }}
        type="file"
        onChange={(e) => onImgFileChange(idx, e.target.files[0])}
      /> */}

      {/* <InputLabel
        htmlFor={`pgem-${idx}`}
        sx={{ marginTop: "10px" }}
        style={{ fontWeight: "600", color: "black" }}
      >
        Gem Setting
      </InputLabel>
      <Input
        id={`pgem-${idx}`}
        color="primary"
        placeholder="Gem Setting of the dial"
        sx={{ width: "100%" }}
        value={gemSetting}
        onChange={(e) => {
          setGemSetting(e.target.value);
          onGemSettingChange(idx, e.target.value);
        }}
      /> */}
      {idx === size - 1 && (
        <button
          className="btn btn-danger"
          style={{ marginTop: "10px" }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Dial;
