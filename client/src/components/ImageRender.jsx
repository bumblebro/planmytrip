export default ImageRender;

import { useState, useEffect } from "react";

function ImageRender({ place }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (place && place.photo && place.photo[0]) {
      setImageUrl(place.photo[0].getUrl()); // Assuming getUrl() exists
    }
  }, [place]);

  return (
    <>
      {imageUrl ? (
        <img
          className="object-cover w-32 h-32 rounded-lg"
          src={imageUrl}
          alt=""
        />
      ) : (
        <img
          className="object-cover w-32 h-32 rounded-lg"
          src="https://maps.gstatic.com/tactile/pane/result-no-thumbnail-2x.png"
          alt=""
        />
      )}
    </>
  );
}
