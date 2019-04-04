const fetch = require('node-fetch')
const d3 = require('d3')
const R = require('ramda')

const writeJson = require('./writeJson')

const URL = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv'

fetch(URL).then(r=>r.text()) 
.then(d3.csvParse)
.then(r=>r.filter(t => t.affected !=="*"))
.then(data => data.map(d =>({...d,year:Number(parseInt(d.year, 10)),affected:Number(parseInt(d.affected, 10)) }))) 
.then(data => data.map(d =>({...d,country_asylum: d.country_asylum.includes("USA") ? "USA" : d.country_asylum}))) 
.then(data => writeJson('asylum.json', data))
