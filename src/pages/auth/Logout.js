import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUserDetails } from "../../redux/MainReducer";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeUserDetails());
    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
