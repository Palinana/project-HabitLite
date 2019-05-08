const db = require('../server/db')
const {
  User,
  Category,
  Habit,
  UserCategory,
  UserHabit
} = require('../server/db/models')

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

  const categories = await Promise.all([
    Category.create({name: 'Eat Healthy'}),
    Category.create({name: 'Increase Physical Activity'}),
    Category.create({name: 'Code more, become a code ninja'})
  ])

  const habits = await Promise.all([
    Habit.create({
      description: 'Eat your least favorite vegetable',
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: 'Eat 3 servings of fruits and vegetables -- before noon!',
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: "Eat a vegetable you've never tried before",
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: 'Eat a meal with 5 colors in it',
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: 'Resist sweets for a week',
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: 'Substitute your favorite dessert with a healthy option',
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description:
        'Eat a meal that has 10 grams of fiber -- with plenty of water!',
      habitGroup: 'ChallengeD',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: 'Eat broccoli',
      habitGroup: 'Default',
      categoryId: 1,
      userId: 1
    }),
    Habit.create({
      description: 'Avoid Pasta',
      habitGroup: 'Default',
      categoryId: 1,
      userId: 2
    }),
    Habit.create({
      description: 'Drink water instead of soda',
      habitGroup: 'Default',
      categoryId: 1,
      userId: 3
    }),
    Habit.create({
      description: 'Eat more snacks',
      habitGroup: 'Default',
      categoryId: 1,
      userId: 4
    }),
    Habit.create({
      description: 'Do Yoga',
      habitGroup: 'Default',
      categoryId: 2,
      userId: 1
    }),
    Habit.create({
      description: 'Do 10 situps',
      habitGroup: 'Default',
      categoryId: 2,
      userId: 2
    }),
    Habit.create({
      description: 'Do a tech talk',
      habitGroup: 'Default',
      categoryId: 3,
      userId: 2
    }),
    Habit.create({
      description: 'Complete 10k codewars',
      habitGroup: 'Default',
      categoryId: 3,
      userId: 4
    }),
    Habit.create({
      description: 'Eat a new vegetable today',
      habitGroup: 'ChallengeD',
      categoryId: 1
    }),
    Habit.create({
      description: 'Complete a Healthy Eating Challenge',
      habitGroup: 'ChallengeD',
      categoryId: 1
    }),
    Habit.create({
      description: 'Cook and share a meal with a loved one',
      habitGroup: 'LoveD',
      categoryId: 1
    }),
    Habit.create({
      description: 'Trade a new healthy recipe in community forum',
      habitGroup: 'LoveD',
      categoryId: 1
    }),
    Habit.create({
      description: 'Eat a hearty breakfast',
      habitGroup: 'StructureD',
      categoryId: 1
    }),
    Habit.create({
      description: 'Have 5 small meals every 2 hours',
      habitGroup: 'StructureD',
      categoryId: 1
    })
  ])

  const userCategories = await Promise.all([
    UserCategory.create({userId: 4, categoryId: 1, XP: 5, HP: 10}),
    UserCategory.create({userId: 1, categoryId: 1, XP: 20, HP: 20}),
    UserCategory.create({userId: 1, categoryId: 2, XP: 10, HP: 20}),
    UserCategory.create({userId: 2, categoryId: 1, XP: 0, HP: 35}),
    UserCategory.create({userId: 3, categoryId: 1, XP: 0, HP: 45}),
    UserCategory.create({userId: 5, categoryId: 1, XP: 0, HP: 55}),
    UserCategory.create({userId: 6, categoryId: 1, XP: 0, HP: 65})
  ])

  const userHabit = await Promise.all([
    UserHabit.create({
      userId: 4,
      habitId: 13,
      XP: 5,
      HP: 125,
      complete: true
    }),
    UserHabit.create({
      userId: 1,
      habitId: 14,
      XP: 5,
      HP: 235,
      complete: true
    }),
    UserHabit.create({userId: 1, habitId: 1, XP: 5, HP: 35, complete: true}),
    UserHabit.create({userId: 1, habitId: 2, XP: 5, HP: 40, complete: true}),
    UserHabit.create({userId: 1, habitId: 3, XP: 5, HP: 54, complete: true}),
    UserHabit.create({
      userId: 1,
      habitId: 4,
      XP: 5,
      HP: 60,
      complete: false
    }),
    UserHabit.create({
      userId: 1,
      habitId: 5,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserHabit.create({
      userId: 1,
      habitId: 9,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserHabit.create({
      userId: 1,
      habitId: 10,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserHabit.create({
      userId: 1,
      habitId: 6,
      XP: 5,
      HP: 45,
      complete: false
    }),
    UserHabit.create({
      userId: 5,
      habitId: 7,
      XP: 5,
      HP: 55,
      complete: false
    }),
    UserHabit.create({userId: 6, habitId: 8, XP: 5, HP: 60, complete: false})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${habits.length} habit`)
  console.log(`seeded ${userCategories.length} userCategories`)
  console.log(`seeded ${userHabit.length} userHabits`)
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
