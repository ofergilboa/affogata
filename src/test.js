const mathT = new MathB()
const isBetween = mathT.isBetween

class testing {

   goneAfter8Generations = (population) => {
      console.log(`1 ---goneAfter8Gen---- Pixels have a life-span of 8 generations`)
      let pixelsPerGeneration = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
      for (let i = 0; i < 9; i++) {
         population[i] ? pixelsPerGeneration[i + 1] += population[i].length : null
      }
      let all = 0
      for (let i = 0; i < 10; i++) {
         all += pixelsPerGeneration[i]
      }
      console.log(`There are ${all} pixels`)
      for (let i = 0; i < 10; i++) {
         console.log(`${i}) There are ${pixelsPerGeneration[i]} pixels in generation ${i}`)
      }
   }

   createOnly3to6 = function (population) {
      console.log(`2 ---createOnly3to6---- A pixel can replicate only between its 3rd and 6th generations`)
      let kids = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < population[7].length; i++) {
         for (let j = 0; j < population[7][i].kids.id.length; j++) {
            let childID = population[7][i].kids.id[j]
            for (let n = 0; n < 8; n++) {
               for (let k = 0; k < population[n].length; k++) {
                  childID == population[n][k].id ? kids[population[n][k].currentGeneration]++ : null
               }
            }
         }
      }
      for (let i = 1; i < 9; i++) {
         console.log(`${i}) ${kids[i]} conceived at generation ${9 - i}: Pixels in generation 8 have ${kids[i]} kids in generation ${i}  `)
      }
   }

   aChildMaxPerGeneration = function (population) {
      console.log(`3 ---maxChildPerGen---- A pixel can try creating kids only once a generation`)
      let oneMax = 0
      let moreThanOne = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < population[i][1].length; j += 2) {
            for (let k = 3; k < 7; k++) {
               population[i][1][j].createdKidsAtGens[k] > 1 ? moreThanOne++ : oneMax++
            }
         }
      }
      console.log(`There are ${moreThanOne} pixels who created more then one kid at the same generation and ${oneMax / 4} who didn't`)

      let generation = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 3; j < 7; j++) {
            population[i].forEach(p => p.createTries > generation[i + 1] ? generation[i + 1] = p.createTries : null)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) The max replicate tries for a pixel at generation ${i} is: ${generation[i]}`)
      }
   }

   matchOnly3to6 = function (population) {
      console.log(`4 ---matchOnly3to6---- A pixel can search for a partner only between its 3rd and 6th generations`)
      let matched = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            population[i].forEach(p => p.matchTries ? matched[p.matchTries + 2]++ : null)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) There are ${matched[i]} pixels who matched at generation ${i}`)
      }
   }

   matchMaxOnceAGeneration = function (population) {
      console.log(`5 ---matchMaxOnceAGen---- A pixel can search for a partner only once a generation`)
      let generation = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 3; j < 7; j++) {
            population[i].forEach(p => p.matchTries > generation[i + 1] ? generation[i + 1] = p.matchTries : null)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) The max match tries for a pixel at generation ${i} is: ${generation[i]}`)
      }
   }

   // matchCreateOnceAGeneration = function (population) {
   //    console.log(`---matchMaxOnceAGen---- A pixel can search for a partner only once a generation`)
   //    let generation = { 0: 9, 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9 }
   //    for (let i = 2; i < 8; i++) {
   //       // for (let j = 3; j < 9; j++) {
   //       population[i].forEach(p => p.matchTries + p.createTries < generation[i + 1] ? generation[i + 1] = p.matchTries + p.createTries : null)
   //       // }
   //    }
   //    for (let i = 0; i < 9; i++) {
   //       console.log(`${i}) The minimum match + create tries for a pixel at generation ${i} is: ${generation[i]}`)
   //    }
   // }

   childGeneInRange = function (population) {
      console.log(`6 ---childGeneInRange---- Pixel's genes are in range of their parents equivalent genes`)
      let between = 0
      let notBetween = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < population[i].length; j++) {
            for (let k = 0; k < population[i][j].kids.genes.length; k++) {
               let partner = population[i].find(p => p.id === population[i][j].partner)
               isBetween(population[i][j].kids.genes[k].R, population[i][j].genes.R, partner.genes.R) ? between++ : notBetween++
               isBetween(population[i][j].kids.genes[k].G, population[i][j].genes.G, partner.genes.G) ? between++ : notBetween++
               isBetween(population[i][j].kids.genes[k].B, population[i][j].genes.B, partner.genes.B) ? between++ : notBetween++
            }
         }
      }
      console.log(`There are ${between / 2} genes in range of their parents genes and ${notBetween} genes that are not`)
   }

   someGeneA = function (population) {
      console.log(`7 ---someGeneA---- A pixel can be born with either an RGB sequence, or an RGBA sequence`)
      let geneA = 0
      let noGeneA = 0
      for (let i = 0; i < 8; i++) {
         population[i].forEach(p => p.genes.A ? geneA++ : noGeneA++)
      }
      console.log(`There are ${geneA} pixels with gene A and ${noGeneA} without`)
   }

   attractOpposite = function (population) {
      console.log(`8 ---attractOpposite---- Pixels are more attracted to their genetic opposites`)
      let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      let dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      for (let i = 2; i < 8; i++) {
         for (let k = 0; k < population[i].length; k++) {
            if (isBetween(population[i][k].attraction, 0, 20)) {
               count++
               dist += population[i][k].geneDist
            } else if (isBetween(population[i][k].attraction, 21, 40)) {
               count[2]++
               dist[2] += population[i][k].geneDist
            } else if (isBetween(population[i][k].attraction, 41, 60)) {
               count[3]++
               dist[3] += population[i][k].geneDist
            } else if (isBetween(population[i][k].attraction, 61, 80)) {
               count[4]++
               dist[4] += population[i][k].geneDist
            } else if (isBetween(population[i][k].attraction, 81, 100)) {
               count[5]++
               dist[5] += population[i][k].geneDist
            }
         }
      }
      for (let i = 1; i < 6; i++) {
         console.log(`The average distance between genes of pixels with attraction ${i * 20 - 19}-${i * 20} is: ${Math.floor(dist[i] / count[i])}`)
      }
   }

   settleOverGeneration = function (population) {
      console.log(`9 ---settleOverGens---- The higher the generation of a pixel, the less attraction is needed to match`)
      let count = { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      let attractionAt = { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 2; i < 8; i++) {
         for (let k = 0; k < population[i].length; k++) {
            attractionAt[population[i][k].matchTries + 2] += population[i][k].attraction
            count[population[i][k].matchTries + 2]++
         }
      }
      for (let i = 3; i < 7; i++) {
         console.log(`The average attraction between pixels who matched at generation ${[i]} is: ${Math.ceil(attractionAt[i] / count[i])}`)
      }
   }

   noSiblingPartner = function (population) {
      console.log(`10 ---noSiblingPartner---- Pixels don’t mate with any of their direct siblings`)
      let sameGen = 0
      let difGen = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < population[i][1].length; j += 2) {
            population[i][1][j].matchedAtGen == population[i][1][j + 1].matchedAtGen ? sameGen++ : difGen++
         }
      }
      console.log(`There are ${sameGen} couples from the same generation and ${difGen} couples from different generations`)

      console.log(`We have shown: 
   1) Pixels only match within their generation
   2) Pixels reproduce maximum once a generation
hence:
   A pixels don't match outside their generation and has no siblings inside their generation
Therefor:
   pixels don’t mate with any of their direct siblings`)
   }

   onlyOnePartner = function () {
      console.log(`---onlyOnePartner----`)
      console.log(`if a pixel who's "matchedAtGen" attribute is a number, which means he is not single,
 the pixels population will alert him/her/it not to do that, then lose all faith in existence and crash`)
   }
}



   // onlyMatchSameGeneration = function (population) {
   //    console.log(`---onlyMatchSameGen----`)
   //    let sameGen = 0
   //    let difGen = 0
   //    for (let i = 0; i < 8; i++) {
   //       for (let j = 0; j < population[i][1].length; j += 2) {
   //          population[i][1][j].matchedAtGen == population[i][1][j + 1].matchedAtGen ? sameGen++ : difGen++
   //       }
   //    }
   //    console.log(`There are ${sameGen} couples from the same generation and ${difGen} couples from different generations`)
   // }