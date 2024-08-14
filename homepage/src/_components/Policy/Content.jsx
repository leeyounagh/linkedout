import React from "react";

function Content({ content, isFirstSection }) {
  return (
    <>
      {content.map((paragraph, index) =>
        typeof paragraph === "string" ? (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: paragraph }}
            className="mt-4"
          ></div>
        ) : paragraph.type === "images" ? (
          <div
            key={index}
            className={`grid gap-4 mt-4 ${
              isFirstSection
                ? "first-section-grid"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            }`}
          >
            {paragraph.images.map((figure, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center figure-item"
              >
                <img
                  src={figure.src}
                  alt={figure.alt}
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <p className="font-bold text-center">{figure.caption}</p>
              </div>
            ))}
          </div>
        ) : null
      )}
    </>
  );
}

export default Content;
