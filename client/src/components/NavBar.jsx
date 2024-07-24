import svg from "../images/Navicon.svg";
import svg2 from "../images/github.png";
function NavBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-lg lg:px-10 ">
      <img src={svg} className="   lg:w-[150px] w-[100px] " alt="" />
      <img src={svg2} className="h-5 lg:h-6" alt="" />
    </div>
  );
}

export default NavBar;
