import { Button, TextField } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../Redux/TokenReducer";
import { RootState } from "../Redux/store";
import { ILogin } from "../models/LoginModel";
const Login = () => {
  //states
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const token = useSelector((state: RootState) => state.TokenReducer.token);
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //function

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const handleUserNameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const getToken = async () => {
    await axios
      .post("http://rezayari.ir:5050/Auth/Login", {
        username: username,
        password: password,
      })
      .then((res: AxiosResponse<ILogin>) => {
        dispatch(setToken(res.data?.token));
        if (token) navigate("/home");
      })
      .catch((error: AxiosError) => console.log(error));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-100 py-20 px-12 md:px-24 flex rounded-md justify-center ">
        <div className="flex flex-col w-64 md:w-96 gap-3 ">
          <TextField
            
            required
            id="username"
            label="نام کاربری"
            variant="outlined"
            size="small"
            onChange={handleUserNameChange}
          />

          <TextField
            required
            size="small"
            id="password"
            label="رمز عبور"
            variant="outlined"
            onChange={handlePasswordChange}
          />
          <Button onClick={() => getToken()} variant="contained">
            ورود
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
