import React, { useState } from "react";
//my imports (also added useState)
import { axiosWithAuth } from "../utils/axiosWithAuth"
import Loader from "react-loader-spinner"

const initialState = {
  username: '',
  password: '',
}
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  //setting up my state
  const [user, setUser] = useState(initialState)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // end of states

  /* start of my basic function logic */
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true) //setting loading state to true for spinner to activate
    axiosWithAuth().post("/api/login", user)
      .then((res) => {
        console.log(res)
        //get token payload from server auth
        window.localStorage.setItem("token", res.data.payload)
        //using props here for useHistory hook to push user to protected route
        props.history.push("/protected")
      })
      .catch((err) => {
        console.log(err)
        // debugger
        setError(err.message) // setting error state to replace initial empty strings with the response of catch (error message)
      })
      .finally(() => setIsLoading(false)) // setting loading state back to false once the axios call is completed, regardless of success/fail
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        {/* checks state for isLoading to be true, if so then display this custom loader */}
        {isLoading && (
          <Loader type="Rings" color="purple" height={80} width={80} />
        )}
        {/* for error, setError is in the catch of the axios call */}
        {/* if error has a value given from the .catch, then display the error to user */}
        {error && <div> {error} </div>}


        <button> Login </button>
      </form>
    </div>
  );
};

export default Login;
