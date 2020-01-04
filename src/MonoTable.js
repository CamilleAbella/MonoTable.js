
const { Array:isArray, Charset } = require('../utils/typage')
const MonoData = require('./MonoData')
const constants = require('../utils/constants')
const chars = require('../utils/chars')

module.exports = class MonoTable {

    constructor( options ){

        if(Array.isArray(options)){

            this.body = isArray(options, true)
            this.charset = constants.STICK

        }else{

            this.body = isArray(options.body, true)
            this.charset = Charset(options.charset)

            if(options.title)
            this.title = new MonoData(options.title)

        }

    }

    addRow( row ){
        this.body.push(isArray(row))
    }

    toString(){
        
        let width = 0
        let colLength = []
        const char = this.charset
        
        this.all.forEach( row => {

            if(width < row.length)
            width = row.length

            row.forEach( (data, index) => {
                
                if(!colLength[index])
                colLength[index] = 0

                const tempData = new MonoData(data)

                if(colLength[index] < tempData.data.length)
                colLength[index] = tempData.data.length

            })

        })

        let rowLength = (eval(colLength.join('+')) + colLength.length)

        let title = ''
        if(this.title){
            title = (
                chars.ul[char] + 
                chars.h[char].repeat( rowLength + 2 + colLength.length ) +
                chars.ur[char] + '\n' +
                chars.v[char] + ' ' +
                this.title.toString(rowLength + colLength.length) + ' ' +
                chars.v[char] + '\n'
            )
        }

        return title + this.all.map( (row, r, arr) => {

            let separator = []

            for(var d=0; d<width; d++){
                
                const newRow = new MonoData(row[d])
                row[d] = ' ' + newRow.toString(colLength[d]) + ' '
                
                separator.push(chars.h[char].repeat(row[d].length))

            }

            separator = (
                chars[r===0?(this.title?'cl':'ul'):'cl'][char] +
                separator.join(chars[r===0?'uc':'cc'][char]) +
                chars[r===0?(this.title?'cr':'ur'):'cr'][char]
            )

            const line = (
                chars.v[char] + 
                row.join(chars.v[char]) + 
                chars.v[char]
            )

            return [ separator, line ].join('\n')

        }).join('\n') + ( '\n' +
            chars.bl[char] + 
            colLength.map( length => {
                return chars.h[char].repeat(length + 2)
            }).join(chars.bc[char]) +
            chars.br[char]
        )
    }

    get all(){
        
        const all = []
        
        if(this.header)
        all.push(this.header)

        all.push(...this.body)

        if(this.footer)
        all.push(this.footer)

        return all

    }

    static get constants(){
        return constants
    }

}

