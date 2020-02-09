
class MathB {

   getRandomRGB = function () {
      return Math.floor((Math.random() * 255) + 1)
   }

   getRandomI = function (x) {
      return Math.floor((Math.random() * (x)))
   }

   isByPercent = function (x) {
      let num = Math.floor((Math.random() * (100) + 1))
      return (num <= x ? true : false)
   }

   isBetween = function (x, y, z) {
      return (x <= y && x >= z || x >= y && x <= z) ? true : false
   }
}



