import StarRatings from "react-star-ratings";
import ImageRender from "./ImageRender";
import Scroll from "react-scroll";
import svg from "/src/images/external.svg";
import { useState } from "react";
import { useSelector } from "react-redux";

function DisplayPlaces({ SetDistinctMarker, setNearbyPlaces }) {
  const nearbyPlaces = useSelector((state) => {
    console.log(state.nearbyPlaces);
    return state.nearbyPlaces;
  });
  const [isOpen, setIsOpen] = useState(false);

  const ScrollLink = Scroll.Link;
  return (
    <>
      <div className="mx-4 my-8 ">
        <h2 className="pb-2 pl-8 text-xl text-slate-800">
          Results ({nearbyPlaces.length})
        </h2>

        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 scrollbar-thin  overflow-scroll h-screen overflow-x-hidden">
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

                <h1 className="text-sm text-slate-500">
                  {place.data.vicinity}
                </h1>
                <h2 className="text-sm text-slate-500">
                  {place.data.business_status === "OPERATIONAL" && (
                    <span className="text-green-600">Open</span>
                  )}
                  {place.data.business_status === "CLOSED_TEMPORARILY" && (
                    <span className="text-[#dd3d3d]">Temporarily closed</span>
                  )}
                </h2>
                <div className="flex gap-4">
                  {" "}
                  <ScrollLink
                    to="footer"
                    offset={-50}
                    smooth={true}
                    duration={500}
                  >
                    <button
                      className=" rounded-md bg-[#1a73e8] text-white px-2 py-1 text-sm"
                      onClick={() => {
                        console.log(place.data.geometry.location.lat());
                        console.log(place.data.place_id);
                        SetDistinctMarker({
                          lat: place.data.geometry.location.lat(),
                          lng: place.data.geometry.location.lng(),
                          place: place.place,
                        });
                      }}
                    >
                      Show in above map
                    </button>
                  </ScrollLink>
                  <a
                    href={`https://www.google.com/maps/place/?q=place_id:${place.data.place_id}`}
                    target="_blank"
                    className="flex gap-2 bg-[#1a73e8] px-2 py-1 text-sm text-white rounded-md "
                  >
                    <button
                      onClick={() => {
                        // setIsOpen(true);
                      }}
                      className=""
                    >
                      Open in google map
                    </button>
                    <img className="w-4 text-white" src={svg} alt="" />
                  </a>{" "}
                  <button
                    className="flex gap-2 bg-[#e34133] px-2 py-1 text-sm text-white rounded-md "
                    onClick={async () => {
                      // console.log(place.photo[0].getUrl());
                      console.log(place.data.place_id);
                      console.log(nearbyPlaces);
                      // let data = [];
                      // await nearbyPlaces.map((places) => {
                      //   // console.log(place.place !== places.place);
                      //   if (place.data.place_id !== places.placeid) {
                      //     data.push(places);
                      //   } else null;
                      // });
                      // const newplaces = await nearbyPlaces.filter((pla) => {
                      //   return place.data.place_id !== pla.placeid;
                      // });
                      const matchingPlace = await nearbyPlaces.find(
                        (pla) => pla.placeid === place.data.place_id
                      );

                      if (matchingPlace) {
                        const newPlaces = nearbyPlaces.filter(
                          (pla) => pla !== matchingPlace
                        );
                        setNearbyPlaces(newPlaces);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <ImageRender place={place} />
            </div>
          ))}
        </ul>
      </div>{" "}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <iframe
              width="700"
              height="400"
              // src="https://www.google.com/embed/maps/place/?q=place_id:ChIJ1bq552rzpDsRQHLfqixs-1k"
              src={`https://www.google.com/maps/embed/v1/search?key=${
                import.meta.env.VITE_API_KEY
              }&q=Eiffel+Tower,Paris+France`}
              title="External Webpage"
            />
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayPlaces;
