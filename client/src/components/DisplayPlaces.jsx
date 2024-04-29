import StarRatings from "react-star-ratings";
import ImageRender from "./ImageRender";

function DisplayPlaces({nearbyPlaces,}) {
  return (
    <div className="mx-4 my-8">
      <h2 className="pb-2 pl-8 text-xl text-slate-800">
        Results ({nearbyPlaces.length})
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {nearbyPlaces.map((place, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-between pb-4 border-solid border-1black border-[1px] px-8 py-4"
          >
            <div className="flex flex-col justify-center">
              <li className="text-xl font-medium">{place.place}</li>
              {place.data.rating ? (
                <div className="flex items-center justify-start gap-1">
                  <h1 className="text-sm text-slate-500">
                    {place.data.rating || "0.0"}
                  </h1>
                  <div className="pb-0.5">
                    <StarRatings
                      rating={place.data.rating}
                      starRatedColor="#fbbc04"
                      // changeRating={this.changeRating}
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                      starSpacing="1px"
                    />
                  </div>
                  <span className="text-sm text-slate-500">
                    ({place.data.user_ratings_total || 0})
                  </span>{" "}
                </div>
              ) : (
                <div className="flex items-center justify-start gap-1">
                  <h1 className="text-sm text-slate-500">No reviews</h1>
                </div>
              )}

              <h1 className="text-sm text-slate-500">{place.data.vicinity}</h1>
              <h2 className="text-sm text-slate-500">
                {place.data.business_status === "OPERATIONAL" && (
                  <span className="text-green-600">Open</span>
                )}
                {place.data.business_status === "CLOSED_TEMPORARILY" && (
                  <span className="text-[#dd3d3d]">Temporarily closed</span>
                )}
              </h2>
            </div>

            <ImageRender place={place} />

            {/* <button
          onClick={() => {
            console.log(place.photo[0].getUrl());
            let data = [];
            nearbyPlaces.map((places) => {
              if (place.place !== places.place) {
                data.push(places);
              }
            });

            setNearbyPlaces(data);
          }}
        >
          Remove
        </button> */}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default DisplayPlaces;
