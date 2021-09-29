import React, { useState, useCallback, useEffect } from "react";
import { Card, Layout, Divider, notification } from "antd";
import Loading from "../Loading";

import queryString from 'query-string';
import ErrorPage from "../ErrorPage";
import ChallengesTable from "./ChallengesTable";
import ChallengesHeader from "./ChallengesHeader";
import NoChallengeHeader from "./NoChallengeHeader";
import ChallengesMenu from "./ChallengesMenu";
import makeCall from "../../axios-calls";

const { Content } = Layout;

const ChallengesPage = (props) => {
  const [pageError, setPageError] = useState(false);
  const [challengeDetails, setChallengeDetails] = useState();
  const [challenges, setChallenges] = useState();
  const [challengeLoading, setChallengeLoading] = useState(false);

  const { id } = queryString.parse(props.location.search)

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

  const startChallenge = (target) => {
    setChallengeLoading(true);
    makeCall('post', 'challenge/create', {target: target})
      .then(() =>  {
        displaySuccess('Successfully started challenge.')
        getChallengeDetails();
        getChallenges();
        setChallengeLoading(false);
      })
      .catch(error => {
        displayError(error, 'Something went wrong, while trying to start challenge.')
        setChallengeLoading(false);
      });
  }
  

  const getChallengeDetails = useCallback(() =>
    makeCall('get', 'challenge/get' + (id === undefined ? '' : `/${id}`))
      .then(({data}) => {
        setChallengeDetails(data)
      })
      .catch((error) => errorHandler(error))
  , [id])

  const getChallenges = useCallback(() =>
    makeCall('get', 'challenge/get_all')
      .then(({data}) => {
        setChallenges(data)
      })
      .catch((error) => errorHandler(error))
  , [])


  useEffect(() => {
    getChallengeDetails();
    getChallenges();
  }, [getChallenges, getChallengeDetails]);

  if (pageError) {
    return <ErrorPage />
  }

  return (
    <>
      {!challenges || !challengeDetails ?
        <Loading />
        :
        <>
          <Layout style={{ marginTop: "20px" }}>
            <Layout style={{ backgroundColor: "#fff" }}>
              <ChallengesMenu
                challenges={challenges}
              />
              <Layout style={{ padding: "0 24px 24px" }}>
                <Card>
                  <Content>
                    {!challengeDetails.challenge ?
                      <NoChallengeHeader startChallenge={startChallenge} challengeLoading={challengeLoading} />
                      :
                      <ChallengesHeader challengeDetails={challengeDetails} current={!id} />
                    }
                    <Divider />
                    <ChallengesTable
                      challengeDetails={challengeDetails}
                    />
                  </Content>
                </Card>
              </Layout>
            </Layout>
          </Layout>
        </>
      }
    </>
  );
};

export default ChallengesPage;
