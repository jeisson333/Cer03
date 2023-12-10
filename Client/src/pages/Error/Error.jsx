import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSidebar } from "../../redux/actions";

const Error = ({ setIsActive }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSidebar(false));
  }, []);

  return <h2>Error 404</h2>;
};

export default Error;
