**_ LEVEL _**

THOUGHTS: -- Once XP reaches the level's XP (i.e., progress is 100% for that level)

Total XP: 9 => +5 => 14 Max Level XP: 10 => 20 Total Progress to Next Level: 90% => 40%

describe('levelUP()', function () {
describe('causes', function () {
it('should be when XP reaches the max XP a user can get for that level (aka max level XP)')
})

describe('effects', function () {
it('should increment level to next level')

    it('should reset progess, accounting for remaining XP from the checked habit that causes the level up')

    it('should reset progress to 0 if there is no remainder')

    it('should reset user\'s HP to max HP for the new level')

})
})
//in user/levelUp api route, progress should be set depending on XP-(last_level's_maxXP) / (current_level's_maxXP - last_level's_maxXP) //last level will be the level before updating the level while current level will be the level after updating the level //will have to hold some values in lets or consts

//progress should also update every time user gains XP... //because of this, perhaps level table should also store previous level's max XP

//could just make getter for progress in user for above //every time user gains XP, in updateUser progress will also be updated and sent back
