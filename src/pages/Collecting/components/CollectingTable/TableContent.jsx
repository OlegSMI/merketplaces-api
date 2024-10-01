import { TableBody } from "@mui/material";
import PropTypes from "prop-types";
import TableRowItem from "./TableRowItem";

const TableContent = ({ products }) => {
  return (
    <TableBody>
      {products?.map((item) => (
        <TableRowItem key={item.id} item={item} />
      ))}
    </TableBody>
  );
};

TableContent.propTypes = {
  products: PropTypes.array,
};

export default TableContent;
