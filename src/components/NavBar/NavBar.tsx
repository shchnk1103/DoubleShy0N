import "@/styles/navbar.css";
import { tabs } from "./Tabs";
import Avatar from "./Avatar";
import DarkModeButton from "./DarkModeButton";
import NavItem from "./NavItem";
import Icon from "./Icon";

const NavBar = () => {
  return (
    <nav className="flex-between pt-4 mb-4 w-full mx-auto z-50 h-16 top-0 sticky">
      {/* icon */}
      <div className="flex-1 hidden md:flex">
        <Icon />
      </div>

      {/* items */}
      <div className="flex flex-1 flex-row px-6 py-0 w-fit h-10 border dark:border-gray-500 rounded-full bg-gray-50 dark:bg-gray-800 shadow-md dark:shadow-gray-600/95 dark:text-gray-500">
        {tabs.map((tab) => (
          <NavItem tab={tab} key={tab.index} />
        ))}
      </div>

      <div className="flex-end gap-2 flex-1">
        <Avatar />

        <DarkModeButton />
      </div>
    </nav>
  );
};

export default NavBar;
