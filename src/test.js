const mathT = new MathB()
const isBetween = mathT.isBetween

class testing {

   goneAfter8Generations = (population) => {
      console.log(`------------------------------------------------1------------------------------------------------`)
      console.log(`-----goneAfter8Gen---- Pixels have a life-span of 8 generations`)
      console.log(`should return 0 for generations 0, 9`)
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
      console.log(`------------------------------------------------2------------------------------------------------`)
      console.log(`-----createOnly3to6---- A pixel can replicate only between its 3rd and 6th generations`)
      console.log(`should return 0 for generations 1, 2, 7, 8`)
      // using generation 8: (parent's generation - kid's generation) = parents generation at child's birth: should be between 3 and 6
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
      console.log(`------------------------------------------------3------------------------------------------------`)
      console.log(`-----aChildMaxPerGeneration---- A pixel can try replicating only once a generation`)
      console.log(`should return (generation - 2) or less, maximum is 4 `)
      let generation = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         for (let j = 3; j < 7; j++) {
            population[i].forEach(p => p.createTries > generation[i + 1] ? generation[i + 1] = p.createTries : null)
         }
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) The maximum replicate tries for a pixel at generation ${i} is: ${generation[i]}`)
      }
   }
   
   matchOnly3to6 = function (population) {
      console.log(`------------------------------------------------4------------------------------------------------`)
      console.log(`-----matchOnly3to6---- A pixel can search for a partner only between its 3rd and 6th generations`)
      console.log(`should return 0 for generations 1, 2, 7, 8`)
      let matched = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         population[i].forEach(p => p.partner ? matched[p.matchTries + 2]++ : null)
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) There are ${matched[i]} pixels who matched at generation ${i}`)
      }
   }
   
   matchMaxOnceAGeneration = function (population) {
      console.log(`------------------------------------------------5------------------------------------------------`)
      console.log(`-----matchMaxOnceAGen---- A pixel can search for a partner only once a generation`)
      console.log(`should return (generation - 2) or less, maximum is 4 `)
      let generation = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 0; i < 8; i++) {
         population[i].forEach(p => p.matchTries > generation[i + 1] ? generation[i + 1] = p.matchTries : null)
      }
      for (let i = 0; i < 9; i++) {
         console.log(`${i}) The max match tries for a pixel at generation ${i} is: ${generation[i]}`)
      }
   }
   
   childGeneInRange = function (population) {
      console.log(`------------------------------------------------6------------------------------------------------`)
      console.log(`-----childGeneInRange---- Pixel's genes are in range of their parents equivalent genes`)
      console.log(`should return all genes are in the range of their parents `)
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
      console.log(`------------------------------------------------7------------------------------------------------`)
      console.log(`-----someGeneA---- A pixel can be born with either an RGB sequence, or an RGBA sequence`)
      console.log(`should return a number on both with and without gene A`)
      let geneA = 0
      let noGeneA = 0
      for (let i = 0; i < 8; i++) {
         population[i].forEach(p => p.genes.A ? geneA++ : noGeneA++)
      }
      console.log(`There are ${geneA} pixels with gene A and ${noGeneA} without`)
   }
   
   getDistance = function (a, b) {
      let genesDistance = 0
      genesDistance += a.genes.R > b.genes.R ? a.genes.R - b.genes.R : b.genes.R - a.genes.R
      genesDistance += a.genes.G > b.genes.G ? a.genes.G - b.genes.G : b.genes.G - a.genes.G
      genesDistance += a.genes.B > b.genes.B ? a.genes.B - b.genes.B : b.genes.B - a.genes.B
      return genesDistance
   }
   attractOpposite = function (population) {
      console.log(`------------------------------------------------8------------------------------------------------`)
      console.log(`-----attractOpposite---- Pixels are more attracted to their genetic opposites`)
      console.log(`attraction and genes distance should change proportionally to each other: attraction goes up- genes distance goes up`)
      let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      let distance = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      for (let i = 2; i < 8; i++) {
         for (let k = 0; k < population[i].length; k++) {
            if (isBetween(population[i][k].attraction,  1, 20)) {
               count[1]++
               distance[1] += population[i][k].partner ? this.getDistance(population[i][k], population[i].find(p => p.id === population[i][k].partner)) : null
            } else if (isBetween(population[i][k].attraction, 21, 40)) {
               count[2]++
               distance[2] += population[i][k].partner ? this.getDistance(population[i][k], population[i].find(p => p.id === population[i][k].partner)) : null
            } else if (isBetween(population[i][k].attraction, 41, 60)) {
               count[3]++
               distance[3] += population[i][k].partner ? this.getDistance(population[i][k], population[i].find(p => p.id === population[i][k].partner)) : null
            } else if (isBetween(population[i][k].attraction, 61, 80)) {
               count[4]++
               distance[4] += population[i][k].partner ? this.getDistance(population[i][k], population[i].find(p => p.id === population[i][k].partner)) : null
            } else if (isBetween(population[i][k].attraction, 81, 1000)) {
               count[5]++
               distance[5] += population[i][k].partner ? this.getDistance(population[i][k], population[i].find(p => p.id === population[i][k].partner)) : null
            }
         }
      }
      for (let i = 1; i < 6; i++) {
         console.log(`There are ${count[i]} pixels with attraction ${i * 20 - 19}${i * 20 < 90 ? `-${i * 20}` : `+`}, who's average distance between genes is: ${distance[i] ? Math.floor(distance[i] / count[i]) : `There are none`}`)
      }
   }
   
   settleOverGeneration = function (population) {
      console.log(`------------------------------------------------9------------------------------------------------`)
      console.log(`-----settleOverGens---- The higher the generation of a pixel, the less attraction is needed to match`)
      console.log(`numbers should change disproportionally to each other: generation goes up- attraction goes down `)
      let count = { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      let attractionAt = { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      for (let i = 2; i < 8; i++) {
         for (let k = 0; k < population[i].length; k++) {
            attractionAt[population[i][k].matchTries + 2] += population[i][k].attraction
            count[population[i][k].matchTries + 2]++
         }
      }
      for (let i = 3; i < 7; i++) {
         console.log(`The average attraction between pixels who matched at generation ${[i]} is: ${attractionAt[i] ? Math.ceil(attractionAt[i] / count[i]) : `There are none`}`)
      }
   }

   noSiblingPartner = function (population) {
      console.log(`-----------------------------------------------10------------------------------------------------`)
      console.log(`------noSiblingPartner---- Pixels don’t mate with any of their direct siblings`)
      let sameGeneration = 0
      let differentGeneration = 0
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < population[i].length; j += 2) {
            if (population[i][j].partner) {
               population[i].filter(p => p.id === population[i][j].partner).forEach(p => p.currentGeneration === population[i][j].currentGeneration ? sameGeneration++ : differentGeneration++)
            }
         }
      }
      console.log(`There are ${sameGeneration} couples from the same generation and ${differentGeneration} couples from different generations`)

      console.log(`We have shown: 
   1) Pixels only match within their generation
   2) Pixels reproduce maximum once a generation
hence:
   A pixels don't match outside their generation and has no siblings inside their generation
Therefor:
   pixels don’t mate with any of their direct siblings`)
   }

   onlyOnePartner = function () {
      console.log(`------------------------------------------------11-----------------------------------------------`)
      console.log(`------onlyOnePartner---- Once pixels mate, they mate for life`)
      console.log(`if a pixel who's "partner" attribute is a true, which means he is not single, tries to match, 
the pixels population will alert him/her/it not to do that, then lose all faith in existence and crash`)
   }
}
