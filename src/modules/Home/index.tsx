/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import moldura1 from "../../assets/molduras/moldura.png"
// import moldura2 from "../../assets/molduras/moldura2.png"
// import moldura3 from "../../assets/molduras/moldura3.png"

// const Home = () => {
//     const [image, setBase64Image] = useState<string | null>(null);

//     const handleImageToTransform = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0];
        
//         if (file) {
//             const reader = new FileReader();


//             reader.onloadend = () => {
//                 const imageBase64 = reader.result as string
//                 setBase64Image(imageBase64)

//             }
//             reader.readAsDataURL(file)
//         }
//     }
//     return (
//         <div className=" h-full w-full bg-slate-400 flex ">
            
//             <div className="h-full w-[50%] flex-col gap-5 justify-center  items-center">


            
//             <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageToTransform}
//              />

//             <div className="flex w-full items-end ">
//              <img src={moldura1} width={300} height={300} alt="" />
//              <img src={moldura2} width={300} height={300} alt="" />
//              <img src={moldura3} width={300} height={300} alt="" />
//             </div>

//             </div>
            




//             <div className="w-[50%] h-full flex items-center justify-center ">

//             {image && ( 
//                 <div className="max-w-full flex wrap flex-col">
//                     <img 
//                     className="-mb-80 -ml-8 z-30"
//                     src={moldura1} width={400} alt="" />
//                     <img
//                     className="-mt-10"
//                     src={image} width={300} alt="imagem" />
                
//                 </div>

//             )}
//             </div>

//         </div>
//     )

// };


// export default Home;
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import mergeImages from "merge-images";
import InputFile from "../../componentes/inputFile";

const resizeFile = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      1080,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64",
      1080,
      1080
    );
  });

const Home: React.FC = () => {
  const [foto, setFoto] = useState<string>("");
  const [frame, setFrame] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const fileResize = (await resizeFile(file)) as string;
      if (e.target.name === "foto") {
        setFoto(fileResize);
      }

      if (e.target.name === "frame") {
        setFrame(fileResize);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    mergeImages([foto, frame], { width: 1080, height: 1080 })
      .then((b64) => setResultado(b64))
      .catch((e) => console.log(e));
  };

  return (
    <div className=" lg:w-[50%]  h-[80%] flex flex-col justify-around items-center   bg-white border backdrop:blur-2 rounded-2xl p-2 ">
      <h1 className="text-2xl text-center ">
        Escolher um <span id="Destaque">frame/borda</span> para uma foto
      </h1>

      <form className="flex flex-col gap-5 ">
        <InputFile
          accept=".png"
          label="Foto"
          nome="foto"
          onChange={handleChange}
        />

        <InputFile
          label="Frame"
          nome="frame"
          accept=".png"
          onChange={handleChange}
        />

        <button
          onClick={handleClick}
          disabled={foto && frame ? false : true}
          style={
            foto && frame
              ? { opacity: 1, pointerEvents: 'visible' }
              : { opacity: 0.5, pointerEvents: 'none' }
          }
        >
          Gerar imagem
        </button>
      </form>

      {resultado && <img width={300} src={resultado} alt="nova foto com frame" />}
    </div>
  );
};

export default Home;
