import Resizer from "react-image-file-resizer";

export const optimizeImage=(file:File,callBack:(uri:string)=>void)=>{

    Resizer.imageFileResizer(file,700,700,'WEBP',100,0,
        (uri)=>{
        callBack(uri.toString())
    },"base64")

}