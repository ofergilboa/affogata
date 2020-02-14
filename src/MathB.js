class MathB {

   getRandomI = function (x) {
      return Math.ceil((Math.random() * (x)))
   }

   isByPercent = function (x) {
      let num = Math.floor(Math.random() * (101))
      return (num <= x ? true : false)
   }

   isBetween = function (x, y, z) {
      return (x <= y && x >= z || x >= y && x <= z) ? true : false
   }
}



