const d3 = require('d3')
const fs = require('fs')
const data = require('./asylumByCountry.json')

/* const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8')
// passez la chaine de charactère à writeSvg pour écrire graph.svg */

// graph config
const WIDTH = 500
const HEIGHT = 500
const BAR_SPACE = HEIGHT / data.length
const BAR_HEIGHT = BAR_SPACE * 0.7
const BAR_COLOR = 'indianred'
const NAME_MARGIN_LEFT = -100
const NAME_COLOR = 'black'
const SUM_MARGIN_RIGHT = WIDTH / 300
const SUM_COLOR = 'black'

// définir l'échelle linéeaire
const scale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.sum)])
  .range([0, WIDTH])

  // dessiner un bâton
const drawBar = (sum, index) =>
`<rect
  y="${index * BAR_SPACE}"
  height="${BAR_HEIGHT}"
  width="${scale(sum)}" 
  fill="${BAR_COLOR}"/>`

  // dessiner ensemble des bâtons
const drawBars = data =>
data.map((d, i) => drawBar(d.somme, i))
    .join('\n')

  // afficher le noms du pays 
const writeCountryName = (name, index) =>
  `<text font-family="verdana" font-size="14"
    x="${NAME_MARGIN_LEFT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${NAME_COLOR}">
    ${name}
    </text>`

// Générer l'ensemble des noms
const writeNames = data =>
  data
    .map((d, i) => writeCountryName(d.pays, i))
    .join('\n')

// écrire la somme d'un pays
  const writeSommeByCountries = (sum, index) =>
  `<text font-family="verdana" font-size="14"
    x="${scale(sum) - SUM_MARGIN_RIGHT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${SUM_COLOR}"
    text-anchor="end">
    ${sum}
    </text>`

// écrire la somme pour tout les pays affichés
const writeSommesByCountries = data =>
data
  .map((d, i) => writeSommeByCountries(d.somme, i))
  .join('\n')

//Créer le fichier svg
const svg = data => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  ${drawBars(data)}
  ${writeNames(data)}
  ${writeSommesByCountries(data)}
</svg>`

// écrire le fichier "graph.svg"
fs.writeFileSync('graph.svg', svg(data), 'utf-8')