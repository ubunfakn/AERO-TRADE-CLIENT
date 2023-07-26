import React from "react";

export default function Home() {
  return (
    <div id="home">
      <div className="col-md-10 offset-md-1 mt-5">
      <div className="heading_div_for_comments">
        <h2 id="service_heading" className="text-dark text-center mt-3 mb-4">
          What we serve?
        </h2>
        </div>
        <div className="card" id="testimonialCard">
          <div className="card-title mt-3">
          </div>
          <div className="card-body">
            <p className="about-text">
              Welcome to AERO-TRADE, the premier platform connecting aerospace
              manufacturers, vendors, and aircraft cabin component sellers with
              aviation professionals worldwide. Our user-friendly and secure
              platform offers a seamless trading experience, enabling buyers and
              sellers to interact and engage in efficient transactions. Our core
              services include:
            </p>
            <ol>
              <li>
                <p className="about-text">
                  Global Marketplace: Access an extensive inventory of aircraft
                  cabin components from trusted sellers worldwide. Explore a
                  diverse range of products, from seating solutions to cabin
                  electronics, all verified for quality and authenticity.
                </p>
              </li>
              <li>
                <p className="about-text">
                  Seamless Transactions: Enjoy hassle-free transactions with our
                  optimized checkout process and secure payment gateway. Our
                  platform ensures a smooth purchasing experience for buyers and
                  sellers, promoting confidence and reliability.
                </p>
              </li>
              <li>
                <p className="about-text">
                  Interactive Messaging: Foster direct communication between
                  buyers and sellers with our interactive messaging feature. Get
                  instant updates on product inquiries, negotiate prices, and
                  address any queries promptly.
                </p>
              </li>
              <li>
                <p className="about-text">
                  Customization and Agility: Tailor your purchasing experience
                  with advanced customization options. Our platform offers
                  filtering by product location, quantity, market price, and
                  estimated shipping date, ensuring precise results and quick
                  decision-making.
                </p>
              </li>
              <li>
                <p className="about-text">
                  Reliable Customer Support: Our dedicated support team is
                  always available to assist with any concerns or inquiries. We
                  value our users' satisfaction and strive to provide timely and
                  effective solutions to enhance their trading journey.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div id="testimonial" className="col-md-12">
        <div className="heading_div_for_comments">
        <h2 id="comment-heading" className="text-dark text-center mt-3 mb-4">
          What our clients speak about us?
        </h2>
        </div>
        <div id="commentCards">
          <div id="testimonialCard" className="card">
            <div className="card-body">
              <h5 className="d-flex">
                <em>John Smith,</em>
              </h5>
              <h6 className="d-flex">
                <em>CEO of JetTech Solutions</em>
              </h6>
              <div style={{ textAlign: "justify" }} className="container mt-4">
                <blockquote>
                  "I have been using [Your Aerospace Trading Website] for over a
                  year, and it has revolutionized the way we source aircraft
                  cabin components. The platform's user-friendly interface and
                  seamless interaction between buyers and sellers have
                  significantly boosted our efficiency and reduced procurement
                  time. Highly recommended!"
                </blockquote>
              </div>
            </div>
          </div>
          <div id="testimonialCard" className="card">
            <div className="card-body">
              <h5 className="d-flex">
                <em>Mary Johnson,</em>
              </h5>
              <h6 className="d-flex">
                <em>Aircraft Component Seller</em>
              </h6>
              <div style={{ textAlign: "justify" }} className="container mt-4">
                <blockquote>
                  "As a seller of aircraft cabin components, I cannot praise
                  [Your Aerospace Trading Website] enough. The platform's agile
                  features, such as real-time messaging and customizable
                  filters, have empowered me to reach a broader audience and
                  enhance my sales. It has become an essential tool for my
                  business growth."
                </blockquote>
              </div>
            </div>
          </div>
          <div id="testimonialCard" className="card">
            <div className="card-body">
              <h5 className="d-flex">
                <em>Michael Roberts,</em>
              </h5>
              <h6 className="d-flex">
                <em>Aviation Engineer</em>
              </h6>
              <div style={{ textAlign: "justify" }} className="container mt-4">
                <blockquote>
                  "I rely on [Your Aerospace Trading Website] for all my cabin
                  component needs. The platform's extensive inventory and
                  trusted sellers ensure that I find high-quality products at
                  competitive prices. The interactive messaging feature has
                  allowed me to clarify specifications directly with sellers,
                  streamlining the procurement process."
                </blockquote>
              </div>
            </div>
          </div>
          <div id="testimonialCard" className="card">
            <div className="card-body">
              <h5 className="d-flex">
                <em>Sarah Thompson,</em>
              </h5>
              <h6 className="d-flex">
                <em>Aircraft Interior Designer</em>
              </h6>
              <div style={{ textAlign: "justify" }} className="container mt-4">
                <blockquote>
                  "I love using [Your Aerospace Trading Website] to source
                  unique and premium cabin components for my design projects.
                  The platform's intuitive search options and diverse product
                  listings have saved me valuable time and added value to my
                  creative endeavors. It's a game-changer for aviation
                  professionals like me."
                </blockquote>
              </div>
            </div>
          </div>
          <div id="testimonialCard" className="card">
            <div className="card-body">
              <h5 className="d-flex">
                <em>Captain Amelia Evans,</em>
              </h5>
              <h6 className="d-flex">
                <em>Commercial Pilot</em>
              </h6>
              <div style={{ textAlign: "justify" }} className="container mt-4">
                <blockquote>
                  "As a pilot, having access to reliable and high-quality cabin
                  components is crucial. AeroTrade has become my go-to platform
                  for sourcing aircraft parts. The seamless interface, vast
                  inventory, and efficient messaging system have made my job so
                  much easier. I highly recommend AeroTrade to fellow aviation
                  professionals."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid d-flex mb-4">
        <h3>
          <em>
          <strong id="comp-text">"</strong>Join AeroTrade today and experience the unparalleled world of
          aerospace trading. Whether you're a buyer seeking top-notch cabin
          components or a seller looking to expand your reach, AeroTrade is your
          one-stop destination for all things aviation!<strong id="comp-text">"</strong>
          </em>
        </h3>
      </div>
      </div>
    </div>
  );
}
