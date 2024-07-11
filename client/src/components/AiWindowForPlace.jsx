
function AiWindowForPlace(text, setShowModal) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none my-14 focus:outline-none ">
        <div className="relative w-10/12 max-w-3xl mx-auto my-6 h-6/12 lg:w-auto">
          {/*content*/}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/*header*/}
            {/* <div className="flex items-start justify-between px-5 pt-5 border-b border-solid rounded-t border-blueGray-200">
              <h3 className="text-xl font-semibold lg:text-3xl">{placename}</h3>
            </div> */}
            <div className="relative flex-auto px-6">
              <p className="my-4 text-sm leading-relaxed lg:text-lg text-blueGray-500">
                {text}
              </p>
            </div>
            <div className="flex items-center justify-end border-t border-solid rounded-b border-blueGray-200 ">
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none lg:text-lg"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default AiWindowForPlace;
