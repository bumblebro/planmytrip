export default ImageRender;

import { useState, useEffect } from "react";

function ImageRender({ place }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (place && place.photo && place.photo[0]) {
      setImageUrl(place.photo[0].getUrl()); // Assuming getUrl() exists
    }
  }, [place]);

  return <img className="w-2/12" src={imageUrl} alt="" />;
}
