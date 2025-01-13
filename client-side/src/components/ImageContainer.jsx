/**
 * @fileoverview Component use to create a circular image container.
 */
import React from "react";
import "./components.css";

export default function ImageContainer(prop) {

     const outerStyle = {
          padding: "6px",
          borderWidth: "0px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "10px",
          boxShadow: "0px 0px 10px 3px rgba( 100, 100, 120, .5)",
          backgroundColor: "white",
          display : 'flex',
          justifyContent : 'center',
          alignItems : 'center'
     };

     const innerStyle = {
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
     };

     return (
          <div className="PfpConainter">
               {/* div for the Outer boundary */}
               <div className="OuterCirclePfp" style={outerStyle}>
                    {/* div for inner boundry */}
                    <div className="InnerCirclePfp" style={innerStyle}>
                         {/* The logo will the background in the inner circle */}
                         <img style={{height : '100%', width : '100%'}} className="" src={prop.image} alt="" />
                    </div>

               </div>

          </div>
     );
}