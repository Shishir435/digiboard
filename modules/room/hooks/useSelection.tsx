import { useEffect, useMemo } from "react";

import { toast } from "react-toastify";

import { socket } from "@/common/lib/socket";
import { useOptionsValue } from "@/common/recoil/options";

import { useCtx } from "./useCtx";
import { useMoveImage } from "./useMoveImage";
import { useRefs } from "./useRefs";

let tempSelection = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export const useSelection = (drawAllMoves: () => Promise<void>) => {
  const ctx = useCtx();
  const options = useOptionsValue();
  const { selection } = options;
  const { bgRef} = useRefs();
  const { setMoveImage } = useMoveImage();

  useEffect(() => {
    
    (async ()=>{
      await drawAllMoves();
      if (ctx && selection) {
        const { x, y, width, height } = selection;
        
        ctx.lineWidth = 2;
          ctx.strokeStyle = "#000";
          ctx.setLineDash([5, 10]);
          ctx.globalCompositeOperation = "source-over";

          ctx.beginPath();
          ctx.rect(x, y, width, height);
          ctx.stroke();
          ctx.closePath();
          
          ctx.setLineDash([]);
        }
        
      })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, ctx]);

  useEffect(()=>{
    const handleCopySelection=(e:KeyboardEvent)=>{
      if(!selection) return;
      const {height,width,x,y}=selection
      if(e.ctrlKey && e.key==='c' && selection){
        
        const imageData=ctx?.getImageData(x,y,width,height)
        if(imageData){
          const canvas=document.createElement('canvas')
          canvas.width=width
          canvas.height=height
          const tempCtx=canvas.getContext('2d')
          tempCtx?.putImageData(imageData,0,0)
          canvas.toBlob((blob)=>{
            if(blob){
              const item= new ClipboardItem({'image/png': blob})
              navigator.clipboard.write([item])
            }
          })
        }

      }
      if(e.ctrlKey && e.key==='Delete' && selection){
        const move:Move={
          circle: {cX: 0, cY:0, radiusX: 0, radiusY: 0},
          rectangle: {
            fill:true,
            width,
            height
          },
          path: [[x,y]],
          options: {
            ...options,
            shape: 'rectangle',
            mode: 'eraser'
          },
          image:{base64:''},
          id: "",
          timestamps: 0,
        }
      }
    }
    document.addEventListener('keydown',handleCopySelection)
    return ()=>{
      document.removeEventListener('keydown',handleCopySelection)
    }
  },[ctx,selection,options,bgRef])

  const dimension = useMemo(() => {
    if (selection) {
      let { x, y, width, height } = selection;

      if (width < 0) {
        width += 4;
        x -= 2;
      } else {
        width -= 4;
        x += 2;
      }
      if (height < 0) {
        height += 4;
        y -= 2;
      } else {
        height -= 4;
        y += 2;
      }

      return { x, y, width, height };
    }

    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  }, [selection]);

};