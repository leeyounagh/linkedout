import React from "react";

function FigureGrid({ figures }) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
  };

  return (
    <div
      className={`grid ${
        gridCols[figures.length]
      } gap-4 py-2 border rounded-lg mb-12 figure-grid`}
    >
      {figures.map((figure, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center p-4 figure-item"
        >
          {Array.isArray(figure.imageSrc) ? (
            <div className="flex items-center justify-center">
              {figure.imageSrc.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={figure.alt}
                  width={100}
                  height={100}
                  className="mx-2 mb-4"
                />
              ))}
            </div>
          ) : (
            <img
              src={figure.imageSrc}
              alt={figure.alt}
              width={100}
              height={100}
              className="mb-2"
            />
          )}
          <p className="mb-4 font-bold text-center">{figure.caption}</p>
          <p className="text-center">{figure.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FigureGrid;
