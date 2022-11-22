import React, { useState, useEffect } from "react";

import styles from "./SearchBar.module.scss";
import { Select, DatePicker, Collapse } from "antd";
import { useAPI } from "../../context/CapsuleProvider";
import moment from "moment";

const { Panel } = Collapse;

const SearchBar = () => {
  const [statusOption, setStatusOption] = useState([]);
  const [typeOption, setTypeOption] = useState([]);
  const [statusSelect, setStatusSelect] = useState([]);
  const [typeSelect, setTypeSelect] = useState([]);
  const [dateSelect, setDateselect] = useState(null);

  const { data, isLoading, setFilterData } = useAPI();
  const { RangePicker } = DatePicker;

  const onFilter = (e) => {
    e.preventDefault();
    console.log(statusSelect, typeSelect, dateSelect);
    let tempFiltered = data.filter(
      (item) =>
        (statusSelect.length === 0 ||
          statusSelect.length === statusOption.length ||
          (statusSelect.length > 0 && statusSelect.includes(item.status))) &&
        (typeSelect.length === 0 ||
          typeSelect.length === typeOption.length ||
          (typeSelect.length > 0 && typeSelect.includes(item.type))) &&
        (dateSelect === null ||
          (dateSelect[0] <= moment.unix(item.original_launch_unix) &&
            dateSelect[1] >= moment.unix(item.original_launch_unix)))
    );
    setFilterData(tempFiltered);
  };

  useEffect(() => {
    // get options for filter
    if (!isLoading) {
      let tempstatus = [];
      let temptype = [];
      data.forEach((element) => {
        tempstatus.push(element.status);
        temptype.push(element.type);
      });
      setStatusOption(
        [...new Set(tempstatus)].map((item) => ({ label: item, value: item }))
      );
      setTypeOption(
        [...new Set(temptype)].map((item) => ({ label: item, value: item }))
      );
    }
  }, [data, isLoading]);

  return (
    <section className={styles.SearchBar}>
      <Collapse>
        <Panel header="Filters">
          <form className="block w-full m-auto sm:flex sm:justify-between sm:w-full px-4">
            <div className="w-full sm:w-1/4">
              <label className="block" id="status">
                Status:{" "}
              </label>
              <Select
                mode="multiple"
                allowClear
                htmlFor="status"
                style={{
                  width: "100%",
                }}
                placeholder="Select status"
                onChange={(value) => setStatusSelect(value)}
                options={statusOption}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="block" id="type">
                Type:{" "}
              </label>
              <Select
                mode="multiple"
                allowClear
                htmlFor="type"
                style={{
                  width: "100%",
                }}
                placeholder="Select status"
                onChange={(value) => setTypeSelect(value)}
                options={typeOption}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="block">Launch Date: </label>
              <RangePicker
                className="w-full "
                onChange={(val) =>
                  setDateselect(
                    val !== null
                      ? [
                          val[0].set({ h: 0, m: 0, s: 0 }),
                          val[1].set({ h: 23, m: 59, s: 59 }),
                        ]
                      : null
                  )
                }
              />
            </div>
            <button
              className="block my-3 mx-auto  w-28 h-9  border-b-4 border-solid border-sky-800 text-white font-semibold text-sm sm:mx-0 sm:mb-0 sm:mt-auto rounded-lg bg-sky-500 hover:border-none"
              onClick={onFilter}
            >
              Apply Filter
            </button>
          </form>
        </Panel>
      </Collapse>
    </section>
  );
};

export default SearchBar;
