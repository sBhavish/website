import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:1337/api/section7s?populate=%2A";
const STRAPI_URL = "http://localhost:1337";

const Consultation = () => {
  const [tagline, setTagline] = useState("");
  const [bgImageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then(({ data }) => {
        const { ContactUsDescription, section7bg } = data[0].attributes;
        setTagline(ContactUsDescription);
        setImageUrl(STRAPI_URL + section7bg.data.attributes.url);
      })
      .catch((error) => {
        console.warn("Section 7 Error fetching data from API:", error);
      });
  }, []);

  return (
    <div className="relative flex w-full items-center h-48">
      <img
        className="w-full h-full object-cover"
        src={bgImageUrl}
        alt="Background"
      />
      <div className="absolute left-8 font-oxygen text-white text-4xl font-bold leading-[60px] tracking-wide lg:w-2/5 ">
        {tagline}
      </div>
      <button className="absolute right-8 btn-white">
        GRAB A CONSULTATION
      </button>
    </div>
  );
};

export default Consultation;
