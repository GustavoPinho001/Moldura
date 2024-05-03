// import React, { useState } from "react";
// import Resizer from "react-image-file-resizer";
// import mergeImages from "merge-images";
// import InputFile from "./inputFile";
// import { State } from "../modules/Home/home";


// const resizeFile = (file: File): Promise<string | ArrayBuffer | null> =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       1080,
//       1080,
//       "PNG",
//       100,
//       0,
//       (uri) => {
//         resolve(uri as string);
//       },
//       "base64",
//       1080,
//       1080
//     );
//   });

// const Margeimages = ({ image, moldura }: State) => {
//   const [foto, setFoto] = useState<string>("");
//   const [frame, setFrame] = useState<string>("");
//   const [resultado, setResultado] = useState<string>("");

//   // const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   try {
//   //     const file = e.target.files && e.target.files[0];
//   //     if (!file) return;

//   //     const fileResize = (await resizeFile(file)) as string;
//   //     if (e.target.name === "foto") {
//   //       setFoto(fileResize);
//   //     }

//   //     if (e.target.name === "frame") {
//   //       setFrame(fileResize);
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };
//   const getMandF = () => {
//     setFoto(image)
//     setFrame(moldura)

//   };
//   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();

//     mergeImages([foto, frame], { width: 1080, height: 1080 })
//       .then((b64) => setResultado(b64))
//       .catch((e) => console.log(e));
//   };

//   return (
//     <div className=" lg:w-[50%]  h-[80%] flex flex-col justify-around items-center   bg-white border backdrop:blur-2 rounded-2xl p-2 ">
//       <h1 className="text-2xl text-center ">
//         Escolher um <span id="Destaque">frame/borda</span> para uma foto
//       </h1>

//       <form className="flex flex-col w-full justify-center items-center gap-5 ">
//         {/* <InputFile
//           accept=".png"
//           label="Foto"
//           nome="foto"
//           onChange={handleChange}
//         />

//         <InputFile
//           label="Frame"
//           nome="frame"
//           accept=".png"
//           onChange={handleChange}
//         /> */}

//         <button
//           onClick={handleClick}
//           disabled={foto && frame ? false : true}
//           style={
//             foto && frame
//               ? { opacity: 1, pointerEvents: 'visible' }
//               : { opacity: 0.5, pointerEvents: 'none' }
//           }
//         >
//           Gerar imagem
//         </button>
//       </form>
//       {resultado && (
//         <img src={resultado} alt="" />
//       )}
//     </div>
//   );
// };

// export default Margeimages;
