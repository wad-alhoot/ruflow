[00:00:00] All right, we have a last couple features we're going to implement in our app.
[00:00:04] And then we are going to go into a few more things.
[00:00:08] We're going to go into setting up payments.
[00:00:10] So pay long, you have to determine a price.
[00:00:12] We're going to do the landing page.
[00:00:14] So building out the marketing page for our app.
[00:00:17] I think we might actually have to do that first and then do the pricing page in the landing
[00:00:20] page.
[00:00:22] We will go into security right after that.
[00:00:24] So making sure app is secure, going over best practices, how to handle security.
[00:00:29] And then lastly, we will get this on the internet.
[00:00:32] So hosting it on Vercel so that other people can use it and buy it.
[00:00:36] And that will be the end of the section around the product itself.
[00:00:40] From there, we'll go into growth and monetization.
[00:00:43] So we'll go into creating content around your app, getting customers, beta tests and getting
[00:00:47] feedback, launch day, fun things like that.
[00:00:52] So with that being said, let's get into the last couple of features here.
[00:00:55] Then we'll get into all the pricing landing page marketing stuff.
[00:00:59] Let's get the marking a response or model as a winner when comparing the output so we
[00:01:05] can see which models we like the best, like our own little LM Arena.
[00:01:10] All right.
[00:01:11] So for this, let's go in here.
[00:01:12] Let's go, okay, great.
[00:01:14] That worked.
[00:01:16] Now I want to be able to mark a model as a winner after a conversation.
[00:01:26] So after however many messages I want, I can click on a model, click on a side.
[00:01:36] Now click on a model and deem it the winner in the chat.
[00:01:42] This then gets stored and I can see which models win the most and their records.
[00:01:50] All right.
[00:01:51] I'm going to do plan mode for this.
[00:01:52] I think it was a little bit more complex.
[00:01:54] But basically what we're going to do is we're going to make it so that you can choose
[00:01:57] a winner when you're racing two prompts and you're racing two models, you can choose
[00:02:00] a winner and then you can see which ones you've chosen as the winner the most and I'm going
[00:02:04] to hit enter on that.
[00:02:05] So it's going to start planning.
[00:02:06] It's going to start building our to do list for us.
[00:02:08] Let's see what we got here.
[00:02:09] I need to add a feature, use it to mark a model as a winner.
[00:02:12] Okay.
[00:02:13] So it's going through that planning phase.
[00:02:14] All right.
[00:02:15] So we got our plan.
[00:02:16] I'll zoom out a little bit here so we can actually read it.
[00:02:19] Let me scroll down here.
[00:02:21] Okay.
[00:02:22] So we got the ability to pick a model as a winner, track wins losses and display statistics.
[00:02:26] So we're going to make some back end changes, update some APIs and add it to the front end
[00:02:31] of course.
[00:02:32] Let's do it.
[00:02:33] I like it.
[00:02:34] Yes and auto accept.
[00:02:35] All right.
[00:02:36] So we're going to start implementing these changes.
[00:02:37] We're going to start being able to choose models as winners here, which is going to be great.
[00:02:39] All right.
[00:02:40] Race winner selection feature complete.
[00:02:42] We have yet another migration we got to do.
[00:02:44] I'm going to copy that.
[00:02:45] We'll go over here to super base, paste it in, run success.
[00:02:50] No rows returned.
[00:02:51] Read the back end API, the front end features.
[00:02:54] And we got a race stats button in the sidebar so we can see our stats.
[00:02:59] I like that.
[00:03:00] Let's test this out, shall we?
[00:03:02] So I'm going to do this.
[00:03:03] I'm going to do this.
[00:03:04] I'm going to pull over prompt racer.
[00:03:06] Let's see here.
[00:03:07] It's starting.
[00:03:08] Let's refresh.
[00:03:09] Let's see what we get.
[00:03:10] Can they one shot this can cloud go back to back to back to back?
[00:03:15] Well, we messed up the fonts a little bit here.
[00:03:18] We got the.
[00:03:19] That's fine.
[00:03:20] Let's do this.
[00:03:21] Let's go who won the NBA finals in 2024.
[00:03:27] I'm going to hit send.
[00:03:28] We're getting our nice data.
[00:03:29] The Boston Celtics one.
[00:03:31] Oh, how convenient.
[00:03:32] It's funny.
[00:03:33] A five mini is slower than 5.1.
[00:03:36] That's interesting.
[00:03:37] Whatever.
[00:03:38] Let's see how this goes.
[00:03:39] Still going.
[00:03:40] 5.1 was under a second.
[00:03:41] Five min is 25 seconds in here for this and it's more expensive.
[00:03:45] All right.
[00:03:46] It's declare winner.
[00:03:47] I think five one was the winner here.
[00:03:49] That's interesting.
[00:03:50] One defeated him to claim the championship.
[00:03:52] The Boston Celtics one defeat.
[00:03:53] The
[00:04:14] that's beautiful.
[00:04:15] All right.
[00:04:16] Let's do this.
[00:04:17] Let's fix the styling.
[00:04:19] You're in the top right.
[00:04:20] So let's we got a styling issue.
[00:04:22] Let's screenshot this again.
[00:04:25] Command control shift four.
[00:04:27] If you're on the Mac, we'll go in here.
[00:04:30] We'll say worked.
[00:04:32] Great.
[00:04:33] Just a little styling issue.
[00:04:36] Everything smushed in the top left and I put the screen shot in.
[00:04:42] I hit enter.
[00:04:43] Let's get this fixed.
[00:04:44] All right.
[00:04:45] The build succeed looks like it made some stylistic changes.
[00:04:48] Let's give it a little refresh here and see what we got.
[00:04:50] Ooh, let's okay.
[00:04:51] Well, let's just reset this first of all.
[00:04:53] Make sure this works well.
[00:04:55] And then anytime again, I would just make sure you restart the server first.
[00:05:00] Just give it a clean.
[00:05:02] All right.
[00:05:03] Looks like a reset styling still not looking good.
[00:05:06] So let's do this.
[00:05:07] Let's screenshot it again.
[00:05:09] Let's take this.
[00:05:10] Let's go back in still not looking good.
[00:05:14] We need to figure out a new way to do this.
[00:05:18] And I'm going to hit enter.
[00:05:19] All right.
[00:05:20] Let's check it out.
[00:05:21] Boom.
[00:05:22] Okay.
[00:05:23] I like it.
[00:05:24] They moved the three buttons down here so you can scroll the different chats here.
[00:05:28] I like that.
[00:05:29] This looks nice.
[00:05:30] All right.
[00:05:31] Let's move it over.
[00:05:32] Let's move it over.
[00:05:33] We completed the marking the response as a winner and fixing the UI.
[00:05:37] I think we're in a decent place.
[00:05:39] I think we could launch V1 here of prompt racer.
[00:05:43] I like where we are with this V1.
[00:05:45] So let's do this next steps.
[00:05:47] We're going to go over building the landing page.
[00:05:50] Then we're going to get the pricing in here so you can go on the landing page and click
[00:05:53] the pricing and log in and do all that.
[00:05:56] Then we'll go over security after that, the pricing stripe, all that.
[00:06:00] I will see you in the next module.