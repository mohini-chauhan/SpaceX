import React, { useState } from "react";
import styles from "./Product.module.scss";
import productImg from "../assest/product.jpg";
import SearchBar from "../SearchBar/SearchBar";
import { useAPI } from "../../context/CapsuleProvider";
import { Modal, Pagination } from "antd";
import "antd/dist/antd.min.css";

const Product = () => {
  // Grab data from useAPI in global context
  const { isLoading, filterData } = useAPI();

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(9);
  // for setting the limit on no. of items displayed per page
  const dataPerPage = 9;

  // handling the change in the pagination value
  const handleChange = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(9);
    } else {
      setMinValue(dataPerPage * (value - 1));
      setMaxValue(value * dataPerPage);
    }
  };

  const info = (item) => {
    let date = new Date(item?.original_launch);
    Modal.info({
      title: `${item?.type}`,
      maskClosable: true,
      content: (
        <section>
          <p>Capsule: {item?.capsule_serial}</p>
          <p>Mission: {item?.missions[0]?.name}</p>
          <p>Type: {item?.type}</p>
          <p>Launch_Date: {date.toDateString()}</p>
          <p>Launch_Time: {date.toTimeString()}</p>
          <p>Details: {item?.details}</p>
        </section>
      ),
      onOk() {},
    });
  };

  return (
    <section className={styles.Product}>
      <SearchBar />
      {!isLoading ? (
        filterData.length === 0 ? (
          <p className="text-center">No results found</p>
        ) : (
          <section
            className={styles.Product__gridContainer}
            data-testid="products"
          >
            {filterData?.slice(minValue, maxValue).map((item, index) => (
              <figure key={index}>
                <img
                  src={productImg}
                  onClick={() => info(item)}
                  alt="icon"
                  className="m-auto "
                  data-testid="modal-open"
                />
                <section className="text-center">
                  <p>Serial Number:{item?.capsule_serial}</p>
                  <p>Status:{item?.status}</p>
                </section>
              </figure>
            ))}
          </section>
        )
      ) : (
        <p>Loading...</p>
      )}
      <section className={styles.Product__pagination}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={dataPerPage} //default size of page
          onChange={handleChange}
          total={filterData?.length} //total number of card data available
        />
      </section>
    </section>
  );
};

export default Product;
