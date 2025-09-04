import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../redux/apiCalls/postApiCall";
import { json, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {
  createExistCateApi,
  createNewCateApi,
  fitchAllCategories,
} from "../redux/apiCalls/categoryApiCall";
import SelectWithSearch from "./SelectWithSearch.js";
import Select from "react-select";

const CreateExestCategory = () => {
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navicate = useNavigate();
  const [mainTitle, setmainTitle] = useState(null);
  const [branchTitle, setbranchTitle] = useState("");
  const [file1, setfile1] = useState("");
  const [file2, setfile2] = useState("");

  const submitCreateCategory = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // // Add multiple images
    // const files = [file, file2];
    // files.forEach((file) => {
    //   formData.append("images", file);
    // });

    const formData = new FormData();
    formData.append("images", file1); // الصورة الأولى

    // Add additional fields
    const newBranchTitle = toCamelCase(branchTitle);
    formData.append("branchTitle", newBranchTitle);
    formData.append("mainTitle", mainTitle?.value);
    dispatch(createExistCateApi(formData));
  };

  function toCamelCase(text) {
    return text
      .split(" ") // تقسيم النص عند المسافات
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  }

  useEffect(() => {
    if (isPostCreated === true) {
      // navicate("/products");
      setfile1("");
      setbranchTitle("");
      setmainTitle(null);
    }
  }, [isPostCreated, navicate]);

  useEffect(() => {
    dispatch(fitchAllCategories());
  }, []);

  const uniqueMainTitles = new Set();
  const filteredItems = categories.filter((item) => {
    if (item.mainTitle && !uniqueMainTitles.has(item.mainTitle)) {
      uniqueMainTitles.add(item.mainTitle);
      return true;
    }
    return false;
  });

  const options = filteredItems
    ? filteredItems.map((item) => ({
        value: item?.mainTitle,
        label: item?.mainTitle,
      }))
    : [];

  return (
    <Holder className="container">
      <Main>
        <h2 className="text-center">Create A Branch category</h2>
        <form onSubmit={submitCreateCategory}>
          {/* <input
            className="inputs"
            type="text"
            placeholder="category main title"
            onChange={(e) => setmainTitle(e.target.value)}
          /> */}
          <div className="w-64 mx-auto mt-10 mb-2">
            <Select
              options={options}
              value={mainTitle}
              onChange={setmainTitle}
              placeholder="Chose the main category"
              isSearchable
            />
          </div>
          <input
            value={branchTitle}
            className="inputs"
            type="text"
            placeholder="the new category branch title"
            onChange={(e) => setbranchTitle(e.target.value)}
          />
          <input
            type="file"
            name="file1"
            id="file1"
            className="d-none"
            onChange={(e) => setfile1(e.target.files[0])}
          />
          <label htmlFor="file1" className="btn btn-success w-100 mb-3 mt-1">
            Chose the branch category image
          </label>
          <div>
            {file1 && (
              <img
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  borderRadius: "10px",
                }}
                className="mb-3"
                alt=""
                src={URL.createObjectURL(file1)}
              />
            )}
          </div>
          {/* <input
            type="file"
            name="file2"
            id="file2"
            className="d-none"
            onChange={(e) => setfile2(e.target.files[0])}
          />
          <label htmlFor="file2" className="btn btn-success w-100 mb-3 mt-1">
            Chose the branch image
          </label>
          <div>
            {file2 && (
              <img
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  borderRadius: "10px",
                }}
                className="mb-3"
                alt=""
                src={URL.createObjectURL(file2)}
              />
            )}
          </div> */}
          <div className="">
            {loading ? (
              <button className="btn btn-success w-100 p-0">
                {" "}
                <RotatingLines
                  visible={true}
                  height="35"
                  width="35"
                  color="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </button>
            ) : (
              <button className="btn btn-primary w-100">
                Create The Branch
              </button>
            )}
          </div>
        </form>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  padding-top: 100px;
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
export default CreateExestCategory;
