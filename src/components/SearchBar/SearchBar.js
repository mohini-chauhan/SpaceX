import React, { useState, useEffect } from "react";

import styles from "./SearchBar.module.scss";
import { Select, Collapse } from "antd";
import { useAPI } from "../../context/CapsuleProvider";
import moment from "moment";

const { Panel } = Collapse;

const SearchBar = () => {
  const [statusOption, setStatusOption] = useState([]);
  const [typeOption, setTypeOption] = useState([]);
  const [missionOption, setMissionOption] = useState([]);
  const [statusSelect, setStatusSelect] = useState(null);
  const [typeSelect, setTypeSelect] = useState(null);
  const [missionSelect, setMissionSelect] = useState(null);

  const { data, isLoading, isFirstTime, setFilter } = useAPI();

  const onFilter = (e) => {
    e.preventDefault();
    setFilter({
      status: statusSelect,
      type: typeSelect,
      mission: missionSelect,
    });
  };

  useEffect(() => {
    // get options for filter
    if (!isFirstTime) {
      let tempstatus = [];
      let temptype = [];
      let tempmisson = [];
      data.forEach((element) => {
        tempstatus.push(element.status);
        temptype.push(element.type);
        tempmisson.push(...element.missions.map((item) => item.name));
      });
      setStatusOption(
        [...new Set(tempstatus)].map((item) => ({ label: item, value: item }))
      );
      setTypeOption(
        [...new Set(temptype)].map((item) => ({ label: item, value: item }))
      );
      setMissionOption(
        [...new Set(tempmisson)].map((item) => ({ label: item, value: item }))
      );
    }
  }, [isFirstTime]);

  return (
    <section className={styles.SearchBar} data-testid="collapse">
      <Collapse>
        <Panel header="Filters">
          <form className="block w-full m-auto sm:flex sm:justify-between sm:w-full px-4">
            <div className="w-full sm:w-1/4">
              <label className="block" id="status">
                Status:{" "}
              </label>
              <Select
                mode="single"
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
                mode="single"
                allowClear
                htmlFor="type"
                style={{
                  width: "100%",
                }}
                placeholder="Select type"
                onChange={(value) => setTypeSelect(value)}
                options={typeOption}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="block">Mission: </label>
              <Select
                mode="single"
                allowClear
                htmlFor="type"
                style={{
                  width: "100%",
                }}
                placeholder="Select mission"
                onChange={(value) => setMissionSelect(value)}
                options={missionOption}
              />
            </div>
            <button
              className="block my-3 mx-auto  w-28 h-9  border-b-4 border-solid border-sky-800 text-white font-semibold text-sm sm:mx-0 sm:mb-0 sm:mt-auto rounded-lg bg-sky-500 hover:border-none"
              onClick={onFilter}
              disabled={isLoading}
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
