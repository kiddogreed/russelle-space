import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'

export default class FollowsController {
  public async store({params,response, auth}:HttpContextContract){
    //store follow user with auth id
    await Following.create({
      userId: auth.user!.id,
      followingId: params.userid
    })
    
    return response.redirect().back()
  }

  public async destroy({params, auth,response}:HttpContextContract){
    const follow = Following.query().where('user_id',auth.user!.id)
    .where('following_id',params.userid)
    await follow.delete()
    return response.redirect().back()
  }
  
}
