import StarRatings from "react-star-ratings";
import ImageRender from "./ImageRender";
import Scroll from "react-scroll";
import svg from "/src/images/Google_Bard_logo.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AiWindow from "./AiWindow";
import { addList, addnewList } from "../features/mapSlice";

function DisplayPlaces({ SetDistinctMarker }) {
  // const [uniquePlaces, setUniquePlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placename, SetPlaceName] = useState("");
  const [location, SetLocation] = useState("");
  const ScrollLink = Scroll.Link;
  const dispatch = useDispatch();

  const nearbyPlaces = useSelector((state) => {
    console.log(state.nearbyPlaces);
    return state.nearbyPlaces;
  });

  const selectedPlaces = useSelector((state) => {
    return state.selectedList;
  });

  return (
    <>
      <div className="my-8 -4">
        {selectedPlaces.length > 0 && (
          <>
            <h1 className="pb-2 flex justify-center text-xl text-[#fefce1]">
              Selected Places
            </h1>
            <div className="flex flex-col   text-start text-sm lg:text-lg font-medium text-[#fefce1] w-10/12 lg:w-6/12 mx-auto gap-2 py-4">
              {selectedPlaces.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between">
                    <h1 className="text-white" key={index}>
                      {index + 1}) {item.placeName}
                    </h1>
                    <button
                      className="flex gap-2 justify-center bg-[#e34133] px-2 py-1 text-sm text-[#fefce1] rounded-md h-6 lg:w-auto "
                      onClick={() => {
                        let filtered = selectedPlaces.filter((items) => {
                          return items.placeId !== item.placeId;
                        });
                        dispatch(addnewList(filtered));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}{" "}
        <h2 className="pb-2 pl-8 text-xl text-[#fefce1]">
          Results ({nearbyPlaces.length})
        </h2>
        <ul className="grid h-screen grid-cols-1 gap-4 overflow-scroll overflow-x-hidden lg:grid-cols-2 scrollbar-thin ">
          {nearbyPlaces.map((place, index) => (
            <div
              key={index}
              className="flex lg:flex-row items-start justify-between pb-4 border-solid border-1 border-[1px] px-8 py-4 rounded-md flex-col gap-2 w-full lg:gap-0 border-slate-800"
            >
              <div className="flex flex-col justify-center w-full">
                <li className="text-xl font-medium text-[#fefce1]">
                  {place.place}
                </li>
                {place.data.rating ? (
                  <div className="flex items-center justify-start gap-1">
                    <h1 className="text-sm text-slate-500">
                      {place.data.rating || "0.0"}
                    </h1>
                    <div className="pb-0.5">
                      <StarRatings
                        rating={place.data.rating}
                        starRatedColor="#fbbc04"
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
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 lg:gap-4 lg:flex-row ">
                    {" "}
                    <ScrollLink
                      to="footer"
                      offset={-50}
                      smooth={true}
                      duration={500}
                    >
                      <button
                        className=" rounded-md bg-[#1a73e8] text-[#fefce1] px-2 py-1 text-sm w-full"
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
                      // href={`https://www.google.com/maps/place/?q=place_id:${place.data.place_id}`}
                      target="_blank"
                      className="flex flex-row justify-center w-full gap-2 px-2 py-1 text-sm text-black bg-white rounded-md lg:w-auto "
                      onClick={() => {
                        SetPlaceName(place.place);
                        SetLocation(place.data.vicinity);
                        setIsOpen(true);
                      }}
                    >
                      <button className="">AI Description</button>
                      <img className="w-4 text-white" src={svg} alt="" />
                    </a>{" "}
                    <button
                      className="flex gap-2 justify-center bg-[#e34133] px-2 py-1 text-sm text-[#fefce1] rounded-md w-full lg:w-auto "
                      onClick={async () => {
                        // console.log(place.photo[0].getUrl());
                        console.log(place.data.place_id);
                        console.log(nearbyPlaces);

                        const matchingPlace = await nearbyPlaces.find(
                          (pla) => pla.placeid === place.data.place_id
                        );

                        if (matchingPlace) {
                          const newPlaces = nearbyPlaces.filter(
                            (pla) => pla !== matchingPlace
                          );
                          // setNearbyPlaces(newPlaces);
                        }
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className="flex flex-row justify-center w-full gap-2 px-2 py-1 text-sm text-black bg-white rounded-md lg:w-auto "
                      onClick={() => {
                        let con = false;
                        selectedPlaces.map((item) => {
                          if (item.placeId == place.placeid) {
                            con = true;
                          }
                        });
                        if (con == false) {
                          dispatch(
                            addList({
                              placeId: place.placeid,
                              placeName: place.place,
                            })
                          );
                        } else {
                          alert("Already Selected!");
                        }
                      }}
                    >
                      Add Place
                    </button>
                  </div>{" "}
                  <div className=" lg:hidden">
                    {" "}
                    <ImageRender place={place} />
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex">
                {" "}
                <ImageRender place={place} />
              </div>
            </div>
          ))}
        </ul>{" "}
        {isOpen && (
          <AiWindow
            setIsOpen={setIsOpen}
            placename={placename}
            location={location}
          />
        )}
      </div>{" "}
    </>
  );
}

export default DisplayPlaces;
