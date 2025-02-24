import { useState } from "react";



    export const QRcode = () => {
     const [img, setImg]= useState("");
     const [loading, setLoading] = useState();
     const [qrdata, setQrdata]=useState("");
     const [qrsize, setQrsize]=useState("");
     

      async function generation()
      {
         setLoading(true);    
         try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url);
         }
         catch(error)
         {
            console.error("Error generating QR code",error);
         } 
         finally
         {
          setLoading(false);
         }                                                          

        

      }
      function downloadqr()
      {
        fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Corrected from herf to href
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>
    {
      console.log("Error Downloading QR Code", error);
    });


      }
        return (
          <div className="codecontainer">
            <h1>QR CODE GENERATOR</h1>
           {loading && <p>Please Wait......</p>}
           {img && <img src={img}  className="imagestyle"  />}
            <div >
            <label htmlFor="datainput"   className="inlabel" >Data For QrCode:</label>
            <input type="text" id="datainput" value={qrdata} placeholder="Enter the QR Code" onChange={(e) => setQrdata(e.target.value)}/>
            <label htmlFor="wordsize" className="inlabel" >image size(e.g. 150):</label>
            <input type="text" id="wordsize" value={qrsize} placeholder="Enter The Size" onChange={(e) => setQrsize(e.target.value)} />
            <button class="generate"  disabled={loading} onClick={generation}>Generate QR Code</button>
            <button className="download" onClick={downloadqr} >Download QR Code</button>
            </div>
          </div>
        );
      };
      






      
