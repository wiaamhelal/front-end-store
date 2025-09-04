import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  createadApi,
  fitchAllCategories,
} from "../redux/apiCalls/categoryApiCall";
import styled from "styled-components";

const DiscountAd = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dicountMount, setdiscountMount] = useState();

  const options = categories
    ? categories.map((item) => ({
        value: item?.mainTitle,
        label: item?.mainTitle,
      }))
    : [];
  const discountAmount = [5, 10, 15, 20, 25, 50, 75];
  const myurlphoto = categories.filter(
    (item) => item?.mainTitle == selectedOption?.label
  );
  const SubmitForm = () => {
    if (!selectedOption || !selectedOption.label) {
      console.error("يجب اختيار تصنيف (category).");
      return;
    }

    if (!dicountMount) {
      console.error("يجب تحديد قيمة الخصم (range).");
      return;
    }

    try {
      const adData = {
        category: selectedOption.label,
        range: dicountMount,
        url: myurlphoto[0]?.images[0]?.url,
      };
      dispatch(createadApi(adData));

      // يمكن عرض رسالة نجاح هنا إذا أردت
    } catch (error) {
      console.error("فشل إرسال النموذج:", error);
    }
  };

  useEffect(() => {
    dispatch(fitchAllCategories());
  }, []);

  return (
    <Holder>
      <Main className="container">
        <h1 className="text-center fw-bold">Discount ad</h1>
        <h4 className="text-center mb-3">
          Create a discound ad and post it in the main page of your website, go
          ahead and let the people know what you sell
        </h4>{" "}
        <div className="w-64 mx-auto mt-10 mb-2">
          <Select
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder="Chose a category"
            isSearchable
          />
        </div>
        <select
          className="inputs"
          onChange={(e) => setdiscountMount(e.target.value)}
          value={dicountMount}
        >
          <option>range of the discount</option>
          {discountAmount.map((item) => (
            <option value={item}>{item} %</option>
          ))}
        </select>
        <button
          className="btn btn-success w-100"
          disabled={!dicountMount || !selectedOption}
          onClick={SubmitForm}
        >
          Submit
        </button>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  padding-top: 120px;
`;
const Main = styled.div`
  max-width: 500px;
  margin: auto;
  background: white;
  padding: 10px;
  border-radius: 10px;
  & .inputs {
    padding: 5px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
    display: block;
    width: 100%;
    resize: none;
    margin-bottom: 10px;
  }
  & .file {
    display: block;
  }
`;
export default DiscountAd;
