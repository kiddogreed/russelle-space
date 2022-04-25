import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  
  public async create({view}:HttpContextContract){
    return view.render('posts/create')
  }

  public async store({request, auth, response}:HttpContextContract){
    const user = auth.user!
    const validatedPost = await request.validate(PostValidator)
    const imageName = new Date().getTime().toString() + `.${validatedPost.image.extname}`
        await validatedPost.image!.move(Application.publicPath('images'),{
        name : imageName
         })
    
    await Post.create({
      image : `images/${imageName}`,
      caption :validatedPost.caption,
      userId: auth.user!.id,
    })

    return response.redirect(`/${user.username}`)
       
  }
}
