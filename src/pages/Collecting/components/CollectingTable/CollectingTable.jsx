import { useEffect, useState } from "react";

import { Paper, Table, TableContainer } from "@mui/material";
import PropTypes from "prop-types";

import sortedData from "@utils/sortedData";
import FiltersTable from "./FiltersTable";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

import styles from "./Table.module.scss";

const CollectingTable = ({ sessionId, products }) => {
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    setSortedProducts([...products]);
  }, [products]);

  const changeDirectionHandle = (key, direction) => {
    setSortedProducts(sortedData(products, key, direction));
  };

  const handleInputChange = (e) => {
    setSortedProducts(
      [...products].filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.table}>
      <FiltersTable
        sessionId={sessionId}
        handleInputChange={(e) => handleInputChange(e)}
      />
      <TableContainer
        component={Paper}
        elevation={0}
        className={styles.container}
      >
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="collapsible table"
        >
          <TableHeader
            changeDirection={(key, direction) =>
              changeDirectionHandle(key, direction)
            }
          />
          <TableContent products={sortedProducts} />
        </Table>
      </TableContainer>
    </div>
  );
};

CollectingTable.propTypes = {
  sessionId: PropTypes.string,
  products: PropTypes.array,
};

export default CollectingTable;
