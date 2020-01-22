const moment = require('moment');

module.exports = class ApplicationServices {

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