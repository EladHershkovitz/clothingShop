import React from "react";
import { connect } from "react-redux";
import { SelectCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collection.styles.scss";
const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  console.log(collection.items);
  return (
    <div className="collection">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem item={item} key={item.id}></CollectionItem>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  collection: SelectCollection(ownProps.match.params.collectionId)(state)
});
export default connect(mapStateToProps)(CollectionPage);
