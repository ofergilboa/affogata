
class testing {

   goneAfter8Gen = (pop) => {
      let pixPerGen = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i] ? pixPerGen[i+1] += pop[i][j].length : null
         }
      }
      let all = 0
      for (let i = 0; i < 10; i++) {
         all += pixPerGen[i]
      }
      console.log(`there are ${all} pixels`)
      for (let i = 0; i < 10; i++) {
         console.log(`${i}) there are ${pixPerGen[i]} pixels in generation ${i}`)
      }
   }

   createOnly3to6 = function (pop) {
      console.log(`-----------createOnly3to6------------`)
      let parents = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => parents[p.parentsGenAtBirth]++)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) there are ${parents[i]} kids, who's parents were generation ${i} when they were born`)
      }
   }

   matchOnly3to6 = function (pop) {
      console.log(`-----------matchOnly3to6------------`)
      let matched = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => matched[p.matchedAtGen]++)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) there are ${matched[i]} pixels who matched at generation ${i}`)
      }
   }


   matchMaxOnceAGen = function (pop) {
      console.log(`-----------matchMaxOnceAGen------------`)
      let gen = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      let correct = 0
      let incorrect = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => p.tried > gen[i + 1] ? gen[i + 1] = p.tried : null)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) the max match tries for a pixel at generation ${i} is: ${gen[i]}`)
      }
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

