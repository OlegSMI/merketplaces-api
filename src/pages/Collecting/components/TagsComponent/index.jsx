import PropTypes from "prop-types";
import TagsInput from "./TagsInput";
import styles from "./TagsInput.module.scss";

const TagsComponent = ({ articles }) => {
  return (
    <>
      {articles.length > 0 && (
        <div className={styles.chipsContainerWrapper}>
          <TagsInput
            tags={articles}
            variant="outlined"
            id="tags"
            name="tags"
            label="Найденные артикулы"
            disabled
          />
        </div>
      )}
    </>
  );
};

TagsComponent.propTypes = {
  articles: PropTypes.array,
};

export default TagsComponent;
