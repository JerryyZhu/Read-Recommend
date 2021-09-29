import React, { useState, useCallback, useEffect } from "react";
import { notification, Tabs, Card } from "antd";

import { useParams } from "react-router-dom";
import axios from "axios";
import makeCall from "../../axios-calls";

import ErrorPage from "../ErrorPage"
import Loading from "../Loading";
import ReviewModal from "./ReviewModal";
import CommunityReviews from "./CommunityReviews";
import BookDetails from "./BookDetails";

import { mainCardStyle } from "./styles";
import RecommendationList from "./RecommendationList";
import RecommendationModal from "./RecommendationModal";
import FindSimilarModal from "./FindSimilarModal";
import CollectionDropdown from "./CollectionDropdown";
import BookCarousel from "./OurRecommendations/BookCarousel";

// TODO: define functions to handle /POST/ Recommendation modal

const { TabPane } = Tabs;

const BookDetailsPage = () => {
  const [bookDetail, setBookDetail] = useState();
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteRecommendationloading, setDeleteRecommendationLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [collections, setCollections] = useState();
  const [recommendations, setRecommendations] = useState();
  const [recommendationModal, setRecommendationModal] = useState(false);
  const [userRecommendation, setUserRecommendation] = useState(false);
  const [readCollection, setReadCollection] = useState();
  const [similarModal, setSimilarModal] = useState(false);
  const [smartRecommendations, setSmartRecommendations] = useState(false);

  const toggleReviewModal = () => {
    setReviewModal(!reviewModal);
  };

  const toggleRecommendationModal = () => {
    setRecommendationModal(!recommendationModal);
  };

  const toggleSimilarModal = () => {
    setSimilarModal(!similarModal);
  };

  const [userReview, setUserReview] = useState();
  const [bookReviews, setBookReviews] = useState();
  const { bookId } = useParams();

  // Display Error Handling
  const errorHandler = (error) => {
    console.log(error);
    setPageError(true);
  };

  const displaySuccess = (message) => {
    notification["success"]({
      message,
      placement: "bottomLeft",
    });
  };

  const displayError = (error, message) => {
    console.log(error);
    notification["error"]({
      message,
      placement: "bottomLeft",
    });
  };

  const getRecommendations = useCallback(() =>
    makeCall("get", `recommendation/get/${bookId}`)
      .then(({data}) => {
        setUserRecommendation(data.ownRecommendation);
        setRecommendations(data.otherRecommendations);
      })
      .catch((error) => errorHandler(error))
  , [bookId])

  const getUserReview = useCallback(() => 
    makeCall("get", `view_review/${bookId}`)
      .then((response) => {
        setUserReview(response.data)
      })
      .catch((error) => {
        setUserReview(null);
        if (error.response.data.error !== "Review not found.") {
          errorHandler(error);
        }
      })
  , [bookId])

  const getCollections = useCallback(() =>
    makeCall("get", "collection/get_all_ids", { book_id: bookId })
      .then(({data}) => {
        setCollections(data.collections);
      })
      .catch((error) => errorHandler(error))
  , [bookId])

  const getBookDetails = useCallback(() =>
    makeCall("get", `book/${bookId}`)
      .then(({data}) => {
        setBookDetail(data);
      })
      .catch((error) => errorHandler(error))
  , [bookId])

  const getSmartRecommendations = useCallback(() =>
    makeCall("get", `smart_recommendations/${bookId}`)
      .then(({data}) => {
        setSmartRecommendations(data.books);
      })
      .catch((error) => errorHandler(error))
  , [bookId])


  useEffect(() => {
    const getReadCollection = () => makeCall('get', 'collection/get', { collection_id: "read" })
    const getBookReviews = () =>
      makeCall("get", `get_all_book_reviews/${bookId}`);

    getRecommendations();
    getUserReview();
    getCollections();
    getBookDetails();
    getSmartRecommendations();
    axios
      .all([
        getReadCollection(),
        getBookReviews(),
      ])
      .then(
        axios.spread((...responses) => {
          setReadCollection(responses[0].data);
          setBookReviews(responses[1].data);
        })
      )
      .catch((error) => errorHandler(error));
  }, [bookId, getRecommendations, getUserReview, getCollections, getBookDetails, getSmartRecommendations]);

  const setRating = (rating) => {
    if (rating === 0) {
      // Rating components passes zero when there is no change in value
      return;
    }

    setRateLoading(true);
    makeCall("post", "create_or_edit_review", { book: bookId, rating: rating })
      .then(() => {
        displaySuccess("Successfully rated.");
        getUserReview();
        setRateLoading(false);
      })
      .catch((error) => {
        displayError(
          error,
          "Something went wrong, while trying to submit a rating."
        )
        setRateLoading(false);
      });
  };

  const setReview = ({ rating, review }) => {
    setReviewLoading(true);
    makeCall("post", "create_or_edit_review", { book: bookId, rating, review })
      .then(() => {
        toggleReviewModal();
        displaySuccess("Successfully reviewed.");
        getUserReview();
        setReviewLoading(false);
      })
      .catch((error) => {
        displayError(
          error,
          "Something went wrong, while trying to submit a review."
        )
        setReviewLoading(false);
      });
  };

  const setRecommendation = ({targetBook, reason}) => {
    makeCall("post", "recommendation/create_or_edit", { reason: reason, origin: bookId, target: targetBook})
      .then(() => {
        toggleRecommendationModal();
        displaySuccess("Successfully recommended.");
        getRecommendations();
      })
      .catch((error) =>
        displayError(
          error,
          "Something went wrong, while trying to submit a review."
        )
      );
  };

  const deleteReview = () => {
    setDeleteLoading(true);
    makeCall("post", "delete_review", {
      book: bookId,
    })
      .then(function (response) {
        displaySuccess("Successfully deleted.");
        getUserReview();
        setDeleteLoading(false);
      })
      .catch((error) => {
        displayError(error, "Something went wrong while deleting.")
        setDeleteLoading(false);
      });
  };

  const deleteRecommendation = () => {
    setDeleteRecommendationLoading(true);
    makeCall("post", "recommendation/delete", {
      origin: bookId,
    })
      .then(function (response) {
        displaySuccess("Successfully deleted.");
        getRecommendations();
        setDeleteRecommendationLoading(false);
      })
      .catch((error) => {
        displayError(error, "Something went wrong while deleting.")
        setDeleteRecommendationLoading(false)
      });
  }

  const addBookToCollection = (collectionId) => {
    makeCall("post", "collection/modify_book", {
      collection_id: collectionId,
      book_id: bookDetail.id,
      action: "add",
    })
      .then(() => {
        displaySuccess("Success.");
        getBookDetails();
        getCollections();
      })
      .catch((error) =>
        displayError(
          error,
          "Something went wrong, while trying to add a book to collection."
        )
      );
    };


  if (pageError) {
    return <ErrorPage />;
  }

  return (
    <>
      {!bookDetail || !bookReviews || !readCollection || !collections ? (
        <Loading />
      ) : (
        <>
          <ReviewModal
            loading={reviewLoading}
            onFinish={setReview}
            visible={reviewModal}
            toggleVisible={toggleReviewModal}
            userReview={userReview}
          />
          <FindSimilarModal
            bookId={bookId}
            visible={similarModal}
            toggleVisible={toggleSimilarModal}
          />
          <RecommendationModal
            loading={reviewLoading}
            onFinish={setRecommendation}
            visible={recommendationModal}
            toggleVisible={toggleRecommendationModal}
            userRecommendation={userRecommendation}
            readCollection={readCollection}
            bookId={bookId}
          />
          <BookDetails
            bookDetail={bookDetail}
            userReview={userReview}
            bookReviews={bookReviews}
            deleteReview={deleteReview}
            deleteLoading={deleteLoading}
            setRating={setRating}
            rateLoading={rateLoading}
            collections={collections}
            collectionDropdown={CollectionDropdown({readBool: bookDetail.read, collections, setCollections, toggleSimilarModal, addBookToCollection, bookDetail})}
          />
          <Card style={mainCardStyle}>
            <Tabs defaultActiveKey="1" size={"small"}>
              <TabPane tab="Community Reviews" key="1">
                <CommunityReviews
                  userReview={userReview}
                  bookReviews={bookReviews}
                  deleteReview={deleteReview}
                  deleteLoading={deleteLoading}
                  toggleReviewModal={toggleReviewModal}
                />
              </TabPane> Object.keys(object).length === 0
              <TabPane tab="User Recommendations" key="2">
                <RecommendationList deleteRecommendation={deleteRecommendation} deleteLoading={deleteRecommendationloading} recommendations={recommendations} userRecommendation={userRecommendation} toggleModal={toggleRecommendationModal}/>
              </TabPane>
              <TabPane tab="Our Recommendations" key="3">
                {!smartRecommendations ? 
                  <Loading />
                   : 
                  <BookCarousel books={smartRecommendations}/>
                }
              </TabPane>
            </Tabs>
          </Card>
        </>
      )}
    </>
  );
};

export default BookDetailsPage;
