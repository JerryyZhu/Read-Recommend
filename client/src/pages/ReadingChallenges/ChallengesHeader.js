import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const ChallengesHeader = ({challengeDetails, current}) => (
  <div>
    <Title level={4}>30 Day Reading Challenge</Title>
    <Paragraph>
      You have {challengeDetails.challenge.completed ? "completed" : "not completed"} this challenge.
    </Paragraph>
    <Paragraph>
      You read {challengeDetails.books.length} / {challengeDetails.challenge.target} books in this challenge.
    </Paragraph>
    <Paragraph>
      This challenge started in {challengeDetails.challenge.startDate} and {current ? "ends" : "ended"} {challengeDetails.challenge.endDate}.
    </Paragraph>
  </div>
)

export default ChallengesHeader;