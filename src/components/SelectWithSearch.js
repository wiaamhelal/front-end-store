import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fitchAllCategories } from "../redux/apiCalls/categoryApiCall";

const SelectWithSearch = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fitchAllCategories());
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  // const options = [
  //   //   { value: "apple", label: "تفاحة" },
  //   //   { value: "banana", label: "موز" },
  //   //   { value: "orange", label: "برتقال" },
  //   //   { value: "grape", label: "عنب" },
  //   categories?.map((item) => ({ value: item.title, label: item.title })),
  // ];

  const options = categories
    ? categories.map((item) => ({
        value: item?.branchTitle,
        label: item?.branchTitle,
      }))
    : [];

  return (
    <div className="w-64 mx-auto mt-10">
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder="اختر فاكهة..."
        isSearchable
      />
    </div>
  );
};

export default SelectWithSearch;
