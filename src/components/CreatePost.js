import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../redux/apiCalls/postApiCall";
import { json, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { fitchAllCategories } from "../redux/apiCalls/categoryApiCall";
import SelectWithSearch from "./SelectWithSearch.js";
import Select from "react-select";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navicate = useNavigate();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const [title, settitle] = useState("");
  const [price, setprice] = useState(null);
  const [desc, setdesc] = useState("");
  // const [category, setcategory] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [files, setfiles] = useState([]);
  // const [file2, setfile2] = useState("");
  // const [file3, setfile3] = useState("");
  // const [file4, setfile4] = useState("");
  // const [file5, setfile5] = useState("");
  const [productDetails, setproductDetails] = useState("");
  const [color, setcolor] = useState("");
  const [colors, setcolors] = useState([]);
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    dispatch(fitchAllCategories());
  }, []);
  const chosenCategory = categories.filter(
    (item) => item?.branchTitle == selectedOption?.value
  );
  const submitColor = (e) => {
    e.preventDefault();
    setcolors([...colors, color]);
    setcolor("");
  };

  const submitCreatepost = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add multiple images
    // const files = [file, file2, file3, file4, file5]; // قائمة الملفات
    files.forEach((file) => {
      formData.append("images", file); // تأكد أن الاسم "images" مطابق للـ multer.array()
    });

    // Add additional fields
    formData.append("description", desc);
    formData.append("premium", premium);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", selectedOption?.value);
    formData.append("productDetails", productDetails);
    formData.append("mainCategory", chosenCategory[0]?.mainTitle);
    colors.forEach((color) => {
      formData.append("colors", color); // تأكد أن الاسم "images" مطابق للـ multer.array()
    });
    dispatch(createNewPost(formData));
  };

  useEffect(() => {
    if (isPostCreated === true) {
      navicate("/products");
    }
  }, [isPostCreated, navicate]);

  const options = categories
    ? categories.map((item) => ({
        value: item?.branchTitle,
        label: item?.branchTitle,
      }))
    : [];
  const sizeOptions = [
    {
      value: "small",
      label: "small",
    },
    {
      value: "medium",
      label: "medium",
    },
    {
      value: "large",
      label: "large",
    },
    {
      value: "X large",
      label: "X large",
    },
    {
      value: "XX large",
      label: "XX large",
    },
    {
      value: "XXX large",
      label: "XXX large",
    },
  ];
  const AvailableSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <Holder className="container">
      <Main>
        <h2 className="text-center">Create A Product</h2>
        <form onSubmit={submitCreatepost}>
          <input
            className="inputs"
            type="text"
            placeholder="product title"
            onChange={(e) => settitle(e.target.value)}
          />
          <input
            className="inputs"
            type="number"
            placeholder="procuct price"
            onChange={(e) => setprice(e.target.value)}
          />
          {/* <select
            className="inputs"
            onChange={(e) => setcolors(e.target.value)}
          >
            <option value="none">category</option>
            {categories.map((item) => (
              <option value={item?.branchTitle}>{item?.branchTitle}</option>
            ))}
          </select> */}
          {/* <SelectWithSearch /> */}
          <div className="w-64 mx-auto mt-10 mb-2">
            <Select
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Chose a category"
              isSearchable
            />
          </div>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <span>Available Sizes :</span>
            {AvailableSizes.map((item) => (
              <div className="d-flex align-items-center">
                {/* <input
                  type="checkbox"
                  id={item}
                  className="me-2"
                  onChange={() => setcolors(colors.push(item))}
                /> */}
                <input
                  type="checkbox"
                  id={item}
                  className="me-2"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setcolors([...colors, item]); // إضافة
                    } else {
                      setcolors(colors.filter((color) => color !== item)); // إزالة
                    }
                  }}
                />
                <label
                  htmlFor={item}
                  className=""
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center mb-3">
            <input
              type="checkbox"
              id="premium"
              className="me-2"
              onChange={() => setPremium(!premium)}
            />
            <label htmlFor="premium" className="" style={{ cursor: "pointer" }}>
              Premium Procuct
            </label>
          </div>

          <textarea
            onChange={(e) => setdesc(e.target.value)}
            className="inputs"
            placeholder="post description"
            rows={5}
          />
          <textarea
            onChange={(e) => setproductDetails(e.target.value)}
            className="inputs"
            placeholder="Product details"
            rows={5}
          />
          <input
            style={{ display: "none" }}
            type="file"
            multiple
            accept="image/*"
            name="file"
            id="file"
            onChange={(e) => setfiles([...e.target.files])}
          />
          <label htmlFor="file" className="btn btn-success w-100 mb-3 mt-1">
            Chose images
          </label>
          <div>
            {files &&
              files?.map((file) => (
                <img
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    borderRadius: "10px",
                  }}
                  className="mb-3"
                  alt=""
                  src={URL.createObjectURL(file)}
                />
              ))}
          </div>
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
              <button className="btn btn-primary w-100 ">
                Create The Product
              </button>
            )}
          </div>
        </form>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  padding-top: 80px;
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
export default CreatePost;
