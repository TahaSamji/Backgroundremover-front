import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';



function App() {


  const [file, setFile] = useState();
  const [Image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [OpenNew, setOpenNew] = useState(false);
  const [progress, setProgress] = useState("");

 

  function handleChange(e) {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));

    setOpen(true);
  }
  let config = {
    debug: true,
    progress: (key, current, total) => {
      setProgress(`Downloading ${key}: ${current} of ${total}`);
    }
  }

  


  const upload = async (file) => {

    try {
      const formData = new FormData();
      formData.append('uploadFile', file);
      const res = await axios({

        // url: "https://vercelbacktest.vercel.app",
        // url: "http://localhost:8000",
      url: "https://backgroundremover-backend.vercel.app",
        method: "post",
        data: formData,
        responseType: 'arraybuffer'
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      // },

      });

      if (res.data) {

        const blob = new Blob([res.data], { type: 'image/png' });
          // Convert base64 string back to Blob
          // const blob = await fetch(`data:image/png;base64,${res.data.data}`).then(res => res.blob());
        
        const imageUrl = URL.createObjectURL(blob);

        setImage(imageUrl);
        setOpenNew(true);
        setOpen(false);

        return;

      }

    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };


  
  return (
    <div className="App"  >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Background Remover</h2>
        <h5 style={{ marginLeft: '100px' }}>File to be uploaded:  <input type="file" name="uploadFile" onChange={handleChange}></input></h5>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(open || OpenNew) && <img src={Image} alt='fileAdd' style={{ height: "350px", borderStyle: 'solid', padding: '20px' }} />}
        <button onClick={()=>upload(file)} style={{ borderRadius: "30", backgroundColor: 'blue', color: 'white', height: '40px', margin: '10px' }}>
          Remove Backgound
          </button>
       {progress}
       
      </div>
    </div>

  );
}

export default App;