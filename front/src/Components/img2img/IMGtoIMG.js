import React, { useState } from "react";
import "./IMG.css";
import CheckPoint from "../DropBox/CheckPoint";
import Prompt from "../Prompt/Prompt";
import NegativePrompt from "../Prompt/NegativePrompt";
import Generate from "../Button/Generate";
import IntergrateCLIP from '../Button/IntergrateCLIP';
import DeepBooru from '../Button/DeepBooru';
import JustResize from '../CheckBox/JustResize';
import CropAndResize from '../CheckBox/CropAndResize';
import ResizeAndFill from '../CheckBox/ResizeAndFill';
import LatentUpscale from '../CheckBox/LatentUpscale';
import SamplingMethod from "../DropBox/SamplingMethod";
import SamplingStep from "../Slider/SamplingStep";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import Width from "../Slider/Width";
import Height from "../Slider/Height";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize";
import CFGScale from "../Slider/CFGScale";
import DenoisingStrength from "../Slider/DenoisingStength";
import Seed from "../Slider/Seed";
import Script from "../DropBox/Script";
import axios from 'axios';
import { NavLink } from "react-router-dom";

function ImgPage() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [imgData, setImgData] = useState({
    init_images: "",   // photo to string in binary 
    prompt: "", // prompt 
    negative_prompt: "", // prompt 
    resize_mode: 0, // slider 
    denoising_strength: 0, // slider 
    inpaint_full_res: false, // ?
    inpaint_full_res_padding: 0, // button check  
    inpainting_mask_invert: 0, // ?
    initial_noise_multiplier: 0, // ?
    styles: [], // 選集
    seed: 0, // random value 
    batch_size: 0, // slider 
    n_iter: 0, // ?
    steps: 0, // slider 
    cfg_scale: 0, // slider 
    width: 0, // slider 
    height: 0, // slider 
    restore_faces: false, // check box
    mask_blur: 0, //?
    tiling: false, // check box
    eta: 0, // ?
    sampler_index: "", // ?
    alwayson_scripts: "", // ?
    override_settings: {
      sd_model_checkpoint: ""
    }
  });

  // 轉換字形
  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
  
  const handleFormDataChange = (fieldName, value) => {
    setImgData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  
    // 查看更新
    console.log(`Field ${fieldName} updated to:`, value);
    console.log(imgData);
  };
  
  const handleGenerateClick = () => {
    const confirmed = window.confirm("确定要提交吗?");
    if (confirmed) {
      // 轉換數據請求
      const requestData = {
        method: "POST",
        request: Object.keys(imgData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = imgData[key];
          return acc;
        }, {}),
        response: {
          message: "傳輸成功",
        },
      };
      jsonFunction(requestData);
    }
  };

  async function jsonFunction(imgToImgData) {
    try {
      await axios.post("https://localhost:8080/api/img2img/process", imgToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.log("數據出錯:", error);
    }
  }

  return (
    <div className="IMGcontainer" style={{padding:20}}>
     
      {/* elements nested in div className="grid"  */}
      <div className="img2img-first-grid">

        {/* each components nested in it's own div section */}
        <div className="img2img-section1">
          <div className="NavStyle">
            <span>
              <NavLink to="/">
                <button>TxtPage</button>
              </NavLink>
            </span>
         </div>
        </div>

        <div className="img2img-section2">
          <div >
            <CheckPoint />
           </div>
        </div>
      </div>
 
      <div className="img2img-second-grid">
        <div className="img2img-section3">
          <div className="PromptStyle">
            <Prompt value={imgData.prompt} onChange={(value) => handleFormDataChange("prompt",value)} />
          </div>
        </div>

        <div className="img2img-section4">
          <div className="ButtonStyle">
            <IntergrateCLIP />
          </div>
        </div>

        <div className="img2img-section5">
          <div className="ButtonStyle">
            <Generate onClick={handleGenerateClick} />
          </div>
        </div>

        <div className="img2img-section6">
          <div className="PromptStyle">
            <NegativePrompt value={imgData.negative_prompt} onChange={(value) => handleFormDataChange("negative_prompt",value)} />
          </div>
        </div>

        <div className="img2img-section7">
         <div className="ButtonStyle">
              <DeepBooru />
           </div>
        </div>
      </div>

      <div className="img2img-third-grid">
        <div className="img2img-section9">
          <div className="CheckBoxStyle">
            <JustResize />
          </div>
        </div>

        <div className="img2img-section10">
          <div className="CheckBoxStyle">
            <CropAndResize />
          </div>
        </div>

        <div className="img2img-section11">
          <div className="CheckBoxStyle">
            <ResizeAndFill />
          </div>
        </div>

        <div className="img2img-section12">
          <div className="CheckBoxStyle">
            <LatentUpscale />
          </div>
        </div>
      </div>
     
      <div className="img2img-fourth-grid">

        <div className="img2img-section13">
          <div className="DropBoxStyle">
            <SamplingMethod />
          </div>
        </div>

        <div className="img2img-section14">
          <div className="SliderStyle">
           <SamplingStep value={imgData.steps} onChange={(value) => handleFormDataChange("steps",value)} />
          </div>
        </div>

    
      </div>

      <div className="img2img-fifth-grid">
        <div className="img2img-section15">
          <div className="CheckBoxStyle">
            <RestoreFaces value={imgData.restore_faces} onChange={(value) => handleFormDataChange("restore_faces",value)}/>
          </div>
        </div>

        <div className="img2img-section16">
          <div className="CheckBoxStyle">
            <Tilling value={imgData.tilling} onChange={(value) => handleFormDataChange("tilling",value)} />
          </div>
        </div>

      </div>

      <div className="img2img-sixth-grid">

        <div className="img2img-section17">
          <div className="SliderStyle">
            <Width value={imgData.width} onChange={(value) => handleFormDataChange("width",value)} />
          </div>
        </div>

        <div className="img2img-section18">
          <div className="SliderStyle">
            <BatchCount />
          </div>
        </div>

        <div className="img2img-section19">
          <div className="SliderStyle">
            <Height value={imgData.height} onChange={(value) => handleFormDataChange("height",value)}/>
          </div>
        </div>

        <div className="img2img-section20">
          <div className="SliderStyle">
            <BatchSize value={imgData.batch_size} onChange={(value) => handleFormDataChange('batch_size', value)} />
          </div>
        </div>
      </div>
 
      <div className="img2img-seventh-grid">

        <div className="img2img-section21">
          <div className="SliderStyle">
            <CFGScale value={imgData.cfg_scale} onChange={(value) => handleFormDataChange("cfg_scale",value)} />
          </div>
        </div>

        <div className="img2img-section22">
          <div className="SliderStyle">
            <DenoisingStrength />
          </div>
        </div>

        <div className="img2img-section23">
          <div className="PromptStyle">
            <Seed value={imgData.seed} onChange={(value)=>handleFormDataChange("seed",value) }/>
          </div>
        </div>

        <div className="img2img-section24">
          <div className="DropBoxStyle">
            <Script />
          </div>
        </div>
      </div>
 



    </div>
  );
}

export default ImgPage;

