
class testing {

   goneAfter8Gen = (pop) => {
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
      let parents = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => parents[p.parentsGenAtBirth]++)
         }
      }
      console.log(`0) there are ${parents[0]} kids, who's parents generation at birth was 0`)
      console.log(`1) there are ${parents[1]} kids, who's parents generation at birth was 1`)
      console.log(`2) there are ${parents[2]} kids, who's parents generation at birth was 2`)
      console.log(`3) there are ${parents[3]} kids, who's parents generation at birth was 3`)
      console.log(`4) there are ${parents[4]} kids, who's parents generation at birth was 4`)
      console.log(`5) there are ${parents[5]} kids, who's parents generation at birth was 5`)
      console.log(`6) there are ${parents[6]} kids, who's parents generation at birth was 6`)
      console.log(`7) there are ${parents[7]} kids, who's parents generation at birth was 7`)
      console.log(`8) there are ${parents[8]} kids, who's parents generation at birth was 8`)
   }

   matchOnly3to6 = function (pop) {
      console.log(`-----------matchOnly3to6------------`)
      let matched = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => matched[p.matchedAtGen]++)
         }
      }
      console.log(`0) there are ${matched[0]} pixels who matched at generation 0`)
      console.log(`1) there are ${matched[1]} pixels who matched at generation 1`)
      console.log(`2) there are ${matched[2]} pixels who matched at generation 2`)
      console.log(`3) there are ${matched[3]} pixels who matched at generation 3`)
      console.log(`4) there are ${matched[4]} pixels who matched at generation 4`)
      console.log(`5) there are ${matched[5]} pixels who matched at generation 5`)
      console.log(`6) there are ${matched[6]} pixels who matched at generation 6`)
      console.log(`7) there are ${matched[7]} pixels who matched at generation 7`)
      console.log(`8) there are ${matched[8]} pixels who matched at generation 8`)
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
      console.log(`0) the max match tries for a pixel at generation 0 is: ${gen[0]}`)
      console.log(`1) the max match tries for a pixel at generation 1 is: ${gen[1]}`)
      console.log(`2) the max match tries for a pixel at generation 2 is: ${gen[2]}`)
      console.log(`3) the max match tries for a pixel at generation 3 is: ${gen[3]}`)
      console.log(`4) the max match tries for a pixel at generation 4 is: ${gen[4]}`)
      console.log(`5) the max match tries for a pixel at generation 5 is: ${gen[5]}`)
      console.log(`6) the max match tries for a pixel at generation 6 is: ${gen[6]}`)
      console.log(`7) the max match tries for a pixel at generation 7 is: ${gen[7]}`)
      console.log(`8) the max match tries for a pixel at generation 8 is: ${gen[8]}`)
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

