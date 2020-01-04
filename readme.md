# MonoTable.js

```
npm i mono-table.js
```

## Mini doc : 

```js
// Table
new MonoTable( body: Array[ row: Array[ MonoData.options ] ] )
new MonoTable( options: Object {
    body: Array[ row: Array[ MonoData.options ] ],
    title: String || MonoData.options || null,
    charset: Number || MonoTable#constants || null
})

// Data
new MonoData( data: ScalarMixed )
new MonoData( options: Object {
    data: ScalarMixed || null,
    align: Number || MonoTable#constants || null
})
```

## Examples :

```js
const MonoTable = require('mono-table.js')

const table = new MonoTable({

    charset: MonoTable.constants.PIPE, 
    // default: STICK

    title: 'The Title !',
    // default: none

    body: [ 
        ['Jack', '42','Sealand'],
        ['Patrick','25','France'],
        ['David','32','Australia']
    ] // required
})

console.log(table.toString())
```
```
╔══════════════════════════╗
║        The Title !       ║
╠═════════╦════╦═══════════╣
║  Jack   ║ 42 ║  Sealand  ║
╠═════════╬════╬═══════════╣
║ Patrick ║ 25 ║  France   ║
╠═════════╬════╬═══════════╣
║  David  ║ 32 ║ Australia ║
╚═════════╩════╩═══════════╝
```
```js
const MonoTable = require('mono-table.js')

const body = [
    ['Jack', '42','Sealand'],
    ['Patrick','25','France'],
    ['David','32','Australia']
]

const table = new MonoTable({
    body: body.map( row => {
        row[0] = {
            data: row[0],
            align: MonoTable.constants.RIGHT
        }
        row[2] = {
            data: row[2],
            align: MonoTable.constants.LEFT
        }
        return row
    })
})

console.log(table.toString())
```
```
┌─────────┬────┬───────────┐
│    Jack │ 42 │ Sealand   │
├─────────┼────┼───────────┤
│ Patrick │ 25 │ France    │
├─────────┼────┼───────────┤
│   David │ 32 │ Australia │
└─────────┴────┴───────────┘
```