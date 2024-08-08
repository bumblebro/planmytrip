import { useDispatch, useSelector } from "react-redux";
import svg from "../images/Navicon.svg";
import svg2 from "../images/github.png";
import svg3 from "/src/images/Google_Bard_logo.svg";
import { addsearchImage } from "../features/mapSlice";

function NavBar() {
  const dispatch = useDispatch();
  const imgsearch = useSelector((state) => state.searchImage);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#ffffff] lg:px-10 mb-11">
      <img
        src={svg}
        className="   lg:w-[150px] w-[100px] "
        onClick={() => {
          dispatch(addsearchImage(false));
        }}
        alt=""
      />{" "}
      <div className="flex items-center gap-2 md:gap-6">
        {imgsearch ? (
          <button
            className=" 
                        relative inline-flex items-center justify-center p-0.5  overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={() => {
              dispatch(addsearchImage(true));
            }}
          >
            <span className="relative flex items-center justify-around w-full gap-1 px-2 py-1 text-black text-white transition-all duration-75 ease-in bg-white bg-opacity-0 rounded-md">
              <h1 className="">Search Image</h1>
              <img className="w-3 text-white md:w-4" src={svg3} alt="" />
            </span>
          </button>
        ) : (
          <button
            className=" 
                    relative inline-flex items-center justify-center p-0.5  overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={() => {
              dispatch(addsearchImage(true));
            }}
          >
            <span className="relative flex items-center justify-around w-full gap-1 px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
              <h1 className="">Search Image</h1>
              <img className="w-3 text-white md:w-4" src={svg3} alt="" />
            </span>
          </button>
        )}
        {/* <img src={svg2} className="h-5 lg:h-6" alt="" /> */}
      </div>
    </div>
  );
}

export default NavBar;
