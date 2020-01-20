exports.index = (req, res, next) => {
    return res.json({
        cities: ['Rio', 'SP']
    })
}