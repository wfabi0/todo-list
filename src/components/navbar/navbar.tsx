import NavIcon from "./nav-icon";
import NavContext from "./nav-context";
import NavTitle from "./nav-title";

export default function Navbar() {
  return (
    <div className="flex p-6 space-x-14 items-center justify-normal max-md:justify-between">
      <NavIcon />
      <NavTitle />
      <NavContext />
    </div>
  );
}
