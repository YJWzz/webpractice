import React from "react";
import { NavLink } from "react-router-dom";
import Mainstyle from "./MainPage.module.css";

function MainPage(){
    return(
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}> 
        <div className={Mainstyle.login}>
            <h1>Upload</h1>
            <div style ={{position:'relative',right:'130px'}}>
                text...
            </div>
            <span style ={{position:'relative',top:'150px',right:'80px'}}>
                <NavLink to="/Upload">upload single image</NavLink>
            </span>
            <br/>
            <span style ={{position:'relative',top:'150px',right:'80px'}}>
                <NavLink to="/Upload">upload image in folder</NavLink>
            </span>
        </div>
        <div className={Mainstyle.login}>
            <h1>Download</h1>
            <div style ={{position:'relative',right:'130px'}}>text...</div>
            <span style ={{position:'relative',top:'150px',right:'80px'}}>
                <NavLink to="/Download">Go to download page</NavLink>
            </span>
        </div>   
<div>{/*---------------------------------------------------------------------------------------------------------------------------*/}</div>
        
        <div className={Mainstyle.login} >
        <span>
            <NavLink to="/TXTtoIMG">
                <button>Go to TXT to IMG</button>
            </NavLink>
        </span>
        <div>
        <span>
            <NavLink to="/IMGtoIMG">
                <button>Go to IMG to IMG</button>
            </NavLink>
        </span>
        <span>
            <NavLink to="/Download2">
                <button>Go to Download2</button>
            </NavLink>
        </span>
        <div/>
        </div>
        </div>
     </div>
    );
}

export default MainPage;
