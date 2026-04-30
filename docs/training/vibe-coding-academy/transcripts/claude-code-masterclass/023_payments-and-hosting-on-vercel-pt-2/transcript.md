[00:00:00] Alright, let's put a bow on the pricing part here.
[00:00:02] We're going to finish setting up the webhook for Stripe,
[00:00:05] which is going to allow our app to communicate with Stripe
[00:00:08] so we can process payments.
[00:00:10] So we are still on this screen in Stripe on the creating the webhook.
[00:00:15] We just need to put in the endpoint URL.
[00:00:19] So I'm going to do this.
[00:00:19] I'm going to go back since we've done a lot of different things here.
[00:00:22] We've jumped around quite a bit.
[00:00:23] I'm going to kind of reset with the AI.
[00:00:25] I'm going to actually screenshot the webhook screen right here.
[00:00:29] I'm going to put it in and I'm going to say,
[00:00:33] what should I put in destination name and endpoint URL?
[00:00:41] I just set up our domain on VersaL.
[00:00:45] It is promptracer.ai.
[00:00:49] I'm going to hit enter and then the AI will take us through it.
[00:00:51] Anytime you don't know how to do something,
[00:00:53] anytime you're confused,
[00:00:54] anytime you're not sure what to do next or what's going on,
[00:00:57] you just ask the AI.
[00:00:58] You have infinite intelligence at your fingertips at all times,
[00:01:02] which is pretty amazing.
[00:01:03] All right, perfect.
[00:01:03] Here's what you should put in for Stripe destination name,
[00:01:06] promptracer production.
[00:01:08] I am going to copy and paste that into destination name URL.
[00:01:12] Let's copy this.
[00:01:13] I put that into endpoint URL just as you see there.
[00:01:18] And then after the endpoint select the four events,
[00:01:20] which we already did,
[00:01:21] and that will give us the signing secret.
[00:01:23] So let's do this.
[00:01:24] Let's create the destination.
[00:01:26] And there it is.
[00:01:26] The signing secret is right there.
[00:01:28] So copy and paste this into your environment variables.
[00:01:32] It's going to go under the Stripe web hook secret environment
[00:01:35] variable.
[00:01:36] And then we're also going to put that into VersaL as well.
[00:01:39] So I did that in again, settings environment variables right there.
[00:01:45] And then make sure you add in the web hook key and the value to that.
[00:01:49] Again, if you get confused here,
[00:01:51] just ask the AI what you should be doing there.
[00:01:54] Since we already put in a placeholder,
[00:01:56] all I'm going to need to do is go down here, click edit,
[00:02:00] and then paste in that value we got from the Stripe dashboard.
[00:02:04] We're also going to add the next public site URL.
[00:02:06] So let's do that.
[00:02:07] Let's edit.
[00:02:08] And we're going to put in our site URL,
[00:02:10] which is promptracer.ai, paste, save, and then redeploy
[00:02:16] so that our website updates with all the new environment variables.
[00:02:20] Then if we click deployments up here,
[00:02:22] we can see that our new websites being deployed
[00:02:24] with all the new environment variables.
[00:02:26] It'll take some time to build.
[00:02:28] And then once this is done, we might be able to test out the pricing
[00:02:30] by setting up a subscription.
[00:02:32] Let's see how this goes.
[00:02:33] All right, so let's give this a trial.
[00:02:35] Let's give this a whirl.
[00:02:36] I think we're good to go.
[00:02:37] Let's do star racing for free.
[00:02:39] So we should have a trial mode here.
[00:02:42] Let's create an account.
[00:02:43] I'm going to use an alternative account here.
[00:02:45] I'm going to create.
[00:02:46] All right, so let's see.
[00:02:47] It looks like we set it up.
[00:02:49] We'll go over here.
[00:02:50] We're in Superbase.
[00:02:51] Let's go to our tables.
[00:02:52] Subscriptions.
[00:02:53] Okay, it appears that didn't work.
[00:02:56] Good.
[00:02:56] So let's do this.
[00:02:57] Let's debug it.
[00:02:58] Let's go back into Visual Studio Code.
[00:03:01] Talk to the AI.
[00:03:02] See what we got to do here.
[00:03:03] So I did this.
[00:03:04] I told the AI, I tested it out.
[00:03:06] I'm running into a few issues.
[00:03:08] I signed up for a new account.
[00:03:09] It took me to the login screen.
[00:03:11] Nothing was entered into the subscriptions table.
[00:03:14] I checked the subscriptions table.
[00:03:15] There was nothing there.
[00:03:17] I tried to log in.
[00:03:18] It didn't work.
[00:03:19] I realized I need to confirm my email.
[00:03:21] There was nothing that said you need to confirm your email.
[00:03:23] I got to my email and clicked confirm.
[00:03:25] It took me to the local host and says there's basically I ran into 100 different errors.
[00:03:30] If you're running into errors too, because our AIs might have worked in different ways,
[00:03:34] just tell the AI, Claude code, what happened, what you experienced.
[00:03:40] And it should get to work on fixing it.
[00:03:43] So it figured out there was three things that needs to fix.
[00:03:45] Fix email confirmation redirect, add email confirmation notice, and test subscription
[00:03:49] flow after.
[00:03:50] The first thing we need to do is fix the confirmation redirect.
[00:03:54] So right now it's redirecting the local host for me and needs to redirect to prompt racer.ai.
[00:03:59] So we need to go to the super based dashboard and navigate to authentication URL configuration.
[00:04:04] Let's do that.
[00:04:05] So here we go.
[00:04:06] Let's go to authentication URL configuration site URL.
[00:04:10] All right.
[00:04:11] We're going to need to put in prompt racer.ai save changes and we're going to add this to the
[00:04:18] redirect URLs.
[00:04:19] And we're going to save the URL.
[00:04:21] Just a couple of things to note here as well.
[00:04:24] For the sake of this course, I'm trying to get you to your shipped app as quick as I can.
[00:04:29] One small step you'd want to do after this is fully shipped is you'd want to set up a new
[00:04:35] database.
[00:04:36] So you'd want to go in here and set up a new project inside of your organization and call
[00:04:43] it your prompt racer development project.
[00:04:46] You really want to have two separate databases, one for development, one for production.
[00:04:52] This makes it so that when you're doing testing and you're making changes, you can validate
[00:04:56] it in in development and then move it over to production afterwards.
[00:05:00] So after this course is over, I would highly recommend setting up another project for your
[00:05:05] development environment, hooking up your development environment to that and keeping this one
[00:05:09] for production.
[00:05:10] So we set up those redirect URLs.
[00:05:12] Let's pull open the AISU.
[00:05:13] We've got next issue two, no email confirmation.
[00:05:15] No, it's on signup.
[00:05:17] Let me add that.
[00:05:18] It added that.
[00:05:19] Now, let me commit these changes.
[00:05:20] Looks like it committed it perfect.
[00:05:22] All right.
[00:05:23] So it's saying we can test again.
[00:05:24] Let's check our deployments to see if that worked.
[00:05:26] Yep.
[00:05:27] Looked like that work.
[00:05:28] Let's test this out now.
[00:05:29] We want a prompt racer.
[00:05:30] I'm going to start racing for free.
[00:05:33] I'm going to type in an email going to create the account still didn't get the screen that
[00:05:38] says, make sure to confirm your address.
[00:05:41] So we're going to have to go back and fix that.
[00:05:43] So let's see if we can start this subscription.
[00:05:45] I'm going to go into my other email, confirm my email.
[00:05:49] Okay.
[00:05:50] That looks like it works.
[00:05:51] It didn't log me in automatically, but let me see what happens if I try to log in here.
[00:05:55] Will that work?
[00:05:56] Okay.
[00:05:57] So it logs in.
[00:05:58] So we fix some issues.
[00:05:59] We still have more issues we need to fix here.
[00:06:00] So let's debug this issue.
[00:06:01] Number one is I look at my subscriptions table.
[00:06:05] No subscription.
[00:06:06] So it's not creating the subscription for us.
[00:06:07] It's creating the account, not creating the subscription through Stripe.
[00:06:11] And also there was no screen that said you have to confirm your email.
[00:06:14] So let's go back and debug this, create a new account, filled in information, hit submit,
[00:06:19] no screen saying, check your email.
[00:06:24] I checked my email and hit the confirm email.
[00:06:28] It takes me to prompt racer home screen, but not logged in.
[00:06:35] No mention of confirmation working.
[00:06:39] I log in, takes me to app, but nothing new in subscriptions table.
[00:06:46] So I just described exactly what we're running into.
[00:06:48] I had enter.
[00:06:49] There are multiple issues here.
[00:06:50] Let me fix all of them.
[00:06:51] All right.
[00:06:52] Looks like it fixed it.
[00:06:53] Sign up process, sign up success screen.
[00:06:55] Now shows a green check mark with check your email, email confirmation redirect, build hours.
[00:07:01] Next step for testing, sign up with a new email.
[00:07:03] All right.
[00:07:04] I'm going to go in to test this and I'm going to go to authentication and I'm going to delete
[00:07:09] one of my emails here so I can test this again.
[00:07:12] So let's delete this user.
[00:07:13] Delete.
[00:07:14] All right.
[00:07:15] Now let's try with that email again.
[00:07:16] We're going to prompt racer.
[00:07:18] I'm going to say start racing for free.
[00:07:19] I'm going to try this again with that same email.
[00:07:22] Still no confirmation screen.
[00:07:24] That is very frustrating.
[00:07:25] We are running into issues.
[00:07:26] That's fine.
[00:07:27] Sometimes you get into ever holes and you just got to work your way out of it, which is
[00:07:31] fine.
[00:07:32] Let's just test it anyway.
[00:07:34] So we click it.
[00:07:35] All right.
[00:07:36] Let's test this out.
[00:07:37] So I'm going to click start racing free.
[00:07:38] I'm going to put in my email.
[00:07:39] I'm going to type this out.
[00:07:42] Let's create the account.
[00:07:43] Oh, boom.
[00:07:44] Check your email.
[00:07:45] That's great.
[00:07:46] That's a good start here.
[00:07:47] I'm going to go over my email and confirm this.
[00:07:51] Okay.
[00:07:52] Looks like it takes me to the home screen, which is not exactly what I want.
[00:07:56] It should be auto logging me in.
[00:07:57] So we'll fix that right after.
[00:07:59] But let's log in here and let's see how this goes.
[00:08:02] I'm going to sign in and it takes me right to here.
[00:08:04] So that's not good.
[00:08:05] Still not working.
[00:08:06] I'm going to imagine no subscription was had, but it seems like all the interaction with
[00:08:10] Stripe is not working at the moment.
[00:08:13] Yep.
[00:08:14] Nothing in the subscriptions table under Stripe.
[00:08:16] Okay.
[00:08:17] So let me do this now.
[00:08:18] Still running into issues.
[00:08:21] I create a new account.
[00:08:24] It shows me the confirmation screen telling me to go to my email.
[00:08:32] I click confirm in my email.
[00:08:35] It takes me to the prompt racer home screen in a logged out state with no message or anything.
[00:08:46] I log in.
[00:08:48] It takes me to the app.
[00:08:51] Nothing in the subscriptions table or in Stripe.
[00:08:55] I'm going to hit enter.
[00:08:56] The whole Stripe part's not working at the moment, but we'll we'll debug this.
[00:08:59] I'm going to be honest.
[00:09:00] This is probably the most complicated part of building the app is setting up the payments
[00:09:04] and getting that to work.
[00:09:05] So you're probably going to run into issues.
[00:09:08] The good news is we have a super smart AI that knows how all this works that we will
[00:09:12] fix it for us.
[00:09:13] So we just need to be patient and keep working with AI to get this to work.
[00:09:16] All right.
[00:09:17] So looks like the AI finished its work and then go in and delete the user.
[00:09:22] I just create and try this again.
[00:09:25] Sometimes when getting into these error holes, you got to do things over and over and over
[00:09:29] and it is what it is.
[00:09:30] You log out here.
[00:09:32] Let's go back to prompt racer, start racing for free.
[00:09:35] We'll put in the email.
[00:09:37] We'll sign up for an account here.
[00:09:39] Check your email.
[00:09:40] All right.
[00:09:41] I hit confirm in the fix did not work because it takes us right back to here, which is not
[00:09:48] what we want.
[00:09:49] We wanted to take us to the pricing screen.
[00:09:51] So the AI is not cooperating very well.
[00:09:54] Okay.
[00:09:55] That fixed the build error, but when I create an account, it still takes me to the home page
[00:10:05] after I confirm my email in a not logged in state.
[00:10:10] This is broken.
[00:10:12] Try something dramatically different because all of your attempts up to here have not worked.
[00:10:22] All right.
[00:10:23] Let's test this out now.
[00:10:24] Boom.
[00:10:25] Takes you to the pricing page when you sign up.
[00:10:28] That's exactly what we want.
[00:10:29] So let's click start a seven day free trial and see what happens.
[00:10:33] See if this works.
[00:10:34] Okay.
[00:10:35] Excellent.
[00:10:36] Takes us to this screen, which is the stripe trial screen.
[00:10:37] I'm going to sign up for this here.
[00:10:39] All right.
[00:10:40] I hit submit.
[00:10:41] It takes us to the app.
[00:10:42] Now let's check some things out.
[00:10:44] Let's see if a subscription was created in our table.
[00:10:48] All right.
[00:10:49] Let's do this.
[00:10:50] Let's check to see.
[00:10:52] If it updated the subscription as well.
[00:10:54] And boom, there it is.
[00:10:55] Trialing.
[00:10:56] It's got everything.
[00:10:57] It's got the price ID.
[00:10:59] It has got all the information.
[00:11:00] The user, the current period starts when it ends.
[00:11:04] Love it.
[00:11:05] And then let's check stripe.
[00:11:06] Let's see if stripe has the trial in it.
[00:11:10] So I'm going to go over to stripe and pull it over here.
[00:11:13] Let's see customers.
[00:11:15] Let's refresh this.
[00:11:16] See what happens.
[00:11:17] Hopefully there'll be a customer that shows up here.
[00:11:19] Boom.
[00:11:20] There I am.
[00:11:21] It's got subscriptions.
[00:11:22] It should have our subscription.
[00:11:23] I'm going to click all.
[00:11:25] Let's see.
[00:11:26] Oh, there it is.
[00:11:27] Trial ends November 30th.
[00:11:29] We got it working.
[00:11:30] And there it is.
[00:11:31] We got the pricing set up.
[00:11:33] We got the trial set up.
[00:11:35] We got it all set up.
[00:11:36] I'm going to do one more section on the product before we get into all the marketing.
[00:11:41] At this point we had the product set up.
[00:11:43] We had the subscription set up.
[00:11:45] Listen, there are a lot of places this could have messed up along the way if you're working
[00:11:49] with me from home.
[00:11:51] This is one of those parts where there's a lot of moving pieces.
[00:11:54] The payment section when it comes to trials, when it comes to the registration flow.
[00:11:59] The AI on your side might have introduced bugs that I didn't see and vice versa.
[00:12:03] So if you ran into things here, it's impossible for me to cover all possible bug scenarios
[00:12:07] here.
[00:12:08] If you ran into any issues, make sure you screenshot the errors, right?
[00:12:12] Where are the places you can get errors?
[00:12:15] You can go into the logs inside of Versailles.
[00:12:18] If you go to your website on Versailles and click logs, here's all your network logs right
[00:12:23] there.
[00:12:24] You can get errors inside your console.
[00:12:26] If you right click on the browse and do inspect, you can see the browser console and you can
[00:12:30] also get errors in the webhook.
[00:12:34] So if you go into Stripe and you go to webhooks and we go over here and then we go to logs.
[00:12:42] Actually, let's go to events.
[00:12:44] In the events, you could also get errors here.
[00:12:47] So if you're running into issues, you're running into bugs, look in those places for
[00:12:51] errors.
[00:12:52] If you see errors, copy and paste them to the AI, say, hey, here's the issues I'm facing.
[00:12:56] Can you please fix this?
[00:12:57] And the AI should fix it for you.
[00:12:58] I'm going to go over one more section before we get into the marketing and that is going
[00:13:02] to be security.
[00:13:04] This is something super important we want to cover.
[00:13:06] There's a lot of other things you could perfect on the app side if you wanted this
[00:13:11] point.
[00:13:12] If you want to improve the onboarding screens or where it redirects to or things like that,
[00:13:16] or you want to put a trial banner on the trial screen, you can do that as well at this
[00:13:20] point.
[00:13:21] There's always little things you could always be improving and ironing out.
[00:13:24] But at this point, I want to cover one more section from the product side, which is security.
[00:13:28] Then we'll get into marketing, getting our first customers all of that.
[00:13:31] So I will see you in the next section.