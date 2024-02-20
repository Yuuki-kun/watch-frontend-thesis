import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const ProductView = () => {
  const { reference } = useParams();
  const [watchDetails, setWatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(reference);

  useEffect(() => {
    const fetchWatch = async () => {
      try {
        const response = await axios.get(`/products/details/${reference}`);
        setWatchDetails(response.data);
        setLoading(false);
        console.log(response?.data);
        console.log(response.status);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWatch();
  }, [reference]);

  return <>{loading ? <div>Loading items...</div> : <div></div>}</>;
};

export default ProductView;
