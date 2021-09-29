import React, { useState, useCallback, useEffect } from "react";
import { Layout, notification } from "antd";
import Loading from "../Loading";

import queryString from 'query-string';
import ErrorPage from "../ErrorPage";
import CollectionTable from "./CollectionTable";
import makeCall from "../../axios-calls";
import AddCollectionModal from "./AddCollectionModal";
import CollectionMenu from "./CollectionMenu";

const CollectionsPage = (props) => {
  const currentUser = localStorage.getItem("userID")
  const [pageError, setPageError] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState();
  const [collections, setCollections] = useState();
  const [addCollectionModal, setAddCollectionModal] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const displaySuccess = (message) => {
    notification['success']({
      message,
      placement: 'bottomLeft',
    })
  }
  const displayError = (error, message) => {
    console.log(error)
    notification['error']({
      message,
      placement: 'bottomLeft',
    })
  }

  // Display Error Handling
  const errorHandler = (error) => {
    console.log(error)
    setPageError(true)
  }
  
  // if userID == your id, what do we do? do we display delete buttons or not lol
  const { collectionID, userID } = queryString.parse(props.location.search)

  const addCollection = ({name}) => {
    setButtonLoading(true)
    makeCall('post', 'collection/modify_collection', {action: 'create', name: name, description: ''})
      .then(() =>  {
        toggleAddCollectionModal();
        displaySuccess('Successfully added collection.');
        getCollections();
        setButtonLoading(false)
      })
      .catch(error => {
        displayError(error, 'Something went wrong, while trying to add a collection.')
        setButtonLoading(false)
      });
  }

  const removeCollection = ({id}) => {
    setButtonLoading(true)
    makeCall('post', 'collection/modify_collection', {action: 'delete', collection_id: id})
      .then(() =>  {
        displaySuccess('Successfully removed.')
        getCollections();
        setButtonLoading(false)
      })
      .catch(error => {
        displayError(error, 'Something went wrong, while trying to remove a collection.')
        setButtonLoading(false)
      });
  }

  const removeBook = (bookID) => () => {
    setButtonLoading(true)
    makeCall('post', 'collection/modify_book', { collection_id: collectionID, book_id: bookID, action: 'remove'})
      .then(() =>  {
        displaySuccess('Successfully removed from collection.')
        getCollectionDetails();
        setButtonLoading(false)
      })
      .catch(error => {
        displayError(error, 'Something went wrong, while trying to remove book from collection.')
        setButtonLoading(false)
      });
  }

  const getCollectionDetails = useCallback(() =>
    makeCall('get', 'collection/get', { collection_id: collectionID, user_id: userID })
      .then(({data}) => {
        setCollectionDetails(data)
      })
      .catch((error) => errorHandler(error))
  , [userID, collectionID])

  const getCollections = useCallback(() =>
    makeCall('get', 'collection/get_all_ids', { user_id: userID })
      .then(({data}) => {
        setCollections(data)
      })
      .catch((error) => errorHandler(error))
  , [userID])

  useEffect(() => {
    getCollectionDetails();
    getCollections();
  }, [getCollectionDetails, getCollections]);

  if (pageError) {
    return <ErrorPage />
  }

  const toggleAddCollectionModal = () => {
    setAddCollectionModal(!addCollectionModal);
  }

  return (
    <>
      {!collections || !collectionDetails ?
        <Loading />
        :
        <>
          <AddCollectionModal
            loading={buttonLoading}
            onFinishAdd={addCollection}
            onFinishDelete={removeCollection}
            visible={addCollectionModal}
            toggleVisible={toggleAddCollectionModal}
            collections={collections}
          />
          <Layout style={{ marginTop: "20px" }}>
            <Layout style={{ backgroundColor: "#fff" }}>
              <CollectionMenu
                currentUser={currentUser}
                userID={userID}
                toggleAddCollectionModal={toggleAddCollectionModal}
                collections={collections}
              />
              <CollectionTable
                isOwner={currentUser === userID || !userID}
                collectionDetails={collectionDetails}
                removeBook={removeBook}
              />
            </Layout>
          </Layout>
        </>
      }
    </>
  );
};

export default CollectionsPage;
