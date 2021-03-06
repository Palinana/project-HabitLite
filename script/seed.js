const db = require('../server/db')
const {
  User,
  Habit,
  Goal,
  UserHabit,
  UserGoal,
  Personality
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
      level: 1
    }),
    User.create({
      id: 5,
      email: 'priya@email.com',
      password: '123',
      level: 1
    }),
    User.create({
      id: 6,
      email: 'cody@email.com',
      password: '123',
      level: 1,
      avatar: '/images/user-2.jpg'
    })
  ])

  const habits = await Promise.all([
    Habit.create({name: 'Eat Healthy'}),
    Habit.create({name: 'Increase Physical Activity'}),
    Habit.create({name: 'Code more, become a code ninja'}),
    Habit.create({name: 'Take vitamins every day'})
  ])

  const goals = await Promise.all([
    Goal.create({
      description: 'Eat your least favorite vegetable',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Eat your least favorite vegetable',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Eat 3 servings of fruits and vegetables -- before noon!',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Resist sweets',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description:
        'Eat a meal that has 10 grams of fiber -- with plenty of water!',
      goalGroup: 'ChallengeD',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Eat broccoli',
      goalGroup: 'Default',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Avoid Pasta',
      goalGroup: 'Default',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Drink water instead of soda',
      goalGroup: 'Default',
      habitId: 1,
      userId: 6
    }),
    Goal.create({
      description: 'Do Yoga',
      goalGroup: 'Default',
      habitId: 2,
      userId: 6
    }),
    Goal.create({
      description: 'Do 10 situps',
      goalGroup: 'Default',
      habitId: 2,
      userId: 6
    }),
    Goal.create({
      description: 'Do a tech talk',
      goalGroup: 'Default',
      habitId: 3,
      userId: 6
    }),
    Goal.create({
      description: 'Complete 10k codewars',
      goalGroup: 'Default',
      habitId: 3,
      userId: 6
    }),
    Goal.create({
      description: 'Take 1 pill of vitamin C',
      goalGroup: 'Default',
      habitId: 4,
      userId: 1
    }),
    Goal.create({
      description: 'Take 2 gummis of vitamins D',
      goalGroup: 'Default',
      habitId: 4,
      userId: 1
    })
  ])

  const personality = await Promise.all([
    Personality.create({
      userId: 6,
      insight:
        'I rather Run. When I skip a workout is usually because I’m feeling under the weather. I feel relaxed when Have a dance party with my kids. During the weekend I look forward to Finally getting to sleep in and not follow a strict schedule. Best part of my workout is Breaking the cycle of sitting all day. I stay motivated during a project by The thought of how great it will feel when I’m done. The best part about eating out is Tasting dishes, I could never make for myself. My mornings look like Setting my alarm early so I can feel awake by the tie I actually have to be productive. Parties are They’re a fun way to meet interesting people. My biggest strength in a job interview is being Dedicated. If someone offered me last minute tickets to a play I would go if the plot sounds interesting',
      habitGroup: 'DC',
      analysis:
        'You are skeptical, somewhat coarse and imperturbable.You are trusting of others: you believe the best in others and trust people easily. You are hedonistic: you feel your desires strongly and are easily tempted by them. And you are unstructured: you do not make a lot of time for organization in your daily life.Your choices are driven by a desire for prestige.You consider helping others to guide a large part of what you do: you think it is important to take care of the people around you. You are relatively unconcerned with tradition: you care more about making your own path than following what others have done.'
    })
  ])

  const userHabits = await Promise.all([
    UserHabit.create({userId: 4, habitId: 4, XP: 5, HP: 100}),
    UserHabit.create({userId: 1, habitId: 1, XP: 20, HP: 20}),
    UserHabit.create({userId: 1, habitId: 2, XP: 10, HP: 40}),
    UserHabit.create({userId: 2, habitId: 1, XP: 0, HP: 100}),
    UserHabit.create({userId: 3, habitId: 1, XP: 0, HP: 100}),
    UserHabit.create({userId: 5, habitId: 1, XP: 0, HP: 100}),
    UserHabit.create({userId: 6, habitId: 1, XP: 5, HP: 25}),
    UserHabit.create({userId: 6, habitId: 2, XP: 0, HP: 25}),
    UserHabit.create({userId: 6, habitId: 3, XP: 0, HP: 25})
  ])

  const userGoal = await Promise.all([
    UserGoal.create({
      userId: 1,
      goalId: 13,
      XP: 5,
      HP: 25,
      complete: true
    }),
    UserGoal.create({
      userId: 1,
      goalId: 14,
      XP: 5,
      HP: 35,
      complete: true
    }),
    UserGoal.create({userId: 6, goalId: 1, XP: 5, HP: 35, complete: true}),
    UserGoal.create({userId: 6, goalId: 2, XP: 5, HP: 40, complete: true}),
    UserGoal.create({userId: 6, goalId: 3, XP: 5, HP: 54, complete: true}),
    UserGoal.create({
      userId: 6,
      goalId: 4,
      XP: 5,
      HP: 50,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 5,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 9,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 10,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 11,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 12,
      XP: 5,
      HP: 35,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 6,
      XP: 5,
      HP: 45,
      complete: false
    }),
    UserGoal.create({
      userId: 6,
      goalId: 7,
      XP: 5,
      HP: 45,
      complete: false
    }),
    UserGoal.create({userId: 6, goalId: 8, XP: 5, HP: 50, complete: false})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${habits.length} habits`)
  console.log(`seeded ${goals.length} goals`)
  console.log(`seeded ${personality.length} personality`)
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
