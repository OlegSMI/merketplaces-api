import { Paper, Table, TableContainer } from "@mui/material";

import PropTypes from "prop-types";
import styles from "./Table.module.scss";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

const CollectingTable = ({ products }) => {
  // const [products, setProducts] = useState([]);
  // const [search, setSearch] = useState("");

  // const filterProducts = useMemo(() => {
  //   return products?.filter((item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [products, search]);

  const changeDirectionHandle = (key) => {
    console.log(key);
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
          <TableHeader changeDirection={(key) => changeDirectionHandle(key)} />
          <TableContent products={products} />
        </Table>
      </TableContainer>
    </div>
  );
};

CollectingTable.propTypes = {
  products: PropTypes.array,
};

export default CollectingTable;
