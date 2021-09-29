import React from "react";
import { Button, Space, Divider } from "antd";

import Review from "./Review";

const styles = {
  container: { display: "flex", flexDirection: "row" , justifyContent:"space-between", marginTop: '20px'},
  removeMargin: {margin: '0 0 0 0'}
};

const CommunityReviews = ({
  userReview,
  bookReviews,
  deleteLoading,
  deleteReview,
  toggleReviewModal,
}) => {
  return (
    <>
      <div style={styles.container}>
        <h1 >Community Reviews</h1>
        <Space >
          {userReview && userReview.review ? (
            <Button danger disabled={deleteLoading} onClick={deleteReview}>
              Delete Review
            </Button>
          ) : null}
          <Button type="primary" onClick={toggleReviewModal}>
            {userReview && userReview.review ? "Edit Review" : "Add Review"}
          </Button>
        </Space>
      </div>
      <Divider style={styles.marginTop}/>

      {userReview && userReview.review ? (
        <Review
          name={"Your review"}
          rating={userReview.rating}
          review={userReview.review}
        />
      ) : null}
      {bookReviews.reviews.map(
        ({ firstName, lastName, rating, review, userID }) => {
          return (
            <Review
              name={`${firstName} ${lastName}`}
              rating={rating}
              review={review}
              userID={userID}
              key={userID}
            />
          );
        }
      )}
    </>
  );
};

export default CommunityReviews;
