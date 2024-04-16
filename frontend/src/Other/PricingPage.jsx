import styled from "styled-components";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbarp from "../Navbar/Navbarp"; // Assuming Navbarp is correctly implemented
import "../../index.css";

// Styled Components Definitions
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

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const PlanCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
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
  padding: 20px;
  font-size: 1.5rem;
  border-radius: 10px 10px 0 0;
  text-align: center;
`;

const CardBody = styled.div`
  padding: 20px;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
`;

const Price = styled.div`
  font-size: 2rem;
  color: #0056b3;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Feature = styled.li`
  margin-bottom: 10px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #0084ff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  width: 80%;
  margin: 20px auto 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// PricingPage component
const PricingPage = () => {
  return (
    <PageContainer>
      <Navbarp />
      <Header>
        <Title style={{ color: "white" }}>Our Pricing Plans</Title>
        <Subtitle style={{ color: "white" }}>
          Select the plan that best suits your needs
        </Subtitle>
      </Header>
      <PlansGrid>
        <PlanCard>
          <CardHeader>Basic</CardHeader>
          <CardBody>
            <Price>$29/mo</Price>
            <FeatureList>
              <Feature>Up to 5 active tasks</Feature>
              <Feature>Email support</Feature>
              <Feature>Access to all categories</Feature>
            </FeatureList>
            <Button>Choose Plan</Button>
          </CardBody>
        </PlanCard>
        <PlanCard>
          <CardHeader>Standard</CardHeader>
          <CardBody>
            <Price>$59/mo</Price>
            <FeatureList>
              <Feature>Up to 20 active tasks</Feature>
              <Feature>Priority email support</Feature>
              <Feature>Access to all categories</Feature>
              <Feature>Early access to new features</Feature>
            </FeatureList>
            <Button>Choose Plan</Button>
          </CardBody>
        </PlanCard>
        <PlanCard>
          <CardHeader>Premium</CardHeader>
          <CardBody>
            <Price>$99/mo</Price>
            <FeatureList>
              <Feature>Unlimited active tasks</Feature>
              <Feature>Phone & email support</Feature>
              <Feature>Access to all categories</Feature>
              <Feature>Personal account manager</Feature>
            </FeatureList>
            <Button>Choose Plan</Button>
          </CardBody>
        </PlanCard>
      </PlansGrid>
    </PageContainer>
  );
};

export default PricingPage;
