import { Autocomplete, TextField } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Icity, Iprovine } from "../models/Province&CityModel";

const Home = () => {
  //states
  const [province, setProvince] = useState<Iprovine[]>([]);
  const [city, setCity] = useState<Icity[]>([]);
  const [selectedCity, setSelectedCity] = useState<Icity | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Iprovine | null>(
    null
  );
  const token = useSelector((state: RootState) => state.TokenReducer?.token);

  //function
  const getProvince = async () => {
    await axios
      .get("http://rezayari.ir:5050/CityAndProvince/GetProvince", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse<Iprovine[]>) => setProvince(res.data))
      .catch((error: AxiosError) => console.log(error));
  };
  const getCity = async () => {
    await axios
      .get("http://rezayari.ir:5050/CityAndProvince/GetCity", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse<Icity[]>) => setCity(res.data))
      .catch((error: AxiosError) => console.log(error));
  };

  const handleProvinceChange = (selectedProvince: Iprovine | null) => {
    setSelectedProvince(selectedProvince);
    if (selectedProvince) {
      const filteredCities = city?.filter(
        (c) => c.provinceId === selectedProvince.id
      );
      setCity(filteredCities || []);
      setSelectedCity(null);
    } else {
      setCity(city);
      setSelectedCity(null);
    }
  };
  // const handleCityChange = (selectedCity: Icity | null) => {
  //   setSelectedCity(selectedCity);
  //   if (selectedCity) {
  //     const filterProvince = province?.filter(
  //       (p) => selectedCity.provinceId === p.id
  //     );
  //     console.log(filterProvince);
  //     setProvince(filterProvince || []);
  //     console.log(province);

  //     setSelectedProvince(null);
  //   } else {
  //     setProvince(province);
  //     setSelectedProvince(null);
  //   }
  // };

  //effects
  useEffect(() => {
    getProvince();
    getCity();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{ direction: "rtl" }}
        className="bg-slate-200 flex flex-col gap-2 px-8 py-12 md:px-16 md:py-16 rounded-md justify-center min-w-svw"
      >
        <Autocomplete
          value={selectedProvince}
          size="small"
          onChange={(event, newValue) => handleProvinceChange(newValue)}
          disablePortal
          options={province}
          sx={{ width: 300 }}
          getOptionLabel={(option) => (option ? option.name : "")}
          renderInput={(params) => <TextField {...params} label="استان" />}
        />

        <Autocomplete
        lang="fa"
          value={selectedCity}
          disablePortal
          size="small"
          options={city}
          sx={{ width: 300 }}
          // onChange={(event, newValue) => handleCityChange(newValue)}
          getOptionLabel={(option) => (option ? option.name : "")}
          renderInput={(params) => <TextField {...params} label="شهر" />}
        />
      </div>
    </div>
  );
};

export default Home;
