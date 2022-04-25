 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import SignupValidator from 'App/Validators/SignupValidator'
import Env from '@ioc:Adonis/Core/Env';

export default class AuthController {
  public async signup({request,response}:HttpContextContract){
   const validated = await request.validate(SignupValidator)
   if(validated.code != Env.get('CODE')){
     return response.redirect('/signup')
   }

  const user = await User.create({
     firstName: validated.first_name,
     lastName: validated.last_name,
     username: validated.username,
     email: validated.email,
     password: validated.password,
     code: validated.code
   })
  user.sendVerificationEmail()
  
 
   
   return response.redirect('/')
  }

  public async login({auth,request, response}:HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      await auth.use('web').attempt(email, password)
      response.redirect(`/${auth.user?.username}`)
    } catch {
      return response.redirect('/login')
    }
  }

  public async logout({auth,response}:HttpContextContract){
   await auth.logout()
   return response.redirect('/')
  }
}
