import React, { useState , useEffect } from 'react'
import { Typography, Row, Slider } from "antd";

import queryString from 'query-string';

import makeCall from "../../axios-calls";

import ErrorPage from "../ErrorPage";
import SearchTable from "./SearchTable";
import Loading from "../Loading";

const { Title, Text } = Typography;

const BookSearchPage = props => {
  const { mode, search } = queryString.parse(props.location.search)

  const [pageError, setPageError] = useState(false);
  const [filterStars, setFilterStars] = useState([0, 5]);
  const [bookResults, setBookResults] = useState();

  // Display Error Handling
  const errorHandler = (error) => {
    console.log(error)
    setPageError(true)
  }
  useEffect(() => {
    makeCall("get", 'search/filter_by', { mode: mode, keyword: search, limit: 50 })
      .then((response) => setBookResults(response.data))
      .catch((error) => {
        errorHandler(error);
      });
  }, [mode, search]);

  if (pageError) {
    return <ErrorPage />;
  }
  
  return (
    <>
      {!bookResults ?
        <Loading />
        :
        <>
          <Row
            type="flex"
            align="middle"
            justify="space-between"
          >
            <Title style={{ marginTop: "20px" }}>Search Results</Title>
            <Row>
              <Text strong style={{ paddingRight: "16px"}} >Rating Range</Text>
              <Slider 
                style={{ width: "100px" }} 
                marks={{0: '0 stars', 5: '5'}} 
                defaultValue={[0, 5]} 
                range 
                max={5} 
                min={0} 
                onChange={(val)=> setFilterStars(val)} 
              />
            </Row>
          </Row>
          <SearchTable books={bookResults} filterStars={filterStars} />
        </>
      }
    </>
  );
};

export default BookSearchPage;