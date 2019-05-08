// const Promise = require('bluebird');
// var chai = require('chai');
// var expect = chai.expect;
// const db = require('../index')
// const DefaultHabit = db.model('defaultHabit')

// //Renamed from defaultHabit.spec.js since we deleted the defaultHabit model
// xdescribe('DefaultHabit model', function () {
//     beforeEach(function () {
//         return db.sync({ force: true })
//     })
//     describe('description field', function () {
//         let firstDefaultHabit

//         beforeEach(() => {
//             return DefaultHabit.create({
//                 description: 'this is a test'
//             })
//                 .then(defaultHabit => {
//                     firstDefaultHabit = defaultHabit
//                 })
//         })
//         it('description field is not empty', function () {
//             DefaultHabit.description = "this is not working";
//             expect(!!DefaultHabit.description).to.be.true;
//         })
//     })
// })
