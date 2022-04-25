
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EmailVerificationsController {
  public async index({auth, response, }:HttpContextContract){

    auth.user?.sendVerificationEmail()
    return response.redirect().back()
  }
  public async confirm({params,response,request}:HttpContextContract){
  if(request.hasValidSignature()){
    const user =  await User.findByOrFail('email',params.email)
    user.emailVerifiedAt =  DateTime.now()
    user.save()
    return response.redirect(`/${user.username}`)
    }
   return 'Invalid Token'
  }
}
