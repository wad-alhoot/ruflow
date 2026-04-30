[00:00:00] So before we continue building out a few more features,
[00:00:03] I actually want to go in and I want to fill up our to-do list
[00:00:06] with a couple more features.
[00:00:07] So I want to show you something I do every once in a while
[00:00:10] as I'm developing my app, which is check in with the AI,
[00:00:14] go over what we've built out so far,
[00:00:17] give it to the CEO copilot just so knows where we are
[00:00:20] and see if it could come up with any other good ideas.
[00:00:22] So I like to do this.
[00:00:24] Let's go back in a claud here
[00:00:26] and I'm going to say check over our entire app
[00:00:30] to see how we are doing, create a new markdown file
[00:00:36] that describes how the app works
[00:00:39] and all the features we've built out.
[00:00:44] And I'm going to hit Enter on that.
[00:00:45] And what this is going to do is the AI claud code
[00:00:48] is going to build us a new markdown file inside of our app
[00:00:51] that basically describes where we are at the moment.
[00:00:54] So all the features we build out how the app works,
[00:00:56] things like that, we're going to take this description,
[00:00:59] we're going to give it to our copilot CEO
[00:01:01] just so knows where we are,
[00:01:03] where so it's up to date on where we are.
[00:01:06] And then I'm going to talk to the copilot CEO
[00:01:09] see if it can come up with any new ideas we add to our to-do list
[00:01:11] then we just build them out and we're good to go.
[00:01:14] This is what I did with creator body, right?
[00:01:16] Creator body has been very successful
[00:01:18] so I've been able to continuously ship new features
[00:01:21] that are very helpful for the user.
[00:01:22] And I do that by talking to CEO
[00:01:24] and constantly keeping it up to date
[00:01:26] on where we are with our development.
[00:01:27] So take that prompt I just put in there.
[00:01:30] We're going to see the markdown file in a second.
[00:01:32] I'll show you where it is in our files section over here
[00:01:35] and we're going to start talking to the AI CEO.
[00:01:37] So it's going to allow right to app overview.markdown
[00:01:40] so it's creating the new markdown file for us.
[00:01:42] I'm going to hit yes.
[00:01:44] Then we're going to go over here,
[00:01:45] we're going to click on it.
[00:01:46] There it is right there in our file structure.
[00:01:48] Let's see what we got.
[00:01:48] So it has the entire database schema
[00:01:50] which is sick, the tech stack architecture.
[00:01:52] Let's see the key features.
[00:01:54] What is prompt racer, child and AI assistant powered
[00:01:56] by OpenAI organized conversations into name chats,
[00:02:00] optimize their prompts and persist all data cross sessions
[00:02:03] with secure authentication.
[00:02:04] Okay, that's awesome prompt library.
[00:02:06] It has everything in there.
[00:02:07] That's great.
[00:02:08] Let's do this.
[00:02:09] Wow, this is 628 lines of code.
[00:02:12] That's awesome.
[00:02:13] Let's copy this whole thing.
[00:02:14] I'm just copying the whole thing.
[00:02:16] I'm going to come in here.
[00:02:17] We're back in our AI CEO
[00:02:19] and we're going to say,
[00:02:20] I have a rundown of the entire app so far.
[00:02:26] Take a look.
[00:02:27] Let me know what you think
[00:02:30] and let me know if you have any other crucial ideas
[00:02:36] we need to implement immediately.
[00:02:39] And then I'm going to shift, enter
[00:02:42] and then paste in the markdown and hit enter on that.
[00:02:45] And we sent it to our entire CEO
[00:02:48] who's going to read the whole markdown file.
[00:02:50] And now it is going to give us some feedback on our app
[00:02:52] where we are and help us come up with new ideas.
[00:02:54] We'll add to our project management.
[00:02:56] Short version, solid scaffold,
[00:02:59] but right now just a generic chat app,
[00:03:00] which is totally fine and a nice optimizer.
[00:03:03] You need the race and measurement features live ASAP.
[00:03:06] Okay, that's what we're going to build out.
[00:03:08] So we need the AB model racing.
[00:03:09] This is our core differentiator.
[00:03:11] One prompt, two models of parallel side by side streaming.
[00:03:14] Total, I didn't think of that.
[00:03:16] So having stats about each prompt,
[00:03:18] like the total time it took, the total latency, tokens cost,
[00:03:23] I like that.
[00:03:24] And then mark a winner.
[00:03:25] I like that idea of having that detail
[00:03:27] around the results of each prompt.
[00:03:29] So let's go into our project management app.
[00:03:31] Again, I'm using tic-tac
[00:03:33] for the comparison features,
[00:03:36] display stats like cost and total time.
[00:03:41] Now here's the thing,
[00:03:42] I don't know what TTFB means.
[00:03:45] So let's do this.
[00:03:46] Anytime you don't know anything, that's totally fine.
[00:03:49] It's all right to admit when you don't know something.
[00:03:51] So I'm going to say, what does TTFB mean?
[00:03:56] Time to first something, time to first something,
[00:03:59] time to first what, block, time to first,
[00:04:01] time to first bite.
[00:04:03] That's the time when you'd send in the first bite
[00:04:05] of the model's response.
[00:04:06] Okay, I like that.
[00:04:06] Let's add that in there, TTFB.
[00:04:09] Cost, total time for full result,
[00:04:12] and time to first bite.
[00:04:15] I like that.
[00:04:16] All right, save.
[00:04:16] Let's do this.
[00:04:18] Oh, we have API cost estimate in it.
[00:04:20] Let's do this.
[00:04:21] Let's move model racer.
[00:04:23] We're going to implement this next.
[00:04:24] I think this is our killer feature for our app.
[00:04:26] I think this is our killer feature for the app.
[00:04:28] So let's go in here.
[00:04:30] Let's start a new chat.
[00:04:32] And I'm going to say,
[00:04:33] I want to build a prompt racing feature.
[00:04:37] Basically, the way this will work is,
[00:04:42] I'll send one prompt.
[00:04:44] I'll choose race.
[00:04:47] Then I can select multiple models.
[00:04:51] It will send the prompt to both models.
[00:04:56] Then we will get both outputs side by side
[00:05:02] so we can compare them.
[00:05:03] And here's a key point when it comes to prompting
[00:05:06] and cloud code.
[00:05:07] I could easily said and display both stats
[00:05:11] and choose a winner.
[00:05:13] And just included the entire thing,
[00:05:15] you really want to make sure when you're coding,
[00:05:17] like these are really smart models,
[00:05:18] but you want to break it down
[00:05:20] to the smallest, most molecular step possible, right?
[00:05:22] And for this is just,
[00:05:23] hey, allow me to choose a couple of models
[00:05:25] and compare the two.
[00:05:26] We'll add on like the stats and everything after
[00:05:28] and the choosing the winner.
[00:05:30] We'll do that after.
[00:05:31] Let's do this step by step.
[00:05:32] Yes, it could probably one shot it,
[00:05:34] but once you start trying to one shot,
[00:05:36] these massive features,
[00:05:37] you start to introduce confusion to the model.
[00:05:39] You start to introduce confusion to yourself.
[00:05:41] You start having to test 49 different things
[00:05:43] at once.
[00:05:44] You want to build out things
[00:05:45] where you're only testing one thing at a time.
[00:05:47] So even though we can one shot this, let's not.
[00:05:50] It's just better for us.
[00:05:51] It's better for them.
[00:05:52] Slow is fast, fast is good.
[00:05:54] Whatever the saying is,
[00:05:55] this is the way we want to do it.
[00:05:56] We'll get a lot more done in shorter time periods,
[00:05:58] even though we're breaking it down one by one.
[00:06:01] I'm going to hit send on that
[00:06:02] and we are going to have this start building out.
[00:06:04] Okay, so it's writing it's to do.
[00:06:05] It has the available models in here.
[00:06:08] These are not the latest models we're going to use.
[00:06:10] We're also going to be including things like anthropic
[00:06:12] and cloth and all that.
[00:06:14] A lot of the times the AI is,
[00:06:16] they're just like their knowledge cut offs at weird times.
[00:06:19] Like it thinks 4.0 is the latest model.
[00:06:21] It's not like a year, we're like a year and a half after 4.0.
[00:06:24] But we're going to allow it to continue then once
[00:06:27] it built out the feature, then we'll be like,
[00:06:28] hey, by the way, here's the models we want to include.
[00:06:31] So I'm just going to say yes and don't ask again on this.
[00:06:33] Have it build it out and then I'm going to go
[00:06:36] and we will prompt it to fix the models right after.
[00:06:40] All right, as expected, we're going to have to do
[00:06:42] a database migration.
[00:06:45] It's going to store all the responses we get from models
[00:06:48] and store which model is that gave us that data.
[00:06:50] It's going to create the new API endpoint,
[00:06:52] update the user interface.
[00:06:53] So let's do this.
[00:06:54] Let's go into super base and do the migration.
[00:06:56] So we click here.
[00:06:57] So we click here, we got our migration.
[00:06:59] I'm going to copy it.
[00:07:01] Let's go over to super base now.
[00:07:03] Going to go into our prompt racer project.
[00:07:06] We'll go to the SQL editor and I will paste in our migration,
[00:07:10] hit run as always, boom, up to date.
[00:07:13] Looks like it built everything else out.
[00:07:15] So let's test this out, shall we?
[00:07:16] I have a feeling the actual prompt racing itself won't work
[00:07:20] because it's using really, really old models.
[00:07:22] But let's do this.
[00:07:23] Let's do a new chat here.
[00:07:25] Let's do think of 10 business ideas for me.
[00:07:30] Let's do race.
[00:07:32] Ooh, select models to race.
[00:07:34] All right, let's just try this out.
[00:07:36] It will do 40 and 40 many.
[00:07:38] Again, I doubt this will work
[00:07:39] because it's using really old models
[00:07:41] that I doubt OpenAI supports anymore.
[00:07:44] But just see what happens.
[00:07:45] Yeah, it's not working.
[00:07:46] Can't resolve it because of, yeah,
[00:07:49] the model's being out to date.
[00:07:51] So okay, we'll do this.
[00:07:52] In the next video, we'll work on updating these models
[00:07:56] so that it's all the current models.
[00:07:58] We'll add clawed in there.
[00:07:59] So we can test against clawed.
[00:08:00] We'll add Gemini.
[00:08:01] So we can test against Gemini.
[00:08:03] And we'll start making this prompt racing feature work.
[00:08:06] See you there.