import { Paper, Table, TableContainer } from "@mui/material";

import sortedData from "@utils/sortedData";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Table.module.scss";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

const CollectingTable = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([...products]);

  const changeDirectionHandle = (key, direction) => {
    setSortedProducts(sortedData(products, key, direction));
  };

  return (
    <div className={styles.table}>
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
  products: PropTypes.array,
};

export default CollectingTable;
