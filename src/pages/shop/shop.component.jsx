import React from "react";
import { Route } from "react-router-dom";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { firestore, converCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import collectionOverviewComponent from "../../components/collection-overview/collection-overview.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends React.Component {
  state = {
    loading: true
  };
  unsubscribeFromSnapshop = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    this.unsubscribeFromSnapshop = collectionRef.onSnapshot(async snapshot => {
      const collectionMap = converCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ loading: false });
    });
  }
  componentWillUnmount() {}
  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={props => <CollectionOverviewWithSpinner isLoading={this.state.loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={this.state.loading} {...props} />} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});
export default connect(null, mapDispatchToProps)(Shop);
