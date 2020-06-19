import React, { useState, useEffect } from "react";
// import axios from "axios"; //commented out since we're using axiosWithAuth
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth"; //added axiosWithAuth
// import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom";


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const fetchColors = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        //console.log(res.data)
        //updating colorList state with the data response
        setColorList(res.data)
      })
      .catch((err) => {
        console.log(err)

      })
  }
  useEffect(() => {
    return fetchColors()
  }, [])

  // useEffect(() => {
  //   // const history = useHistory()
  //   const token = window.localStorage.getItem("token")
  //   if ('token' === true) {
  //     //when component mounts/renders run the fetchColors function if they have a token
  //     return fetchColors()
  //   } else {
  //     // <Redirect to="/" />
  //    return 
  //   }

  // }, [])

  return (
    <>

      <ColorList colors={colorList} updateColors={setColorList} fetchColors={fetchColors} //passing fetchColors through props to ColorList component
      />
      <Bubbles colors={colorList} />

    </>
  );
};

export default BubblePage;
