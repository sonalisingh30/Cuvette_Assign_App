import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="flex justify-between items-center px-[0.5rem] sm:px-[3rem] border-b-2 shadow-3xl">
        <div className="h-[5rem] flex items-center justify-center">
          <img src="/assets/logo.svg" className="w-full h-full" />
        </div>
        <div className="flex items-center justify-center h-full">
          <Link
            to="/signin"
            className="w-[120px] h-[3rem] bg-slate-500 text-white font-bold rounded-md hover:bg-slate-700 font-nunito text-xl flex items-center justify-center"
          >
            Logout
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
