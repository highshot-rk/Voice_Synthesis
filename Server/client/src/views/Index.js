import React from "react";

import IndexHeader from "../components/Headers/IndexHeader.js";
import IndexNavbar from "../components/Navbars/IndexNavbar";


function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
    <IndexNavbar/>
      <IndexHeader />
      <div className="main">
        
      </div>
    </>
  );
}

export default Index;
