import axios from "axios";
import {
  CalendarClock,
  Circle,
  CircleCheck,
  Files,
  FileWarningIcon,
  HistoryIcon,
  Home,
  Inbox,
  ListCollapse,
  LogOutIcon,
  MoonStar,
  Users,
} from "lucide-react";
import logo from "../utils/logo.png";
import icon from "../utils/icon.png";
import icon2 from "../utils/icon2.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logoutUser } from "../redux/authApiCall";
function Sidebar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    toast.success(
      "Déconnexion réussie. Vous avez été déconnecté en toute sécurité. À bientôt !"
    );
    navigate("/");
  };
  const [open, setOpen] = useState(false);
  const [countMessages, setCountMessages] = useState(null);
  const [countEnAttent, setCountEnAttent] = useState(null);
  const [countDujour, setCountDujour] = useState(null);
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarState");
    setOpen(savedState === "true");
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/ordonnance/getCount`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setCountDujour(res.data.dujour);
        setCountMessages(res.data.messages);
        setCountEnAttent(res.data.enAttent);
      } catch (error) {
        console.log("Fetching collaborateurs failed" + error);
      }
    };
    fetchUser();
  }, []);
  const toggleSidebar = () => {
    setOpen(!open);
    localStorage.setItem("sidebarState", !open);
  };
  return (
    <div
      className={` ${
        open ? "w-72 absolute " : "w-16 md:w-20 "
      }  flex flex-col justify-between bg-gradient-to-r from-slate-950 to-slate-800 h-screen p-2 md:p-5  pt-8 md:relative duration-300 z-50`}
    >
      <div>
        <div className="">
          <ListCollapse
            size={30}
            className={`mb-6 text-white text-sm duration-600 cursor-pointer   px-1 m-2  bg-green-400  rounded-lg   ${
              open && "rotate-180"
            }`}
            onClick={toggleSidebar}
          />
          <div className="flex items-center ">
            {/* <MoonStar
              size={50}
              className={`cursor-pointer text-green-400 duration-500  ${
                open && "rotate-[360deg] "
              }`}
            /> */}
            <img
              src={icon}
              className={`cursor-pointer h-10 w-10 duration-500 me-4  ${
                open && "rotate-[360deg] "
              }`}
            />

            <span
              className={`flex flex-col origin-left   text-white   duration-200 ${
                !open && "scale-0"
              }`}
            >
              {/* <h1 className="font-bold m-0 uppercase text-1xl md:text-2xl">
                Pharmacie
              </h1>
              <span className="font-light text-sm capitalize">
                DE LA POINTE
              </span> */}
              <img src={icon2} className="h-14" />
            </span>
          </div>
        </div>
        <ul className="pt-6 ">
          <Link
            to="/ordonnances"
            className={`flex hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <Home size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Accueil
            </span>
          </Link>
          <Link
            to="/ordonnances/message"
            className={`flex justify-between hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <span className="flex flex-row items-center  md:gap-x-2">
              <Inbox size={20} />
              {countMessages > 0 && (
                <span
                  className={`${
                    open && "hidden"
                  }  w-2 h-2 rounded-full bg-green-500`}
                ></span>
              )}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Nouveaux messages
              </span>
            </span>

            {countMessages > 0 && (
              <span
                className={`${
                  !open && "hidden"
                } bg-green-600  px-2 py-1 rounded-full`}
              >
                {countMessages}
              </span>
            )}
          </Link>
          <Link
            to="/ordonnances/dujour"
            className={`flex justify-between hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <span className="flex flex-row items-center md:gap-x-2">
              {" "}
              <CalendarClock size={20} />
              {countDujour > 0 && (
                <span
                  className={`${
                    open && "hidden"
                  }  w-2 h-2 rounded-full bg-sky-500`}
                ></span>
              )}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Ordonnances du jour{" "}
              </span>
            </span>

            {countDujour > 0 && (
              <span
                className={`${
                  !open && "hidden"
                } bg-sky-600  px-2 py-1 rounded-full`}
              >
                {countDujour}
              </span>
            )}
          </Link>
          <Link
            to="/ordonnances/enretard"
            className={`flex justify-between  hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <span className="flex flex-row items-center md:gap-x-2">
              <FileWarningIcon size={20} />
              {countEnAttent > 0 && (
                <span
                  className={`${
                    open && "hidden"
                  }  w-2 h-2 rounded-full bg-red-500`}
                ></span>
              )}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Ordonnances en retard{" "}
              </span>
            </span>
            {countEnAttent > 0 && (
              <span
                className={`${
                  !open && "hidden"
                } bg-red-600  px-2 py-1 rounded-full`}
              >
                {countEnAttent}
              </span>
            )}
          </Link>

          <Link
            to="/ordonnances/historique"
            className={`flex hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <HistoryIcon size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Historique des ordonnances
            </span>
          </Link>
          <Link
            to="/ordonnances/termine"
            className={`flex hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <CircleCheck size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Ordonnances terminées
            </span>
          </Link>
          <Link
            to="/ordonnances/rapports"
            className={`flex hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
          >
            <Files size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Rapports
            </span>
          </Link>
          {user.role === "admin" && (
            <Link
              to="/ordonnances/collaborateurs"
              className={`flex hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
        mt-2`}
            >
              <Users size={20} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Collaborateurs
              </span>
            </Link>
          )}
        </ul>
      </div>
      <ul className="pt-6">
        <li
          onClick={logout}
          className={`flex hover:duration-200  hover:text-green-400 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-white text-gray-200 text-sm items-center gap-x-4 
          mt-2`}
        >
          <LogOutIcon size={20} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            {user?.username}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
