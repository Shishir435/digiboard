// export const handleMove=(
//     move:Move,
//     ctx: CanvasRenderingContext2D
//   )=>{
//     const {options,path}=move
//       if(move.eraser){
//         ctx.globalCompositeOperation='destination-out'
//       }
//       ctx.lineWidth=options.lineWidth
//       ctx.strokeStyle=options.lineColor

//       switch(options.shape){
//         case "line":
//           ctx.beginPath()
//           path.forEach(([x,y])=>{
//             ctx.lineTo(x,y)
//           })
//           ctx.stroke()
//           ctx.closePath()
//           break;
//         case "circle":
//           ctx.beginPath()
//           ctx.arc(path[0][0],path[0][1],move.radius,0,2*Math.PI);
//           ctx.stroke()
//           ctx.closePath()
//           break;
//         case "rectangle":
//           ctx.beginPath()
//           ctx.rect(path[0][0],path[0][1],move.width,move.height)
//           ctx.stroke()
//           ctx.closePath()
//           break;
//         default:
//           break;
//       }
//       ctx.globalCompositeOperation='source-over'
// }


// export const drawAllMoves=(
//   ctx:CanvasRenderingContext2D,
//   room: ClientRoom,
//   options: CtxOptions
// )=>{
//   const {movesWithoutUser,usersMoves,myMoves}=room
//   ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
  
//   const moves=[...movesWithoutUser,...(myMoves||[])]

//   usersMoves.forEach((userMove)=>{
//     moves.push(...userMove)
//   })
//   moves.sort((a,b)=>a.timestamps-b.timestamps)
//   moves.forEach((move)=>handleMove(move,ctx))
//   ctx.lineJoin='round'
//   ctx.lineCap='round'
//   ctx.lineWidth=options.lineWidth
//   ctx.strokeStyle=options.lineColor
//   if(options.erase) ctx.globalCompositeOperation='destination-out'
// }

const getWidthAndHeight = (
  x: number,
  y: number,
  from: [number, number],
  shift?: boolean
) => {
  let width = x - from[0];
  let height = y - from[1];

  if (shift) {
    if (Math.abs(width) > Math.abs(height)) {
      if ((width > 0 && height < 0) || (width < 0 && height > 0))
        width = -height;
      else width = height;
    } else if ((height > 0 && width < 0) || (height < 0 && width > 0))
      height = -width;
    else height = width;
  } else {
    width = x - from[0];
    height = y - from[1];
  }

  return { width, height };
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  from: [number, number],
  x: number,
  y: number,
) => {
  ctx.beginPath();
  const radius=Math.sqrt((x-from[0])**2+(y-from[1]**2))
  ctx.arc(from[0],from[1],radius,0,2*Math.PI)
  ctx.stroke();
  ctx.closePath();
  return radius;
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  from: [number, number],
  x: number,
  y: number,
  shift?: boolean,
  fill?: boolean
) => {
  ctx.beginPath();

  const { width, height } = getWidthAndHeight(x, y, from, shift);

  if (fill) ctx.fillRect(from[0], from[1], width, height);
  else ctx.rect(from[0], from[1], width, height);

  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  return { width, height };
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  from: [number, number],
  x: number,
  y: number,
  shift?: boolean
) => {
  if (shift) {
    ctx.beginPath();
    ctx.lineTo(from[0], from[1]);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    return;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
};