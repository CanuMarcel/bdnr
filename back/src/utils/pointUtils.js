
function getCalculations(points) {
    const initial = {
        sumSpeed: 0,
        sumCalories: 0,
        sumCadence: 0,
        minDate: null,
        maxDate: null,
    }
    return points.reduce((calcs, point) => {
        const pointDate = point.point_timeuuid.getDate();
        const minDate = calcs.minDate === null || pointDate < calcs.minDate ? pointDate : calcs.minDate;
        const maxDate = calcs.maxDate === null || pointDate > calcs.maxDate ? pointDate : calcs.maxDate;
        return {
            sumSpeed: calcs.sumSpeed + point.speed,
            sumCalories: calcs.sumCalories + point.calories,
            sumCadence: calcs.sumCadence + point.cadence,
            minDate,
            maxDate,
        }
    }, initial);
}

function retrieveStats(points) {
    const total = points.length;
    const calcs = getCalculations(points);
    const average_speed = total > 0 ? calcs.sumSpeed / total : 0;
    const average_cadence = total > 0 ? calcs.sumCadence / total : 0;
    const total_calories = calcs.sumCalories;
    const duration = calcs.minDate !== null && calcs.maxDate !== null ? calcs.maxDate - calcs.minDate : 0;  // Diff in milliseconds
    return { average_speed, average_cadence, total_calories, duration };
}

module.exports = {
    retrieveStats
}