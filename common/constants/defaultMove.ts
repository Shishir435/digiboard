export const DEFAULT_MOVE:Move={
    circle:{
        cX: 0,
        cY: 0,
        radiusX: 0,
        radiusY: 0,
    },
    image: {
        base64: ""
    },
    rectangle: {
        height: 0,
        width: 0,
    },
    path: [],
    options: {
        shape: 'line',
        lineColor: {r:0,g:0,b:0,a: 0},
        fillColor: {r:0,g:0,b:0,a: 0},
        lineWidth: 1,
        mode: 'draw',
        selection: null
    },
    timestamps: 0,
    id: ""
}