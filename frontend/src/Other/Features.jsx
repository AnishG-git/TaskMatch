import styled from "styled-components";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbarp from "../Navbar/Navbarp"; // Assuming Navbarp is correctly implemented
import "../../index.css";
// Styled components
const PageContainer = styled.div`
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 20px 20px;
`;

const Title = styled.h1`
  color: #0056b3;
  font-size: 2.4rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-top: 10px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.h3`
  background-color: #0056b3;
  color: white;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 8px 8px 0 0;
`;

const CardBody = styled.div`
  padding: 20px;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
`;

const FeatureIcon = styled.img`
  width: 50px;
  height: auto;
  margin-bottom: 15px;
`;

// FeaturesPage component
const FeaturesPage = () => {
  return (
    <PageContainer>
      <Navbarp />
      <Header>
        <Title style={{ color: "white" }}>Explore Our Features</Title>
        <Subtitle style={{ color: "whitesmoke" }}>
          Connecting clients with the right contractors to get tasks done
          efficiently.
        </Subtitle>
      </Header>
      <FeaturesGrid>
        <FeatureCard>
          <CardHeader>Wide Range of Services</CardHeader>
          <CardBody>
            <FeatureIcon src="icons/service-range.svg" alt="Services Range" />
            Whether you need a plumber, painter, or personal trainer, our
            extensive network covers all your needs.
          </CardBody>
        </FeatureCard>
        <FeatureCard>
          <CardHeader>User-Friendly Interface</CardHeader>
          <CardBody>
            <FeatureIcon src="icons/user-friendly.svg" alt="User-Friendly" />
            Easily post a task with our simple form, or browse contractor
            profiles to find your perfect match.
          </CardBody>
        </FeatureCard>
        <FeatureCard>
          <CardHeader>Secure Payments</CardHeader>
          <CardBody>
            <FeatureIcon src="icons/secure-payment.svg" alt="Secure Payments" />
            Pay through our secure platform with confidence. Funds are only
            released when you're 100% satisfied.
          </CardBody>
        </FeatureCard>
        <FeatureCard>
          <CardHeader>Real-Time Notifications</CardHeader>
          <CardBody>
            <FeatureIcon
              src="icons/real-time.svg"
              alt="Real-Time Notifications"
            />
            Stay updated with real-time alerts and notifications about the
            progress of your tasks.
          </CardBody>
        </FeatureCard>
        <FeatureCard>
          <CardHeader>Customer Support</CardHeader>
          <CardBody>
            <FeatureIcon
              src="icons/customer-support.svg"
              alt="Customer Support"
            />
            Our dedicated support team is here to help you with any issues or
            questions you may have.
          </CardBody>
        </FeatureCard>
        <FeatureCard>
          <CardHeader>Reviews and Ratings</CardHeader>
          <CardBody>
            <FeatureIcon src="icons/reviews.svg" alt="Reviews and Ratings" />
            Check reviews and ratings of contractors to ensure you choose the
            best professional for your task.
          </CardBody>
        </FeatureCard>
      </FeaturesGrid>
    </PageContainer>
  );
};

export default FeaturesPage;
