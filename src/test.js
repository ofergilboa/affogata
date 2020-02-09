const mathT = new MathB()
const isBetween = mathT.isBetween

class testing {

   goneAfter8Gen = (pop) => {
      let pixPerGen = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i] ? pixPerGen[i + 1] += pop[i][j].length : null
         }
      }
      let all = 0
      for (let i = 0; i < 10; i++) {
         all += pixPerGen[i]
      }
      console.log(`There are ${all} pixels`)
      for (let i = 0; i < 10; i++) {
         console.log(`${i}) There are ${pixPerGen[i]} pixels in generation ${i}`)
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
         console.log(`${i}) There are ${parents[i]} kids, who's parents were generation ${i} when they were born`)
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
         console.log(`${i}) There are ${matched[i]} pixels who matched at generation ${i}`)
      }
   }

   matchMaxOnceAGen = function (pop) {
      console.log(`-----------matchMaxOnceAGen------------`)
      let gen = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => p.tried > gen[i + 1] ? gen[i + 1] = p.tried : null)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) The max match tries for a pixel at generation ${i} is: ${gen[i]}`)
      }
   }

   childGeneInRange = function (pop) {
      console.log(`-----------childGeneInRange------------`)
      let between = 0
      let notBetween = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < pop[i][1].length; j += 2) {
            for (let k = 0; k < pop[i][1][j].kids.length; k++) {
               isBetween(pop[i][1][j].kids[k].R, pop[i][1][j].gene.R, pop[i][1][j + 1].gene.R) ? between++ : notBetween++
               isBetween(pop[i][1][j].kids[k].G, pop[i][1][j].gene.G, pop[i][1][j + 1].gene.G) ? between++ : notBetween++
               isBetween(pop[i][1][j].kids[k].B, pop[i][1][j].gene.B, pop[i][1][j + 1].gene.B) ? between++ : notBetween++
            }
         }
      }
      console.log(`There are ${between} genes in range of their parents genes and ${notBetween} genes that are not
      *checks only pixels who's parents are alive `)
   }

   someGeneA = function (pop) {
      console.log(`-----------someGeneA------------`)
      let geneA = 0
      let noGeneA = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            pop[i][j].forEach(p => p.gene.A ? geneA++ : noGeneA++)
         }
      }
      console.log(`There are ${geneA} pixels with gene A and ${noGeneA} without`)
   }

   attractOpposite = function (pop) {
      console.log(`-----------attractOpposite------------`)
      let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      let dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      for (let i = 2; i < 8; i++) {
         for (let k = 0; k < pop[i][1].length; k++) {
            if (isBetween(pop[i][1][k].attraction, 0, 20)) {
               count[1]++
               dist[1] += pop[i][1][k].geneDist
            } else if (isBetween(pop[i][1][k].attraction, 21, 40)) {
               count[2]++
               dist[2] += pop[i][1][k].geneDist
            } else if (isBetween(pop[i][1][k].attraction, 41, 60)) {
               count[3]++
               dist[3] += pop[i][1][k].geneDist
            } else if (isBetween(pop[i][1][k].attraction, 61, 80)) {
               count[4]++
               dist[4] += pop[i][1][k].geneDist
            } else if (isBetween(pop[i][1][k].attraction, 81, 100)) {
               count[5]++
               dist[5] += pop[i][1][k].geneDist
            }
         }
      }
      for (let i = 1; i < 6; i++) {
         console.log(`The average distance between genes of pixels with attraction ${i * 20 - 19}-${i * 20} is: ${Math.floor(dist[i] / count[i])}`)
      }
   }

   settleOverGens = function (pop) {
      console.log(`-----------settleOverGens------------`)
      let count = { 3: 0, 4: 0, 5: 0, 6: 0 }
      let attMatchedAt = { 3: 0, 4: 0, 5: 0, 6: 0 }
      for (let i = 2; i < 8; i++) {
         for (let k = 0; k < pop[i][1].length; k++) {
            attMatchedAt[pop[i][1][k].matchedAtGen] += pop[i][1][k].attraction
            count[pop[i][1][k].matchedAtGen]++
         }
      }
      for (let i = 3; i < 7; i++) {
         console.log(`The average attraction between pixels who matched at generation ${[i]} is: ${Math.floor(attMatchedAt[i] / count[i])}`)
      }
   }

   onlyMatchSameGen = function (pop) {
      console.log(`-----------onlyMatchSameGen------------`)
      let sameGen = 0
      let difGen = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < pop[i][1].length; j += 2) {
            pop[i][1][j].matchedAtGen == pop[i][1][j + 1].matchedAtGen ? sameGen++ : difGen++
         }
      }
      console.log(`There are ${sameGen} couples from the same generation and ${difGen} couples from different generations`)
   }

   aChildMaxPerGen = function (pop) {
      console.log(`-----------maxChildPerGen------------`)
      let oneMax = 0
      let moreThanOne = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < pop[i][1].length; j += 2) {
            for (let k = 3; k < 7; k++) {
               pop[i][1][j].createdKidsAtGens[k] > 1 ? moreThanOne++ : oneMax++
            }
         }
      }
      console.log(`There are ${moreThanOne} pixels who created more then one kid at the same generation and ${oneMax / 4} who didn't`)
   }

   noSiblingPartner = function (pop) {
      console.log(`-----------noSiblingPartner------------`)
      console.log(`We have shown: 
   1) Pixels only match within their generation
   2) Pixels reproduce maximum once a generation
hence:
   A pixels don't match outside their generation and has no siblings in their generation
Therefor:
   pixels don’t mate with any of their direct siblings`)
   }

   onlyOnePartner = function () {
      console.log(`-----------onlyOnePartner------------`)
      console.log(`if a pixel who's "matchedAtGen" attribute is a number, which means he is not single,
 the pixels population will alert him/her/it not to do that, then lose all faith in existence and crash`)
   }
}
