import React from "react";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="  text-gray-900 dark:text-white min-h-screen">
        <div className="w-1/2 container text-center mx-auto px-4 py-12">
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-bold mb-16 text-center">
            About Us
          </h1>

          <section className="mb-12 ">
            <p className="text-lg">
              Welcome to <span className="font-bold">DHive</span>, your number
              one source for
              <span className="font-bold">
                [Blog Niche/Topics, e.g., tech trends, travel tips, wellness
                advice, etc.]
              </span>
              . We're dedicated to giving you the very best of content, with a
              focus on quality, relevance, and inspiration.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              Our mission is to provide a platform where creativity, knowledge,
              and discovery converge. We aim to deliver content that not only
              informs but also inspires our readers to explore new ideas, engage
              in meaningful conversations, and share their stories.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-lg">
              Our dedicated team of writers, editors, and contributors work
              tirelessly to bring you the best content possible. Each member of
              our team is passionate about their craft and committed to
              providing valuable insights and engaging stories.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
            <p className="text-lg">
              On our blog, you'll find a variety of content including in-depth
              articles, how-to guides, opinion pieces, and the latest news in
              our niche. We strive to ensure that every piece of content is
              well-researched, thoroughly vetted, and presented in an engaging
              and accessible manner.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-lg">
              We love to hear from our readers! If you have any questions,
              comments, or suggestions, feel free to reach out to us at{" "}
              <a href="mailto:contact@yourblog.com" className="text-blue-500">
                dhiveblog@gmail.com
              </a>
              . Your feedback is invaluable to us and helps us improve our
              content and services.
            </p>
          </section>

          <div className="text-center mt-12">
            <p className="text-lg">
              Thank you for visiting <span className="font-bold">Dhive</span>.
              We hope you enjoy our content as much as we enjoy creating it for
              you.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
