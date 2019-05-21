const db = require('../server/db')
const {User, Habit, Goal, UserHabit, UserGoal} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      id: 1,
      email: 'gh@email.com',
      password: '123',
      username: 'Grace Hopper',
      level: 1
    }),
    User.create({
      id: 2,
      email: 'tania@gmail.com',
      password: '123',
      username: 'tania',
      level: 1
    }),
    User.create({
      id: 3,
      email: 'ginny@gmail.com',
      password: '123',
      username: 'ginny',
      level: 1
    }),
    User.create({
      id: 4,
      email: 'palina@email.com',
      password: '123',
      username: 'palina',
      level: 1
    }),
    User.create({
      id: 5,
      email: 'priya@email.com',
      password: '123',
      username: 'priya',
      level: 1
    }),
    User.create({
      id: 6,
      email: 'cody@email.com',
      password: '123',
      username: 'cody',
      level: 1
    }),
    User.create({
      id: 7,
      email: 'murphy@email.com',
      password: '123',
      username: 'murphy',
      level: 1
    }),
    User.create({
      id: 8,
      email: 'daniel@email.com',
      password: '123',
      username: 'daniel',
      level: 1
    }),
    User.create({
      id: 9,
      email: 'sebastian@email.com',
      password: '123',
      username: 'sebastian',
      level: 1
    }),
    User.create({
      id: 10,
      email: 'nancy@email.com',
      password: '123',
      username: 'nancy',
      level: 1
    })
  ])

  const habits = await Promise.all([
    Habit.create({name: 'Eat Healthy'}),
    Habit.create({name: 'Increase Physical Activity'}),
    Habit.create({name: 'Code more, become a code ninja'})
  ])

  const goals = await Promise.all([
    Goal.create({
      description: 'Eat your least favorite vegetable',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: 'Eat 3 servings of fruits and vegetables -- before noon!',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: "Eat a vegetable you've never tried before",
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: 'Eat a meal with 5 colors in it',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: 'Resist sweets for a week',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: 'Substitute your favorite dessert with a healthy option',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description:
        'Eat a meal that has 10 grams of fiber -- with plenty of water!',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: 'Eat broccoli',
      goalGroup: 'Default',
      habitId: 1,
      userId: 1
    }),
    Goal.create({
      description: 'Avoid Pasta',
      goalGroup: 'Default',
      habitId: 1,
      userId: 2
    }),
    Goal.create({
      description: 'Drink water instead of soda',
      goalGroup: 'Default',
      habitId: 1,
      userId: 3
    }),
    Goal.create({
      description: 'Eat more snacks',
      goalGroup: 'Default',
      habitId: 1,
      userId: 4
    }),
    Goal.create({
      description: 'Do Yoga',
      goalGroup: 'Default',
      habitId: 2,
      userId: 1
    }),
    Goal.create({
      description: 'Do 10 situps',
      goalGroup: 'Default',
      habitId: 2,
      userId: 2
    }),
    Goal.create({
      description: 'Do a tech talk',
      goalGroup: 'Default',
      habitId: 3,
      userId: 2
    }),
    Goal.create({
      description: 'Complete 10k codewars',
      goalGroup: 'Default',
      habitId: 3,
      userId: 4
    }),
    Goal.create({
      description: 'Eat a new vegetable today',
      goalGroup: 'ChallengeD',
      habitId: 1
    }),
    Goal.create({
      description: 'Complete a Healthy Eating Challenge',
      goalGroup: 'ChallengeD',
      habitId: 1
    }),
    Goal.create({
      description: 'Cook and share a meal with a loved one',
      goalGroup: 'LoveD',
      habitId: 1
    }),
    Goal.create({
      description: 'Trade a new healthy recipe in community forum',
      goalGroup: 'LoveD',
      habitId: 1
    }),
    Goal.create({
      description: 'Eat a hearty breakfast',
      goalGroup: 'StructureD',
      habitId: 1
    }),
    Goal.create({
      description: 'Have 5 small meals every 2 hours',
      goalGroup: 'StructureD',
      habitId: 1
    })
  ])

  const userHabits = await Promise.all([
    UserHabit.create({userId: 4, habitId: 1, XP: 5, HP: 10}),
    UserHabit.create({userId: 1, habitId: 1, XP: 20, HP: 20}),
    UserHabit.create({userId: 1, habitId: 2, XP: 10, HP: 20}),
    UserHabit.create({userId: 2, habitId: 1, XP: 0, HP: 35}),
    UserHabit.create({userId: 3, habitId: 1, XP: 0, HP: 45}),
    UserHabit.create({userId: 5, habitId: 1, XP: 0, HP: 55}),
    UserHabit.create({userId: 6, habitId: 1, XP: 0, HP: 65})
  ])

  const userGoal = await Promise.all([
    UserGoal.create({
      userId: 4,
      goalId: 13,
      XP: 5,
      HP: 125,
      complete: true
    }),
    UserGoal.create({
      userId: 1,
      goalId: 14,
      XP: 5,
      HP: 235,
      complete: true
    }),
    UserGoal.create({userId: 1, goalId: 1, XP: 5, HP: 35, complete: true}),
    UserGoal.create({userId: 1, goalId: 2, XP: 5, HP: 40, complete: true}),
    UserGoal.create({userId: 1, goalId: 3, XP: 5, HP: 54, complete: true}),
    UserGoal.create({
      userId: 1,
      goalId: 4,
      XP: 5,
      HP: 60,
      complete: false
    }),
    UserGoal.create({
      userId: 1,
      goalId: 5,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 1,
      goalId: 9,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 1,
      goalId: 10,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 1,
      goalId: 6,
      XP: 5,
      HP: 45,
      complete: false
    }),
    UserGoal.create({
      userId: 5,
      goalId: 7,
      XP: 5,
      HP: 55,
      complete: false
    }),
    UserGoal.create({userId: 6, goalId: 8, XP: 5, HP: 60, complete: false})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${habits.length} habits`)
  console.log(`seeded ${goals.length} goals`)
  console.log(`seeded ${userHabits.length} userHabits`)
  console.log(`seeded ${userGoal.length} UserGoals`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
