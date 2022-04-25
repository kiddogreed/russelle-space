//  import Factory from '@ioc:Adonis/Lucid/Factory'
// import Post from 'App/Models/Post'
//  import User from 'App/Models/User'
// import { DateTime } from 'luxon'

//  export const UserFactory = Factory
//   .define(User, ({ faker }) => {
//     return {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       details: faker.lorem.paragraph(),
//       avatar: faker.image.avatar(),
//       emailVerifiedAt: DateTime.now(),
//     }
//   }).relation('posts',()=>PostFactory)
//   .build()

//   export const PostFactory = Factory
//   .define(Post, ({ faker }) => {
//     return {
//     caption: faker.lorem.paragraph(),
//     image:faker.image.nature(),
//     }
//   }).relation('user',()=>UserFactory)
//   .build()