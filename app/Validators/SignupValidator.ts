import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),

    email:schema.string({},[
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
      
    ]),
    username: schema.string({}, [
      rules.minLength(8),
      rules.unique({ table: 'users', column: 'username' })
     // rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
      
    ]),

    password: schema.string({}, [
      rules.minLength(8),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
      rules.confirmed()
    ]),

    password_confirmation: schema.string({}),

    code: schema.string()

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'first_name.required':'Please provide your first name.',
    'last_name.required':'Please provide your last name.',
    'email.required':'Please provide your email.',
    'email.email': 'Please provide a valid email.',
    'email.unique':'Email already exist!',
    'username.required':'Please provide username.',
    'username.unique':'Username already exist!',
    'password.required': 'Please provide your password.',
    'password.minLength': 'Your password must have a minimum of 8 characters.',
    'password.regex': 'Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    'password_confirmation.required': 'Please confirm your password.',
    'code.required':'Invalid secret code!',
  }
}
