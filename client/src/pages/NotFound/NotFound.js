import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className=" text-red-800 flex justify-center items-center flex-col min-h-screen "
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-6 h-6 mr-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-2xl font-medium">
            404 | This page could not be found.
          </h3>
        </div>

        <div className="flex mt-2">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="text-red-800  mr-2 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-3 py-1.5 text-center "
          >
            Quay lại
          </button>
          <button
            onClick={() => navigate("/")}
            type="button"
            className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-3 py-1.5 text-center inline-flex items-center "
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            Trang chủ
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
