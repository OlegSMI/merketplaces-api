import PropTypes from "prop-types";
import TagsInput from "./TagsInput";

const TagsComponent = ({ articles }) => {
  return (
    <>
      {articles.length > 0 && (
        <TagsInput
          tags={articles}
          variant="outlined"
          id="tags"
          name="tags"
          label="Найденные артикулы"
          disabled
        />
      )}
    </>
  );
};

TagsComponent.propTypes = {
  articles: PropTypes.array,
};

export default TagsComponent;
