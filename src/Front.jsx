import ToolBar from "./Toolbar";
import Feature from "./Feature";
import Article from "./Article_C";
import React , {useState} from "react";
import Background from "./Background";
import Foter from "./Foter";
function Front(){
  return (
    <>
    <div id="mainPage">
      <Background />
      <Feature />
      <Foter />
      
    </div>
    </>
  );

}
export default Front;