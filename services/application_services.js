const moment = require('moment');

module.exports = class ApplicationServices {

    static filter(array, where) {
        if (where && where.constructor.name === 'Array') {
            let reducedArray = array
            for (let i = 0; i < where.length; i++) {
                reducedArray = this.filter(reducedArray, where[i])
            }
            return reducedArray
        }
        return array.reduce((arr, item) => {
            const newItem = where && item[where.op] ? item : new this(item)
            if (where && !newItem[where.op]({
                    ...where.params,
                    adapter: where.adapter,
                    val: newItem[where.attribute],
                }))
            {
                return arr
            }
            arr.push(newItem)
            return arr
        }, [])
    }

    floatAdapter(arr) {
        return arr.map(el => parseFloat(el))
    }

    dataTimeAdapter(arr) {
        return arr.map(el => moment(el, 'YYYY/MM/DD').valueOf())
    }

    inRange({ minVal, maxVal, val, adapter }) {
        let minValue = minVal
        let maxValue = maxVal
        let value = val
        if (adapter) {
            [minValue, maxValue, value] = this[adapter]([minValue, maxValue, value])
        }
        return minValue <= value && value <= maxValue
    }
}