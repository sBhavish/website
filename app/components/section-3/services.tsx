import React, { useEffect, useState } from "react";
const Services = () => {
  const SECTION3_API_URL = "http://localhost:1337/api/section3s";
  const [serviceDescr, setServiceDescr] = useState<string>("");
  const [servicesList, setServicesList] = useState<{ [key: string]: string } | undefined >();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [currentSelectedService, setCurrentService] = useState<string>("");
  

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(SECTION3_API_URL)
      .then((response) => response.json())
      .then((section3_data) => {
        const { ServiceDescription, servicesList } =
          section3_data.data[0].attributes;
        setServiceDescr(ServiceDescription);
        setServicesList(servicesList);
        setDescription(servicesList ? servicesList[Object.keys(servicesList)[0]] : "defaultDescription");//default desc
        setCurrentService(Object.keys(servicesList)[0])//setting default service
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setDescription(servicesList ? servicesList[service] : "");
    setCurrentService(service);
  };
  return (
    <div className="flex flex-col w-full min-h-full lg:mx-0 lg:h-fit bg-haiti">
      <div className="text-gray-200 text-4xl  w-full justify-center flex py-8 h-fit gradient-bottom">
        <span className="h-fit whitespace-nowrap font-oxygen font-bold">
          Services we offer
        </span>
      </div>
      <div className="text-center text-violet-200 text-base font-normal font-poppins p-4 lg:mx-40">
        {serviceDescr}
      </div>
      <div className="w-fit flex flex-row h-min services-gradient place-self-end lg:my-8 ml-10">
        <div className="float-right w-fit flex flex-col overflow-y-auto items-center p-4 py-8 font-poppins cursor-pointer">
          {servicesList &&
            Object.keys(servicesList).map((service) => (
              <div key={service}
                id={service}
                className={currentSelectedService === service? 'service-list-cur' : 'service-list'}
                onClick={() => handleServiceClick(service)}>
                {service}
                <span className={currentSelectedService === service? 'material-symbols-outlined text-lg  font-bold arrow' : 'material-symbols-outlined text-lg opacity-0 font-bold arrow'}>
                  arrow_forward_ios
                </span>
              </div>
            ))}
        </div>
        
        <figure className="flex object-contain lg:h-[600px] relative">
          <img
            className="w-full h-full object-cover"
            src="https://s3-alpha-sig.figma.com/img/30d7/51e3/2960c1cac287ea93132eb2f27db25e5e?Expires=1693785600&Signature=EFd8JvLpqX2mE6meebGfFJaD9xHNJ~qvSJwcRrtCcSajU1wBVpKjhrhb6VOVYarZEebBHx7C6GVQlqp6m75311MV4LWeEAYKDJzG-G2EVOlEINS8oqTsKfTX~t4vmQShXL4f83BImaHs9v1sUPo6B0FZe1mUVSPi~CEaa227bWSam7wsXbYCxRC2dLmSGV6kglCSy9Adz2EDT7qB5z8Q6~V9Qacasmf4tOZbJeAEUWbfXooxgOZdvJf~TP53rhcCggkikgKfPkxu5h-Uh4nsHztH0NLYvP7YpJByHrn9A56tdnGteCdVmwf2hjfNVx8caAomBWNE6Q0djxXn0qHfaw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          ></img>
          <div className="z-10 absolute inset-x-0 bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center items-center text-white bg-opacity-50 p-4 flex-col lg:w-4/6">
            <figcaption className="text-neutral-50 text-2xl font-medium font-poppins">
              <div className="w-fit px-2 p-1 bg-gray-900 items-center justify-center flex">
                <i className="text-blue-100 text-sm font-light">
                  {currentSelectedService}
                </i>
              </div>
              {description}
              <div className="flex justify-end font-normal items-center gap-3">
                <span>Learn more.</span>
                <span>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="20" fill="#824BEA" />
                    <path
                      d="M21.5 12.5L20.4275 13.5448L26.1125 19.25H11V20.75H26.1125L20.4275 26.4297L21.5 27.5L29 20L21.5 12.5Z"
                      fill="#F0F5FF"
                    />
                  </svg>
                </span>
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default Services;
