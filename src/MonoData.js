
const { LEFT, CENTER, RIGHT } = require('../utils/constants')
const { Data, Align } = require('../utils/typage')

module.exports = class MonoData {

    constructor( options ){

        if(
            typeof options === 'string'  ||
            typeof options === 'boolean' ||
            !options
        ){

            this.data = Data(options)
            this.align = CENTER

        }else{

            this.data = Data(options.data)

            if(options.hasOwnProperty('align'))
            this.align = Align(options.align)
            else this.align = CENTER

        }
    }

    toString( length ){
        const data = this.data.slice(0,length)
        const spaceCount = length - data.length
        switch(this.align){
            case LEFT:
                return data + ' '.repeat(spaceCount)
            case RIGHT:
                return ' '.repeat(spaceCount) + data
            default:
                return ' '.repeat(Math.floor(spaceCount / 2)) + data + ' '.repeat(Math.ceil(spaceCount / 2))
        }
    }

}