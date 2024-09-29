import { Paper, Table, TableContainer } from "@mui/material";
import React, { useMemo, useState } from "react";

import styles from "./Table.module.scss";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

const CollectingTable = React.memo(function CollectingTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filterProducts = useMemo(() => {
    return products?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

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
          <TableHeader />
          <TableContent />
        </Table>
      </TableContainer>
    </div>
  );
});

export default CollectingTable;
