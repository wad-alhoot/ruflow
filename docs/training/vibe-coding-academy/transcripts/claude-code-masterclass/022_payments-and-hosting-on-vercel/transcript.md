[00:00:00] All right, so we got the app done. We got the landing page done. It is time to get the pricing done the stripe
[00:00:07] integration so we can start accepting payments. This is going to be the
[00:00:12] basically I think the last step of the product portion of this course once you're done this you will have a working product
[00:00:19] You can start selling to people and making money the next section and everything after this will be out marketing getting customers getting feedback beta testing all that
[00:00:27] So let's get the stripe implemented if you haven't signed up for a stripe account yet
[00:00:31] Make sure to do that stripe calm sign up. It is the best payment processor on planet earth
[00:00:37] There's a reason why literally everyone uses it as their payment processor sign up for that once you do that
[00:00:42] We are going to go back into cloud code here and we're gonna get this implemented
[00:00:46] I'm gonna be honest implementing stripe is not the easiest thing in the world
[00:00:51] But I got good news for you
[00:00:54] Using AI makes it much much easier to do so we're gonna say this okay everything looks great
[00:01:01] I just signed up for a stripe account
[00:01:06] Can you walk me through?
[00:01:09] Implementing stripe into our app so we can accept payments
[00:01:15] I imagine this will also include changes to super base
[00:01:21] The reason why I'm putting that is because we are probably gonna want to update user information with stripe payment information
[00:01:29] Subscription data things like that so with that being said I'm going to hit that prompt
[00:01:34] And now Claude's gonna walk us through implementing stripe updating the database all that
[00:01:39] I can't wait to finish this step because then we're all set we can start selling our app and making money
[00:01:43] This is gonna be fun
[00:01:44] So I'll help you through stripe payments in your app it created a to-do list install stripe dependencies
[00:01:49] It is going to create the migration for us in super base
[00:01:51] It's gonna create all the API routes and all that and we're gonna get this pop and bear with me here stick along with me
[00:01:57] We'll be able to figure this all out as we go along here. All right looks like it implemented
[00:02:02] Let's see what we got here perfect that successfully implemented stripe into your app
[00:02:06] Here's a summary install the dependencies new database schema API routes helper functions
[00:02:11] Updated components again
[00:02:13] You don't need to know what all this means all you need to do is follow the instructions
[00:02:16] It's giving you run the super base migration. So we're not gonna do that. We're gonna do this manually. So here we go
[00:02:23] Here's the migration. I'm gonna copy it. We're going to go in here. We're in the sequel editor
[00:02:28] We're gonna paste it in I'm gonna hit run
[00:02:31] It is going to say success. No rose return perfect. We're going to set up stripes. So we're gonna create a product in stripes
[00:02:37] So here we go. Let's have some fun here. I'm going to stripe.com bottom bang. Here we go. Let's sign in
[00:02:43] We are signed in. Let's follow these instructions directly. So we're going to create a product
[00:02:48] So if you haven't yet make sure you create a new account in here
[00:02:53] I'm going to create a new account. I'm gonna create a separate one here. We're gonna call this
[00:02:59] one prompt racer
[00:03:01] I'm gonna hit create. I'm going to do this onboarding
[00:03:05] So we're going to offer subscriptions and build customers that sounds good
[00:03:08] Are there other ways you want to use stripe? Nope just recurring payments continue
[00:03:12] And let's go to the live account. All right. Our account has been all
[00:03:16] Set up. You probably got some onboarding questions you had to fill out about your business and addressing that all that
[00:03:21] So make sure you do that. Let's go back to our instructions here. All right. So we're going to want to navigate to products add products
[00:03:28] All right. So we're going to come in here. Let's go to product catalog. Let's do create product. We're going to call prompt racer
[00:03:36] Basic we're going to make this recurring. What is the price we set this at impromptu racer?
[00:03:41] Log out here. We'll go back home. Let's see pricing was a $12. We did yet $12. Okay, perfect
[00:03:47] We're going to do the $12 here build monthly. Let's add the product
[00:03:52] Glorious prompt racer basic $12 after creating copy the price ID add this to your dot env dot local
[00:04:00] All right, so I think there's new okay, so there's new
[00:04:03] Apikis we're going to need to add dot env dot local. So let's grab this next public stripe price
[00:04:09] Put that in your dot env dot local. Okay after creating copy the price ID starts with price underscore
[00:04:16] We're going to need to find that so i'm in here. Let's see. I imagine it's going to be under here
[00:04:21] That's product that you see not not product ID copy price ID. Okay, i'm going to copy that
[00:04:27] I pasted that into my dot env dot local now when you get get other api keys in stripe dash board go to developers
[00:04:34] Apikis. Okay, so let's go back in here
[00:04:37] Let's see. Can I just search api keys? Yep, go there copy your keys and add to dot env dot local
[00:04:43] So let's grab this put that into dot env dot local
[00:04:47] Okay, I went in on the api key screen and I pasted in both my secret key and publishable key
[00:04:53] So make sure you do that into your dot env dot local
[00:04:57] Next we're going to set up the webhook basically what the webhook is going to allow to do is allow our app to communicate
[00:05:03] With stripe when payments process when payments complete things like that so we can update things on our side
[00:05:09] So we're going to go in our stripe dashboard go to developer webhooks. Let's do that. So if you search webhooks at the top
[00:05:16] It'll take you here. Let's add a destination. All right, so testing this out
[00:05:21] We're going to have to have an endpoint url with our domain. So let's do this if we're going to set up a domain
[00:05:27] We're going to need to host this on the web. So let's take a break here. Let's put this on vercel
[00:05:32] Vercel is where we are going to host our website
[00:05:35] It's what's going to set up the infrastructure for our website in the background
[00:05:40] Vercel is a great web hosting service go to vercel dot com sign up for vercel
[00:05:45] This is where we're going to host our website
[00:05:48] To make this work
[00:05:50] We're going to want our code to be on github which it already is
[00:05:55] So let's do this can you update all our code for github
[00:06:01] Please and i'm going to hit enter. So it's going to upload our latest version of the code to github
[00:06:07] This is important because vercel is going to connect with our github to host the site
[00:06:11] All right, checking our github looks like we are all up to date. That is great
[00:06:15] Now we're going to go back to vercel make sure you're signed up there once you're signed up
[00:06:20] We are going to do add new project prompt racer app import
[00:06:25] Bada bing, bada boom root directory that looks good
[00:06:29] Build and output settings those good environment variables. So this is something we're going to edit in a second
[00:06:34] We're going to need to add all our environment variables here
[00:06:37] So that our app runs perfectly on the internet right now our
[00:06:41] Environment variables are in dot env dot local which is just for our local environment
[00:06:46] So we're going to need our environment variables on the web so we're going to edit this in a second
[00:06:49] But right now let's do this let's just deploy we're going to go in the settings and fix those things soon
[00:06:55] That is going to start deploying we might get a build error just because
[00:07:00] Uh, we didn't have the environment variables in there. We'll see how this goes in a second
[00:07:04] We're also going to choose the domain. That's going to be an important step here. We're going to upload this to
[00:07:08] We're going to put in a custom domain
[00:07:11] So that we can start filling out our web hook in stripe, but this is fun
[00:07:14] We're about to have our app on the internet so anyone can use it in a second. This is going to be sick
[00:07:19] All right looks like we got a build error here
[00:07:22] What we're going to want to do is let's just copy it. We'll copy that we'll go into
[00:07:28] Claude code. We'll say got some build errors
[00:07:33] Make sure this can
[00:07:36] Build properly in verse cell. I'm just gonna say by the way
[00:07:41] Didn't upload my invent variables yet. All right
[00:07:46] I'm sure you got some build errors too. So you just copy and paste in the
[00:07:51] Build errors and it is going to go and is going to fix them for us
[00:07:54] So to get this working, I think we're going to have to also add our environment variable keys up front
[00:08:00] So let's do this go in add all your environment variable keys to here
[00:08:05] One of those environment variable keys are going to have to be the stripe web hook secret
[00:08:10] Which we're still setting up in the next public site URL
[00:08:14] So what we're going to do is we're just going to set up this web hook and bear with me here
[00:08:17] I know we're jumping around but sometimes it's what you got to do in tech
[00:08:21] Let's set up this URL. All right. I'm on the web hook setup site. We were on previously
[00:08:27] Select the events listen to so check out session.complete so we're back in this screen
[00:08:32] For the web hook setup. Let's go
[00:08:34] Check out session complete. We also want to add customer subscription created. So we'll go back in here
[00:08:42] subscription
[00:08:43] Created what else we got here subscription updated and deleted so we also want to do deleted
[00:08:50] And then I think we should have an updated boom all for those selected web hook endpoint destination URL
[00:08:58] Let's do this. So actually let's do this
[00:09:01] Let's get this set up on versatile real quick so we can get the domain and all of that
[00:09:06] Let's get our environment variables in here. I think there's gonna be two environment variables
[00:09:10] We don't have yet the next public URL as well as the web hook
[00:09:14] Just put in placeholder strategy say placeholder in the value and that will allow us to deploy this
[00:09:19] So go into your dot env.local file in your app and put in the key
[00:09:24] So your key is going to be open AI API key or the other
[00:09:28] 8 or 9 environment variables variables you have and the value is going to be
[00:09:33] Whatever's after the equal the part you're not going to want to share with other people
[00:09:36] So put that in i'm going to put mine in now. They will should be able to deploy this successfully
[00:09:41] All right, it looks like it worked. I could hit deploy after putting in all our environment variables and we are deployed
[00:09:47] Let's do this. Let's add a domain. Let's get a custom domain so that we can go in and finish our web hook setup right after that
[00:09:55] So let's buy a domain. I don't know if you own a domain already
[00:09:58] And listen, also if you don't want to buy a domain by the way, you can just for the sake of this course if you want stick with
[00:10:04] Uh, this this domain right here so anyone can access your app right now through this domain
[00:10:09] Um, but if you want to put this live and actually start selling you probably want to buy a domain for this
[00:10:15] So let's do that. Let's buy a domain. Let's see if prompt racer
[00:10:20] Is available prompt racer dot AI to your domain for 140. We do 140. You know we're gonna do 140
[00:10:27] Let's do it prompt racer dot AI. I like that domain, but you can use whatever domain you want for this
[00:10:33] All right, it is purchasing. Let's see here vercell makes it super easy to attach these domains purchase them
[00:10:39] Uh, there we go. Your purchase complete looks like it is done. I like it
[00:10:43] Let's go to the dashboard and let's see if this works. All right, so we're just going to want to attach the domain
[00:10:48] So i'm going to say add domain here. We're in the settings of our prompt racer project
[00:10:53] Let's do it on production
[00:10:55] We'll do prompt racer dot AI there it is save domain added to project now
[00:11:01] It's just building and in a second we should be able to go to prompt racer dot AI and test this out
[00:11:06] This should be cool. This will just take a couple minutes
[00:11:09] It has to do a whole bunch of things to propagate the name server and a whole bunch of other really technical things
[00:11:14] Waiting for a couple minutes, then it should be all set to use your new domain
[00:11:18] All right, I went to www.promptracer.ai. It's looking good. We are live on the internet now. We can set up our web book
[00:11:25] I know this is a multi step process. We're doing here, but actually let's do this
[00:11:31] We're hosted the next section, which will probably be a short section will be pricing part two
[00:11:36] I want to split it up here since we did a lot of things
[00:11:38] We'll set up the web hooks then we'll test the pricing and make sure we can do purchases and all that i'll see in the next section