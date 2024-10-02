import PropTypes from "prop-types";
import { useState } from "react";

import left from "@assets/left.svg";
import right from "@assets/right.svg";

const PaginationCustom = ({ paginateHandler }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const clickPaginate = (cnt) => {
    console.log(currentPage);

    if (currentPage + cnt < 0) {
      return;
    } else {
      setCurrentPage(currentPage + cnt);
      paginateHandler(currentPage + cnt);
    }
  };

  return (
    <div>
      <img src={left} onClick={() => clickPaginate(-1)} />
      <img src={right} onClick={() => clickPaginate(1)} />
    </div>
  );
};

PaginationCustom.propTypes = {
  paginateHandler: PropTypes.func,
};

export default PaginationCustom;
