import React from "react";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <Holder>
      <Main className="container text-color">
        <h2 className=" lh-lg fw-bold">
          Discover the World of Trade Excellence
        </h2>
        <h5 className="fw-bold">About Us</h5>
        <p style={{ lineHeight: "1.6" }}>
          NPMC is a trusted and experienced real estate agency dedicated to
          helping individuals and families find their dream homes and investment
          properties. With a team of seasoned professionals, we provide
          personalized service and expert guidance throughout the entire real
          estate process.
        </p>
        <h5 className="fw-bold mb-3">Our Services</h5>
        <h6 className="fw-bold">Residential Real Estate</h6>
        <p style={{ lineHeight: "1.6" }}>
          Whether you're a first-time homebuyer or looking to upgrade, our
          residential real estate services cater to all your needs. Explore a
          diverse range of properties, from cozy apartments to spacious family
          homes.
        </p>
        <h6 className="fw-bold">Commercial Real Estate</h6>
        <p style={{ lineHeight: "1.6" }}>
          Investors and business owners, discover lucrative opportunities in the
          commercial real estate sector. We specialize in helping you find the
          perfect space for your business or investment portfolio.
        </p>
        <h6 className="fw-bold">Investment Properties</h6>
        Unlock the potential of real estate investment with our comprehensive
        services. We offer insights into market trends, property valuation, and
        strategic planning to maximize your returns.
        <p style={{ lineHeight: "1.6" }}></p>
        <h5 className="fw-bold mb-3">Buying and Selling Tips</h5>
        <h6 className="fw-bold">Buying a Property</h6>
        <p style={{ lineHeight: "1.6" }}>
          <span className="fw-bold">Financing Options:</span> Understand the
          various financing options available and determine what works best for
          your budget.
        </p>
        <p style={{ lineHeight: "1.6" }}>
          <span className="fw-bold">Location Matters:</span> Explore
          neighborhoods and consider factors like schools, amenities, and future
          development plans.
        </p>
        <p style={{ lineHeight: "1.6" }}>
          <span className="fw-bold">Home Inspections: </span> Prioritize
          professional home inspections to ensure the property is in good
          condition.
        </p>
        <h6 className="fw-bold">Selling a Property</h6>
        <p style={{ lineHeight: "1.6" }}>
          <span className="fw-bold">Pricing Strategy:</span> Set a competitive
          yet realistic price for your property based on market trends and
          comparable sales.
        </p>
        <p style={{ lineHeight: "1.6" }}>
          <span className="fw-bold">Curb Appeal:</span> Enhance your property's
          curb appeal to attract potential buyers. First impressions matter!
        </p>
        <p style={{ lineHeight: "1.6" }}>
          <span className="fw-bold">Effective Marketing:</span> Utilize online
          and offline marketing strategies to reach a wider audience.
        </p>
        <h5 className="fw-bold">Real Estate Market Trends</h5>
        <p style={{ lineHeight: "1.6" }}>
          Stay informed about the latest market trends, interest rates, and
          local developments. Our blog provides insightful articles and updates
          to help you make informed decisions in the ever-evolving real estate
          landscape.
        </p>
      </Main>
    </Holder>
  );
};
const Holder = styled.div``;
const Main = styled.div`
  padding-top: 80px;
`;
export default AboutUs;
