import React, { useState , useEffect } from 'react'
import { Typography } from "antd";

import { useParams } from "react-router-dom";

import makeCall from "../../axios-calls";

import ErrorPage from "../ErrorPage";
import SimilarBooksTable from "./SimilarBooksTable";
import Loading from "../Loading";

const { Title } = Typography;

const SimilarBooksPage = props => {
  const { bookId, keys } = useParams();

  const [pageError, setPageError] = useState(false);
  const [bookResults, setBookResults] = useState();

  // Display Error Handling
  const errorHandler = (error) => {
    console.log(error)
    setPageError(true)
  }

  useEffect(() => {
    makeCall("get", 'search/find_similar', { bookId: bookId, keys: keys})
      .then((response) => setBookResults(response.data))
      .catch((error) => {
        errorHandler(error);
      });
  }, [bookId, keys]);

  if (pageError) {
    return <ErrorPage />;
  }
  
  return (
    <>
      {!bookResults ?
        <Loading />
        :
        <>
          <Title style={{ marginTop: "20px" }}>Recommendation Results</Title>
          <SimilarBooksTable books={bookResults} />
        </>
      }
    </>
  );
};

export default SimilarBooksPage;