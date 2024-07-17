import svg from "../images/Navicon.svg";
import svg2 from "../images/github.png";
function NavBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 mb-6 bg-white shadow-lg lg:px-10 ">
      {/* <div className="py-4 pl-4 text-2xl font-extrabold text-[#fefce1] text-4 ">
        PlanMyTrip
      </div>{" "} */}
      {/* <img
        src={`https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCBL_74NEbWkfsIE3LCBO6sfk1hEE1NUB8`}
        alt=""
      />{" "} */}
      {/* <img
        src="https://maps.googleapis.com/maps/api/staticmap?center=Z%C3%BCrich&zoom=12&size=400x400&key=AIzaSyCBL_74NEbWkfsIE3LCBO6sfk1hEE1NUB8"
        alt="Map of Zürich"
      /> */}
      <img src={svg} className="   lg:w-[200px] w-[100px] " alt="" />
      <img src={svg2} className="h-5 lg:h-6" alt="" />
    </div>
  );
}

export default NavBar;
