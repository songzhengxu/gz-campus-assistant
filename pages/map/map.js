// map.js
Page({
  data: {
    markers: [{
      iconPath: "../../img/home.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.099994
      }],
      color:"#FF00FF00",
      width: 20,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../img/life.png',
      position: {
        left: 0,
        top: 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})