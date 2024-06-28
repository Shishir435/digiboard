
export const handleMove=(
    move:Move,
    ctx: CanvasRenderingContext2D
  )=>{
    const {options,path}=move
    const tempCtx=ctx
    if(tempCtx){
      tempCtx.lineWidth=options.lineWidth
      tempCtx.strokeStyle=options.lineColor

      tempCtx.beginPath()
      path.forEach(([x,y])=>{
        tempCtx.lineTo(x,y)
      })
      tempCtx.stroke()
      tempCtx.closePath()
    }
}

export const drawAllMoves=(
  ctx:CanvasRenderingContext2D,
  room: ClientRoom
)=>{
  const {movesWithoutUser,users,myMoves}=room
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
  movesWithoutUser.forEach((move)=>handleMove(move,ctx))

  users.forEach((userMoves)=>{
    userMoves.forEach((move)=>handleMove(move,ctx))
  })
  // TODO: fix this issue
  Array.from(myMoves).forEach((move) => handleMove(move, ctx))
  if (Array.isArray(myMoves)) {
    // myMoves.forEach((move) => handleMove(move, ctx));
  } else {
    console.log('myMoves is not an array:', myMoves);
  }
}