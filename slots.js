const { addMoney, removeMoney, getMoney } = require('./db.js');

module.exports.slotsEmoji = {
    ':siete:': '753692264907407371',
    ':sanda:': '753692297522053301',
    ':pltano:': '753692350311563364',
    ':limn:': '753692316950200371',
    ':diamante:': '753692250088931400',
    ':cereza:': '753692277314027642'
}
module.exports.slotsChance = [
    {type: ':diamante:', chance: 5},
    {type: ':siete:', chance: 19},
    {type: ':sanda:', chance: 19},
    {type: ':pltano:', chance: 19},
    {type: ':cereza:', chance: 19},
    {type: ':limn:', chance: 19}
]

module.exports.doSlot = async function (username, summ) {
    // removeMoney()
    let slots = [Random(module.exports.slotsChance), Random(module.exports.slotsChance), Random(module.exports.slotsChance)]
    console.log(slots)
    if (slots[0] == ':diamante:' && slots[1] == ':diamante:' && slots[2] == ':diamante:') {
        await removeMoney(username,summ);
        summ = summ * 4;
        await addMoney(username,summ);
        return {
            slots: slots,
            win: 4,
            summ: summ - summ / 4
        }
    } else if (slots[0] == slots[1] && slots[1] == slots[2] && slots[0] == slots[2]) {
        console.log('aaaaaaaa')
        await removeMoney(username,summ);
        summ = summ * 3;
        await addMoney(username,summ);
        return {
            slots: slots,
            win: 3,
            summ: summ - summ / 3
        }
    } else if (slots[0] == slots[1] || slots[1] == slots[2] || slots[0] == slots[2] ) {
        console.log('bbbbbbbbbb-')
        await removeMoney(username,summ);
        summ = summ * 2;
        await addMoney(username,summ);
        return {
            slots: slots,
            win: 2,
            summ: summ - summ / 2
        }
    } else {
        let aaa = await removeMoney(username,summ);
        console.log(aaa);
        return {
            slots: slots,
            win: -1,
            summ: -1
        }
    }
}                                           //:siete: 7 :sanda: арбуз :pltano: банан :limn: лимон :diamante: алмаз :cereza: вишенка
                                            // 2 одинаковые 2x 3 одинаковые 3x 3 алмаза 

function Random(resouceList) {
    let resources = resouceList;
    
    function assign_resource() {
        var rnd = Math.random();
        var acc = 0;
        for (var i=0, r; r = resources[i]; i++) {
            acc += r.chance / 100;
            if (rnd < acc) return r.type;
        }
        // rnd wasn't less than acc, so no resource was found
        return assign_resource();
    }
    return assign_resource()
}
let slotss = module.exports.slots;

