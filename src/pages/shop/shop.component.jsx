import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';



// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container'
// import CollectionPage from '../collection/collection.component';
import collectionPageContainer from '../collection/collection.container';


// import WithSpinner from  '../../components/with-spinner/with-spinner.component'


// import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
// import { updateCollections } from '../../redux/shop/shop.action';
// import { fatchCollectionsStartAsync } from '../../redux/shop/shop.action';
import { fatchCollectionsStart } from '../../redux/shop/shop.action';


// import {selectIsCollectionFetching, selectIsCollectionLoadind} from '../../redux/shop/shop.selectors'
// import { selectIsCollectionLoadind} from '../../redux/shop/shop.selectors'




// const CollectionOverViewWithSpinner = WithSpinner(CollectionsOverview)

// const CollectionPagewWithSpinner = WithSpinner(CollectionPage)


// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

class ShopPage extends React.Component {
  // constructor(){
  //   super();

  //   this.state= {
  //     loading: true,
  //   }
  // }
/*
  state ={
    loading: true,
  }

  unsubscribeFromSnapshot = null;
  */

  componentDidMount(){
/*
   const {updateCollections} = this.props 


  const collectionRef = firestore.collection('collections')

  // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot=>{
  //     // console.log(snapshot);
  //     const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
  //     // console.log(collectionsMap);
  //     updateCollections(collectionsMap)
  //     this.setState({loading:false})
  //   })
  collectionRef.get().then(snapshot=>{
      // console.log(snapshot);
      const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
      // console.log(collectionsMap);
      updateCollections(collectionsMap)
      this.setState({loading:false})
    })


// fetch('https://firestore.googleapis.com/v1/projects/crown-clothing-8c233/databases/(default)/documents/collections')
// .then(response=>response.json())
// .then(collections => console.log(collections))
*/
   /*
    const {fatchCollectionsStartAsync} = this.props;
    fatchCollectionsStartAsync()
    */
   const {fatchCollectionsStart} = this.props;
    fatchCollectionsStart()

  }




  render(){

    // const {match, isCollectionFetcting, isCollectionLoadind} = this.props
    // const {loading} = this.state
    const {match} = this.props


  return(

    <div className='shop-page'>
      {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
       */}
      {/* <Route exact path={`${match.path}`} render={(props)=><CollectionOverViewWithSpinner isLoading={isCollectionFetcting} {...props} /> } /> */}
      <Route exact path={`${match.path}`} component = {CollectionsOverviewContainer} />

      {/* 
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}

      {/* <Route path={`${match.path}/:collectionId`} render = {(props)=> <CollectionPagewWithSpinner isLoading = {!isCollectionLoadind} {...props}  /> } /> */}

       <Route path={`${match.path}/:collectionId`} component={collectionPageContainer}  />

    </div>
  );

  }  
}

// const mapStateToProps = createStructuredSelector({
//   // isCollectionFetcting : selectIsCollectionFetching,
//   isCollectionLoadind: selectIsCollectionLoadind

// });

const mapDispatchToProps = dispatch =>({
  // updateCollections: collectionsMap=>dispatch(updateCollections(collectionsMap))
      // fatchCollectionsStartAsync: () => dispatch(fatchCollectionsStartAsync())
      fatchCollectionsStart: () => dispatch(fatchCollectionsStart())
})



export default connect( null, mapDispatchToProps)(ShopPage);
