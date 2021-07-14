import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';



import { selectIsCollectionLoadind} from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component'

const mapStateToProps = createStructuredSelector({
  // isCollectionFetcting : selectIsCollectionFetching,
//   isCollectionLoadind: selectIsCollectionLoadind
      isLoading: state => !selectIsCollectionLoadind(state)

});

const collectionPageContainer = compose(
   connect(mapStateToProps),
   WithSpinner
)(CollectionPage)

export default collectionPageContainer