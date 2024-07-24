import './App.css';
import React, { useState } from "react";
import axios from 'axios';
import { FadeLoader } from 'react-spinners';


function App() {


  const [file, setFile] = useState();
  const [Image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [OpenNew, setOpenNew] = useState(false);
  const [isloading, setisLoading] = useState(false);


  function handleChange(e) {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  }

  function downloadImage() {
    if (!Image) {
      return;
    }

    const a = document.createElement('a');
    a.href = Image;
    a.download = 'NewImage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  const upload = async (file) => {
    setisLoading(true);
    try {
      const formData = new FormData();
      formData.append('uploadFile', file);
      const res = await axios({

        url: "https://backgroundremover-backend.vercel.app",
        method: "post",
        data: formData

      });

      if (res.data) {


        const blob = await fetch(`data:image/png;base64,${res.data.data}`).then(res => res.blob());

        const imageUrl = URL.createObjectURL(blob);

        setImage(imageUrl);
        setisLoading(false);
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
        <button onClick={() => upload(file)} style={{ borderRadius: "30", backgroundColor: 'blue', color: 'white', height: '40px', margin: '10px' }}>
          Remove Backgound
        </button>
        <FadeLoader loading={isloading} />
        {OpenNew && <button onClick={downloadImage}>Download Image</button>}


      </div>
    </div>

  );
}

export default App;