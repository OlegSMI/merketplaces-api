const sortedData = (products, key) => {
  let sortableItems = [...products];
  //   if (key) {
  //     sortableItems.sort((a, b) => {
  //       if (a[key] < b[key]) {
  //         return sortConfig.direction === "asc" ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === "asc" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  return sortableItems;
};

export default sortedData;
