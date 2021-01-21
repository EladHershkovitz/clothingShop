import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionOverview from "./collection-overview.component";
import { compose } from "redux";
const mapDispatchToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});
const CollectionOverviewContainer = compose(connect(mapDispatchToProps), WithSpinner)(CollectionOverview);
export default CollectionOverviewContainer;
