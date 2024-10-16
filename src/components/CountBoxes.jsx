import axios from "axios";
import {
  Bell,
  List,
  ListCheck,
  ListChecks,
  ListRestart,
  LoaderCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CountBoxes() {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [countMessages, setCountMessages] = useState(null);
  const [countEnAttent, setCountEnAttent] = useState(null);
  const [countDuJour, setCountDuJour] = useState(null);
  const [countTerminer, setCountTerminer] = useState(null);
  const [terminerToday, setTerminerToday] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/ordonnance/getCount`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCountMessages(res.data.messages);
        setCountEnAttent(res.data.enAttent);
        setCountDuJour(res.data.dujour);
        setCountTerminer(res.data.terminer);
        setTerminerToday(res.data.terminerToday);
      } catch (error) {
        console.log("Fetching collaborateurs failed" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-4 bg-gray-100 p-3 rounded-lg">
      <Link to="/ordonnances/message">
        <div className="h-full bg-gradient-to-r  from-purple-600 to-purple-400 rounded-lg flex flex-col items-center p-4 text-white">
          <div className="flex flex-row items-center justify-center">
            <Bell size={40} />
            <span className="text-5xl font-semibold ms-2">
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={25} />
              ) : (
                countMessages
              )}
            </span>
          </div>
          <span className="capitalize text-sm ">Ordonnances Reçues</span>
        </div>
      </Link>
      <Link to="/ordonnances/dujour">
        {" "}
        <div className="h-full bg-gradient-to-r  from-sky-500 to-sky-300 rounded-lg flex flex-col items-center p-4 text-white">
          <div className="flex flex-row items-center justify-center">
            <ListChecks size={40} />
            <span className="text-5xl font-semibold ms-2">
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={25} />
              ) : (
                countDuJour
              )}
            </span>
          </div>
          <span className="capitalize text-sm ">Ordonnances Du Jour</span>
        </div>
      </Link>
      <Link to="/ordonnances/enretard">
        <div className="h-full bg-gradient-to-r  from-red-600 to-red-400 rounded-lg flex flex-col items-center p-4 text-white">
          <div className="flex flex-row items-center justify-center">
            <List size={40} />
            <span className="text-5xl font-semibold ms-2">
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={25} />
              ) : (
                countEnAttent
              )}
            </span>
          </div>
          <span className="capitalize text-sm ">Ordonnances en Retard</span>
        </div>
      </Link>

      {/* <Link to="/ordonnances/historique">
        {" "}
        <div className="h-full bg-gradient-to-r  from-sky-500 to-sky-300 rounded-lg flex flex-col items-center p-4 text-white">
          <div className="flex flex-row items-center justify-center">
            <ListRestart size={40} />
            <span className="text-5xl font-semibold ms-2">
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={25} />
              ) : (
                countRenwal
              )}
            </span>
          </div>
          <span className="capitalize text-sm ">Ordonnances À Renouveler</span>
        </div>
      </Link> */}
      <Link to="/ordonnances/termine">
        {" "}
        <div className="h-full bg-gradient-to-r  from-green-600 to-green-400 rounded-lg flex flex-col items-center p-4 text-white">
          <div className="flex flex-row items-center justify-center">
            <ListCheck size={40} />
            <span className="text-5xl font-semibold ms-2">
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={25} />
              ) : (
                terminerToday
              )}
            </span>
          </div>
          <span className="capitalize text-sm ">
            Ordonnances Terminées Du Jou
          </span>
        </div>
      </Link>
    </div>
  );
}

export default CountBoxes;
