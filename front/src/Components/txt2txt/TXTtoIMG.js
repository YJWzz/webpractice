import React, { useState } from "react";
import "./TXT.css";
import Dice from "../Button/Dice";
import Revolve from "../Button/Revolve";
import Generate from "../Button/Generate"; 
import Hires from "../CheckBox/Hires";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import CheckPoint from "../DropBox/CheckPoint";
import SamplingMethod from "../DropBox/SamplingMethod";
import Styles from "../DropBox/Styles";
//import Script from "../DropBox/Script";
import NegativePrompt from "../Prompt/NegativePrompt";
import Prompt from "../Prompt/Prompt";
import Seed from "../Slider/Seed";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize"; 
import CFGScale from "../Slider/CFGScale";
import SamplingStep from "../Slider/SamplingStep";
import Width from "../Slider/Width";
import { NavLink } from "react-router-dom";
import Height from "../Slider/Height";
import axios from "axios";

// 已新增prompt , slider , checkBox之onChange 

function TxtPage() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",    // prompt 
    negative_prompt: "",  //prompt 
    denoising_strength: 0, //slider 
    styles: [], //選集
    seed: 0, //randoom value -1 to infinite
    batch_size: 0, // slider 
    n_iter: 0, // ?
    steps: 0, // slider 
    cfg_scale: 0, //slider 
    width: 0, //slider (fix)
    height: 0, //slider (fix)
    restore_faces: false, //checkBox
    tilling: false, //checkBox
    eta: 0, // ?
    sampler_index: "",  //?
    alwayson_scripts: "",
  });
  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
  const handleFormDataChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  
    // 查看更新
    console.log(`Field ${fieldName} updated to:`, value);
  };

  const HandleGenerateClick = () => {
    const confirmed = window.confirm("確定要提交嗎？");
    if (confirmed) {
      const TxtToImgData = {
        method: "POST",
        request: Object.keys(formData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = formData[key];
          return acc;
        }, {}),
        response: {
          message: "請求成功",  
        },
      };
      Jsonfunction(TxtToImgData);
    }
  };
//-----------------------------------------------------------------------------------------------------------------------------------------//
  /*
    function ParentComponent() {
    const [childValue, setChildValue] = useState("");

    // 步骤 1: 定义回调函数
    const handleChildValueChange = (newValue) => {
    setChildValue(newValue); // 在这里更新父组件的状态
    }; 

    return (
    <div>
      <ChildComponent onChange={handleChildValueChange} />
      <p>Child Value in Parent: {childValue}</p>
    </div>
    );
    }

    export default ParentComponent; 
    */
//------------------------------------------------------------------------------------------------------------------------------------------//
  async function Jsonfunction(TxtToImgData) {
    try {
      await axios.post("http://localhost:8080/api/txt2img/process", TxtToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="TXTcontanier">
      
      {/* elements nested in div className="grid"  */}
      <div className="txt2img-first-grid">

        {/* each components nested in it's own div section */}
        <div className="txt2img-section1">
          <div className="NavStyle">
            <span>
              <NavLink to="/ImgPage">
                  <button>ImgPage</button>
               </NavLink>
            </span>
          </div>
        </div>

        <div className="txt2img-section2">
            <div>
                <CheckPoint />
            </div>
        </div>
      </div>
   
      <div className="txt2img-second-grid">

        <div className="txt2img-section3">
          <div className="PromptStyle">
            <div>
          <Prompt value={formData.prompt} onChange={(value) => handleFormDataChange("prompt",value)} />
            </div>
          </div>
        </div>

        <div className="txt2img-section4">
          <Generate onClick={HandleGenerateClick}/>
        </div>

        <div className="txt2img-section5">
          <div className="PromptStyle">
            <div>
              <NegativePrompt value={formData.negative_prompt} onChange={(value) => handleFormDataChange("negative_prompt",value)} />
            </div>
          </div>
        </div>

        <div className="txt2img-section6">
          <div className="CheckBoxStyle">
            <Styles />
          </div>
        </div>

      </div>  

      <div className="txt2img-third-grid">
        <div className="txt2img-section7">
          <div className="DropBoxStyle" >
            <SamplingMethod />
          </div>
        </div>
     
        <div className="txt2img-section8">
           <div className="SliderStyle">
            <SamplingStep value={formData.steps} onChange={(value) => handleFormDataChange("steps",value)} />
            </div>
        </div>
      </div>


      <div className="txt2img-fourth-grid">
        
        <div className="txt2img-section9">
          <div className="CheckBoxStyle"> 
            <RestoreFaces value={formData.restore_faces} onChange={(value) => handleFormDataChange("restore_faces",value)}/>
          </div> 
        </div>

        <div className="txt2img-section10">
          <div className="CheckBoxStyle">
            <Tilling value={formData.tilling} onChange={(value) => handleFormDataChange("tilling",value)} />
          </div>
        </div>

        <div className="txt2img-section11">
          <div className="CheckBoxStyle">
            <Hires />
           </div>
        </div>

      </div>

      <div className="txt2img-fifth-grid">

        <div className="txt2img-section12">
          <div className="SliderStyle">
            <div>
              <Width value={formData.width} onChange={(value) => handleFormDataChange("width",value)} />
            </div>
          </div>
        </div>

        <div className="txt2img-section13">
          <div className="SliderStyle">
            <div>
              <BatchCount />
             </div>
          </div>
        </div>


        <div className="txt2img-section14">
          <div className="SliderStyle">
            <div>
              <Height value={formData.height} onChange={(value) => handleFormDataChange("height",value)}/>
            </div>
          </div>
        </div>

        <div className="txt2img-section15">
          <div className="SliderStyle">
            <div>
             <BatchSize value={formData.batch_size} onChange={(value) => handleFormDataChange('batch_size', value)} />
             </div>
          </div>
        </div>
      </div>
     
      <div className="txt2img-sixth-grid">
          <div className="txt2img-section16">
            <div className="SliderStyle">
              <div>
                <CFGScale value={formData.cfg_scale} onChange={(value) => handleFormDataChange("cfg_scale",value)} />
              </div>
            </div>
          </div>
      </div>

      <div className="txt2img-seventh-grid">
        <div className="txt2img-section17">
        <div className="SliderStyle">
          <Seed value={formData.seed} onChange={(value)=>handleFormDataChange("seed",value) }/>
         </div>
        </div>

        <div className="txt2img-section18">
          <div>
            <Dice />
          </div>
        </div>

        <div className="txt2img-section19">
          <div>
            <Revolve />
          </div>
        </div>

      </div>
     
    </div>
  );
}

export default TxtPage;

