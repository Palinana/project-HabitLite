const LEVELS = [
  {maxHP: 10, maxXP: 10},
  {maxHP: 11, maxXP: 40},
  {maxHP: 13, maxXP: 90},
  {maxHP: 15, maxXP: 160},
  {maxHP: 20, maxXP: 250},
  {maxHP: 23, maxXP: 360}
]

const levelForXP = (xp, levels = LEVELS) => levels.findIndex(l => l.maxXP > xp)

module.exports = {
  levelForXP,
  LEVELS
}
