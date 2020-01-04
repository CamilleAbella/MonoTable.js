
const { LEFT, CENTER, RIGHT, STICK, PIPE } = require('./constants')

module.exports = {

    Array: ( subject, _2D = false ) => {
        
        if(
            !Array.isArray(subject) || (
                _2D && !subject.every(Array.isArray)
            )
        ) throw TypeError(`Arg must be a${_2D?' 2D':'n'} array`)

        return subject

    },
    Data: subject => {
        
        if(subject !== null && subject !== undefined)
        try{
            return String(subject)
        }catch(err){
            throw TypeError('Data must be convertible to string or null')
        }

        return ''

    },
    Align: subject => {

        if([LEFT,CENTER,RIGHT].includes(subject))
        return subject

        if(/left|start/i.test(subject))
        return LEFT

        if(/center|middle/i.test(subject))
        return CENTER

        if(/right|end/i.test(subject))
        return RIGHT

        throw TypeError('Align must be contained in presets. Please use constants for define this.')
    },
    Charset: subject => {
        
        if([STICK,PIPE].includes(subject))
        return subject

        return STICK

    }
}