import Nav from "../utils/Nav";
import Profile from "./Profile";

function DashboardLayout() {
  return (
    <div className="w-screen h-screen flex flex-col gap-[2rem]">
      <Nav />
      <div className="w-[80%] mx-auto">
        <Profile />
      </div>
    </div>
  );
}

export default DashboardLayout;
