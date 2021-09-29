import React, { useState, useEffect } from "react";
import Loading from "../Loading";

import ErrorPage from "../ErrorPage";
import ReadTable from "./ReadTable";
import makeCall from "../../axios-calls";

const ReadBooksPage = () => {
  const [pageError, setPageError] = useState(false);
  const [readBooks, setReadBooks] = useState();

  // Display Error Handling
  const errorHandler = (error) => {
    console.log(error)
    setPageError(true)
  }

  useEffect(() => {
    makeCall('get', 'collection/get', { collection_id: 'read' })
      .then((response) => setReadBooks(response.data))
      .catch(error => errorHandler(error));
  }, []);

  if (pageError) {
    return <ErrorPage />
  }

  return (
    <>
      {!readBooks ?
        <Loading />
        :
        <ReadTable
          readBooks={readBooks}
        />
      }
    </>
  );
};

export default ReadBooksPage;
