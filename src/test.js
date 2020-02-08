
class testing {

   goneAfter8Gen =  (pop) => {
      console.log(`-----------goneAfter8Gen------------`)
      for (let i = 0; i <= pop.length; i++) {
         if (pop[i]) {
            console.log(`generation ${i + 1} exist`)
         } else {
            console.log(`generation ${i + 1} does not exist`)
         }
      }
   }

   createOnly3to6 = function (pop) {
      console.log(`-----------createOnly3to6------------`)
      console.log(`only gen 3-6 go through the process`)

   }

   matchMaxOnceAGen = function (pop) {
      console.log(`-----------matchMaxOnceAGen------------`)
      let correct = 0
      let incorrect = 0
      for (let i = 0; i < pop.length; i++) {
         for (let j = 0; j < pop.length; j++) {
            for (let k = 0; k < pop.length; k++) {
               if (pop[i][j][k]) {
                  if (pop[i][j][k].tried == 0 || pop[i][j][k].tried == 1)
                     correct++
               } else {
                  incorrect++
               } {
               }
            }
         }
      }
      console.log(`correct: ${correct}`)
      console.log(`incorrect: ${incorrect}`)

   }

   childGeneInRange = function (pop) {
      console.log(`-----------childGeneInRange------------`)

   }

   someGeneA = function (pop) {
      console.log(`-----------someGeneA------------`)

   }

   attractOpposite = function (pop) {
      console.log(`-----------attractOpposite------------`)

   }

   settleOverGens = function (pop) {
      console.log(`-----------settleOverGens------------`)

   }

   onlyOnePartner = function (pop) {
      console.log(`-----------onlyOnePartner------------`)

   }

   noSiblingPartner = function (pop) {
      console.log(`-----------noSiblingPartner------------`)

   }
}


// tests.goneAfter8Gen()
// tests.createOnly3to6()
// tests.matchMaxOnceAGen()
// tests.childGeneInRange()
// tests.someGeneA()
// tests.attractOpposite()
// tests.settleOverGens()
// tests.onlyOnePartner()
// tests.noSiblingPartner()



// const add = require('./main')

// test("add should return sum of a + b", () => {
//     let sum = add(1, 2)
//     expect(sum).toBe(3)
// })

//  add = function(a, b){
// return a + b
// }
// 
// module.exports = add

