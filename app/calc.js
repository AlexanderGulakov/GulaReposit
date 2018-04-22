// let getAmount=function (array) {
//     let amount=0;
//     array.forEach(function (element,index) {
//         console.log('index',index);
//         console.log('element',element);
//         amount+=element;
//     });
//     return amount;
// };
// module.exports={
//     getAmount:getAmount
// };

 // module.exports.getAmount = getAmount;

module.exports = function (params) {
    let amount=0;
    params.forEach(function (element,index) {
        console.log('index',index);
        console.log('element',element);
        amount+=element;
    });
    return amount;
};