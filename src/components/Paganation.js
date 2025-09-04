import React from "react";
import styled from "styled-components";

const Paganation = ({ pages, setcurrentPage, currentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  return (
    <nav aria-label="..." className="d-flex justify-content-center">
      <ul class="pagination">
        <button
          class="page-item btn p-0"
          disabled={currentPage === 1}
          onClick={() => setcurrentPage((currentPage += -1))}
        >
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
            Previous
          </a>
        </button>
        {generatedPages.map((page) => (
          <li
            onClick={() => setcurrentPage(page)}
            key={page}
            class="page-item"
            aria-current="page"
          >
            <a class="page-link" href="#">
              {" "}
              {page}
            </a>
          </li>
        ))}
        <button
          class="page-item btn p-0"
          onClick={() => setcurrentPage((currentPage += 1))}
          disabled={currentPage === generatedPages.length}
        >
          <a class="page-link" href="#">
            Next
          </a>
        </button>
      </ul>
    </nav>
  );
};
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: auto;
`;
const Previous = styled.div``;
const Number = styled.div``;
const Next = styled.div``;

export default Paganation;
