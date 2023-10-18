import React from "react";
import Link from "next/link";

const About: React.FC = () => {
  // throw new Error("Not today!");
  return (
    <>
      <h1>About</h1>
      <Link href="/">Link to home page</Link>
    </>
  );
};

export default About;
