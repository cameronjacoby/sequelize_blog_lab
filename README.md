#Blog Lab

In this lab we will be making a simple blog platform. In many ways this app will be similar to the Daily Planet app. Feel free to modify it if you wish.

##Objective
* User should be able to go to a form, and fill out a blog post containing `post` and `author`
* When storing the `post` use a `1 to many relationship` between author and blog post.
* Have a main route `/blog` that will contain all blog posts sorted by date
* Have a route to only display the blog post by 1 user. User a url like `/user/5`

##How to get started
1. `npm init` your project folder. And create the necessary folders for your project.
2. Start coding your `models` file. This will include setting up `Sequelize` dependencies.
3. Create the model `Author` and relationship `Posts` that will be talking to each other.

##Bonus
* Feel free to add `edit` and `delete` functionality.

--------------------

### Completed project:

#### Blog Posts

![ScreenShot](/public/images/screenshot_blog.png)

#### Post Details

![ScreenShot](/public/images/screenshot_post.png)

#### Posts by User

![ScreenShot](/public/images/screenshot_posts_by_user.png)

#### Sign Up Page

![ScreenShot](/public/images/screenshot_signup.png)

#### Log In page

![ScreenShot](/public/images/screenshot_login.png)

#### Add New Post

![ScreenShot](/public/images/screenshot_new.png)