
class MathB {

   getRandomRGB = function () {
      return Math.floor((Math.random() * 255) + 1)
   }

   getRandomI = function (x) {
      return Math.floor((Math.random() * (x)))
   }

   isByPercent = function (x) {
      let num = Math.floor((Math.random() * (100) + 1))
      // console.log(num)
      return (num <= x ? true : false)
   }

   //testing isByPercent
   // let yes = 0
   // for (let i = 0; i < 1000000; i++) {
   //    isByPercent(30) ? yes++ : null
   // }
   // console.log(yes)
}

