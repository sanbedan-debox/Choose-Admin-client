import React from "react";
import RoundedButton from "../button/RoundedButton";

interface HeadingProps {
  title?: string;
  highlight?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, highlight }) => {
  if (!title && !highlight) {
    return null;
  }

  return (
    <div
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%) ",
      }}
      className="justify-between items-center px-5 flex  w-[100%]  mb-10 rounded-lg py-4"
    >
      <h1 className="text-xl md:text-3xl sm:text-2xl lg:text-4xl  font-semibold">
        {highlight && <>{highlight} </>}
      </h1>
      <RoundedButton>Log Out</RoundedButton>
    </div>
  );
};

export default Heading;
