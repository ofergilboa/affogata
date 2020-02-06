class testing {

   goneAfter8Gen = function () {
      console.log(`-----------goneAfter8Gen------------`)
      for (i = 0; i <= pop.length; i++) {
         if (pop[i]) {
            console.log(`generation ${i + 1} exist`)
         } else {
            console.log(`generation ${i + 1} does not exist`)
         }
      }
   }

   createOnly3to6 = function () {
      console.log(`-----------createOnly3to6------------`)
      console.log(`only gen 3-6 go through the process`)

   }

   matchMaxOnceAGen = function () {
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

   childGeneInRange = function () {
      console.log(`-----------childGeneInRange------------`)

   }

   someGeneA = function () {
      console.log(`-----------someGeneA------------`)

   }

   attractOpposite = function () {
      console.log(`-----------attractOpposite------------`)

   }

   settleOverGens = function () {
      console.log(`-----------settleOverGens------------`)

   }

   onlyOnePartner = function () {
      console.log(`-----------onlyOnePartner------------`)

   }

   noSiblingPartner = function () {
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