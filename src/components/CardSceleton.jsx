import ContentLoader from "react-content-loader";

const CardSceleton = () => (
  <ContentLoader
    speed={2}
    width={220}
    height={350}
    viewBox="0 0 220 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="1" y="NaN" rx="0" ry="0" width="180" height="NaN" />
    <rect x="12" y="NaN" rx="0" ry="0" width="131" height="NaN" />
    <rect x="20" y="0" rx="0" ry="0" width="180" height="240" />
    <rect x="21" y="260" rx="10" ry="10" width="178" height="25" />
    <rect x="20" y="305" rx="0" ry="0" width="178" height="25" />
  </ContentLoader>
);

export default CardSceleton;
