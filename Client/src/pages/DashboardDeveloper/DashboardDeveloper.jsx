import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./DashboardDeveloper.module.css";
import { changeSidebar } from "../../redux/actions";

const DashboardDeveloper = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>dashboardDeveloper</h2>
    </div>
  );
};

export default DashboardDeveloper;
