const sortedData = (products) => {};

export default sortedData;

//   const sortedData = React.useMemo(() => {
//     let sortableItems = [...filterProducts];
//     console.log(sortableItems);
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [filterProducts, sortConfig]);
