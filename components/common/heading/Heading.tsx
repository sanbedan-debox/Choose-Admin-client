import React from "react";

interface HeadingProps {
  title?: string;
  highlight?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, highlight }) => {
  if (!title && !highlight) {
    return null;
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-3xl sm:text-4xl lg:text-5xl md:mt-0 mb-10 md:mb-10 font-semibold">
        {title && <>{title} </>}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
};

export default Heading;
