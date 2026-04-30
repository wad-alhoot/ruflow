[00:00:00] So as we get deeper into this course, we are about to get to the meat of the entire thing.
[00:00:05] We're about to build out all the core functionality.
[00:00:09] We are going to get this app on a database.
[00:00:11] We're going to do a whole bunch of cool things.
[00:00:13] Now we're at the fun part.
[00:00:14] So next steps, we're going to set up the database.
[00:00:17] Then I'm going to build out a ton of features of functionality with the goal of showing you as
[00:00:21] we're building out all these features, the proper way of chatting with the AI,
[00:00:24] the proper way of communicating and requesting what you want.
[00:00:28] Once we have the core functionality set up, the app built out, set up in the database,
[00:00:34] all that, we'll set up some of the other supplementary features such as payments,
[00:00:39] such as authentication.
[00:00:41] We'll get the app secure.
[00:00:42] We'll talk about security app for a little bit.
[00:00:45] Then we'll get into some of the marketing, so building out the landing page.
[00:00:48] And then we will get the app online.
[00:00:51] That is everything we're going to do moving forward now.
[00:00:54] And then later, once we finish that and the app is looking good, then we'll cover marketing.
[00:00:58] The app pricing, launching, getting first customers, getting feedback and
[00:01:02] iterating everything around that.
[00:01:04] So a lot of fun stuff to be had.
[00:01:06] So let's do this.
[00:01:07] Let's just get straight into it.
[00:01:08] Let's actually set up the database here.
[00:01:12] So just as a quick reminder, this is the architecture of our app again, all the data in the app.
[00:01:18] So, you know, we're building an AI chat bot here with a lot of advanced functionality.
[00:01:22] When the app loads, it has to load all the data about the user, right?
[00:01:26] They're past chats, who they are, their settings, their interests, everything about that specific user when they log in.
[00:01:33] All that data comes from the database and is sent to the front end, which is what we were just working on a second ago.
[00:01:39] Everything you see is the front end for our database.
[00:01:42] We are using an app called Superbase.
[00:01:44] Now, Superbase is awesome.
[00:01:46] I've been using it for years now.
[00:01:48] It has a very, very generous free tier.
[00:01:50] You can use for this.
[00:01:51] And what you're going to want to do is set this up and sign up here in basically
[00:01:56] what Superbase is called a SQL database.
[00:01:59] And the way that works is it's basically a bunch of Excel spreadsheets saved to the back end.
[00:02:06] And what I mean by that is it has what's called rows and columns.
[00:02:10] And I'm not going to get super technical here.
[00:02:11] I just think it's good to understand how all this works.
[00:02:14] So the database has a bunch of tables.
[00:02:16] Each table stores a specific type of information.
[00:02:21] So you can have a user's table that stores all the information on who the users are in the app.
[00:02:26] You can have a messages table in this table stores all the messages all your users are having with the AI.
[00:02:31] You can have a prompts table.
[00:02:33] It could be a table of all the prompts your users have saved to their database.
[00:02:38] Right. So each table has a specific type of data.
[00:02:42] It stores.
[00:02:43] Now, you can think of each table as basically an Excel spreadsheet.
[00:02:47] So if this was, for instance, a user's table, you're going to have columns and you're going to have rows.
[00:02:54] The columns are the pieces of information you have about the users.
[00:02:59] And if this gets too technical for you or you lose track of what we're talking about, don't worry.
[00:03:04] We're going to get practical in a second.
[00:03:06] But each column is a type of data.
[00:03:09] So for a user, you might have email.
[00:03:11] You might have first name.
[00:03:13] You might have last name.
[00:03:14] And then each row is going to be a different instance of that data.
[00:03:19] Right.
[00:03:20] So we might have me.
[00:03:22] So my email.
[00:03:23] Right. And then me, my first name and then my last name.
[00:03:26] And then if another user signs up, maybe Bob won a Gmail signs up, right, he'll be there for us.
[00:03:32] A Bob Billy.
[00:03:34] Right. And so each row is going to be another instance of that set of data.
[00:03:38] So the columns define what makes a user and the rows define all the instances of that data.
[00:03:46] Right. And so maybe if this was a prompts table and people are storing their favorite prompts to the database.
[00:03:53] It would be something like title.
[00:03:56] So maybe the title of the prompt, the prompt itself, maybe the date created of the prompt and then the rows.
[00:04:04] And actually, you would also want to hear the user ID so we can link back this table to the users.
[00:04:10] And so the rows would be like tweet generator would be the name of the prompt.
[00:04:14] The prompt would be generate me a tweet.
[00:04:18] The date created would be, you know, whatever date is at that time.
[00:04:21] And then the user ID would be a random set of letters and numbers that links back to the users table.
[00:04:27] So I know this was probably the most technical and advanced part of this.
[00:04:31] But I just wanted to make sure we kind of a general understanding of databases and how they work.
[00:04:36] So we are going to set up super based now.
[00:04:38] So what you're going to want to do is sign up for super base.
[00:04:42] Get that going.
[00:04:43] And then come into super base, create a new organization, which they probably do by default as you're setting it up.
[00:04:48] And then when you're in the organization, you can create a new project and we're going to create a project in here called prompt racer.
[00:04:58] You can give it a random password.
[00:05:00] I like to generate a password.
[00:05:01] So it's super secure.
[00:05:02] Copy that.
[00:05:03] And you choose your region, whichever should be closest for you and create that project.
[00:05:07] Once that project is set up inside of super base, we are good to go and we can go back into visual studio.
[00:05:15] So here we go.
[00:05:16] Let me pull this over here.
[00:05:17] And now we can instruct Claude code to implement this database.
[00:05:22] And I'm going to say, OK, let's implement the database.
[00:05:26] Now I want to use super base for this.
[00:05:31] I want to use super base for both off and the database.
[00:05:37] So we're going to actually add a last second change of plans here.
[00:05:40] We're just going to use super base for both off and the database.
[00:05:43] I was going to use a different program called clerk for the authentication.
[00:05:46] I think it's going to be a lot easier, simpler and better if we just use super base for both.
[00:05:50] They have a very good off feature set in here.
[00:05:53] So super base both off and database.
[00:05:55] OK, let's implement the database.
[00:05:56] Now I want to use super base for this.
[00:05:58] I want to use super base for both off and the database.
[00:06:01] We're going to switch to plan mode for this.
[00:06:03] So I want to check out the plan it builds before it starts writing the code.
[00:06:07] I like to use plan mode for more advanced things.
[00:06:09] If it's like really simple change, like I'm like, add a dark mode or change this feature,
[00:06:13] add this button.
[00:06:15] I won't use plan mode.
[00:06:16] I'll just give it the command and Claude goes and builds it.
[00:06:18] But for things more advanced, like implementing the database, I like to use a plan mode just
[00:06:23] so I can read it, understand how it works, and then implement it.
[00:06:26] So I'm going to hit enter on that.
[00:06:27] And Claude's going to go into plan mode, which is really good at.
[00:06:30] If it has questions for us, it's going to ask us those questions.
[00:06:33] But it will now start building out a plan for the database we're going to implement right now.
[00:06:38] All right, so it looks like the plan is complete.
[00:06:41] Let's take a look at this and make sure on the same page here.
[00:06:45] So I'm going to make the terminal a little bit smaller here so we can read it.
[00:06:49] The goal is to transform the in memory chat app into a persistent multi user application
[00:06:53] with super base off and database.
[00:06:55] So it's going to configure super base.
[00:06:56] It's going to install the dependencies, create the project,
[00:06:59] add the environment variables, which I'll walk you through.
[00:07:02] I'm going to walk you through literally everything, but it'll install that.
[00:07:05] It'll create the schema.
[00:07:07] The schema of the database is basically determining what the tables will look like,
[00:07:12] what the columns will look like, right?
[00:07:14] The whole basically set up of the database and how it will work.
[00:07:17] So it is going to create tables for users like I showed you in that spreadsheet,
[00:07:21] conversations, messages, and we're going to add so much more.
[00:07:25] You can edit it anytime.
[00:07:26] So we can add tables as we go.
[00:07:27] We're going to add row level security will make sure,
[00:07:29] which will make sure basically that the users who log in and write conversations
[00:07:35] can only see the conversations they write and not access other people's conversations.
[00:07:40] Authentication, it will set up the login page, the sign up page and all of that,
[00:07:44] which is great.
[00:07:45] API routes, which as we talked about earlier, this is basically your back end.
[00:07:50] So when the front end says, hey, we need to pull the messages for user XYZ.
[00:07:55] It'll say, hey, back and grab that for us.
[00:07:57] And the back end will go, OK, I'll do that.
[00:07:58] And then look at the database and say, hey, where's XYZ users messages and grab it?
[00:08:03] That's how the API works, right?
[00:08:05] The API, again, is how two pieces of software communicate with each other.
[00:08:09] The front end communicating with the database UI updates.
[00:08:13] So it's going to add conversation sidebar to the main page.
[00:08:15] So you can see all your other chats.
[00:08:17] It is going to update the chat page to load conversations.
[00:08:20] It's going to have a new chat button.
[00:08:22] So it's going to add all the UI to support all our database changes.
[00:08:26] And it is going to add all the flows.
[00:08:28] This is excellent.
[00:08:29] This looks good.
[00:08:30] Let's do yes and auto accept because this is a pretty simple task for a cloud to build out.
[00:08:36] It will build it out.
[00:08:37] And then in a second, what we're going to do is we're going to set it up so we can connect
[00:08:41] all the code here you see in the front end to the database so they can talk to each other.
[00:08:46] As this goes, I'm just going to keep hitting yes and don't ask again, because
[00:08:50] Claude, by this point as you're watching this course is so good that it very, very,
[00:08:54] very, very rarely messes up tasks like this.
[00:08:58] So as this is going, this is a good first opportunity to go back to our AICEO co-pilot and do some
[00:09:08] chatting while most people while their AI is building out code, building out the database,
[00:09:13] they're going to now pick up their phone, start scrolling Twitter or TikTok or Instagram,
[00:09:18] whatever the kids are doing nowadays.
[00:09:20] Not you, not you, not you.
[00:09:22] What you're going to do instead is you're going to pull open your AI co-pilot like we were talking
[00:09:28] about earlier and we are going to get to work.
[00:09:31] So we're going to say so far we've built out a basic front end, basically a chat bot app
[00:09:41] where you can create new chats and it saves to Superb.
[00:09:49] What do you think about that so far?
[00:09:52] What do you think should be the next great features we can add?
[00:09:59] And I'm going to hit enter on that.
[00:10:01] And what we're doing is we're not wasting our time while Claude works.
[00:10:04] Instead, we're going to talk to our other AI to come up with new ideas.
[00:10:08] Then we're going to take the ideas it comes up with, add it to our project management.
[00:10:13] I'm using TikTok.
[00:10:14] You can use whatever you want.
[00:10:16] And we are going to make sure this time where the AI is working is productive time.
[00:10:21] If you use this time where AI works to do other things, the goof off, to get distracted,
[00:10:25] to get dopamine hits, it's going to slow down your productivity so much.
[00:10:29] And that's the way 99% of people work.
[00:10:31] That's how they operate.
[00:10:32] But you're not part of 99%.
[00:10:34] You're in the vibe coding academy.
[00:10:36] You're working with the FinFAM.
[00:10:38] You're not like the other people.
[00:10:40] You on the other hand, you work on a higher level, on a next level with higher vibration.
[00:10:45] So let's see what we got.
[00:10:46] Good scaffold, a basic chat with super basses, c'mon, it proves you're wiring.
[00:10:49] Now ship the differentiators immediately.
[00:10:51] Okay.
[00:10:52] I like the way the CEO talks to me.
[00:10:54] AB model race side by side is treating one prompt, dispatch to model A and dispatch to
[00:10:58] model B concurrently.
[00:11:00] I like that.
[00:11:01] Let's do that next.
[00:11:02] Actually, let's see what this prompt library save any prompt.
[00:11:04] Actually, maybe let's keep this simple for the sake of this course.
[00:11:09] We'll go with a simple next step, which is the ability to save prompts.
[00:11:13] Once we have that done, then we will go a little bit more advanced, which is the AB
[00:11:18] model race.
[00:11:19] I think that is a tad more advanced.
[00:11:22] So we'll start simple, go more advanced and we'll keep adding more functionality.
[00:11:25] So let's take a look at our project management while we do this.
[00:11:28] And you can see Claude code working in the background there.
[00:11:30] You just got your employee working for you in the background.
[00:11:32] How cool is that?
[00:11:33] You literally have an employee working for you now.
[00:11:36] This is a cool part about AI.
[00:11:38] People working on their own like you and me, we now have employees that work for us, which
[00:11:42] is pretty incredible.
[00:11:43] So here we go.
[00:11:44] Here is my project management app.
[00:11:46] It's my can band board.
[00:11:48] I have a bunch of different things in here, different ideas I came up with for our app.
[00:11:53] But let's do this.
[00:11:54] Let's look for where we have the prompts library.
[00:11:57] I like that.
[00:11:58] Let's move that into to do.
[00:12:00] So basically what I did was I went and talked to an AI and I just bounced ideas and I came
[00:12:04] up with a whole bunch of ideas, educational video section, having updating context, things
[00:12:10] like that.
[00:12:11] These are all just random ideas I put in afterwards.
[00:12:14] But let's start adding some of these ideas to our students.
[00:12:16] We have the prompt library.
[00:12:18] We have model racer send one prompt to multiple models.
[00:12:23] And then we also have what we're working on now, which is implement database.
[00:12:29] And we're also implementing the authentication implement.
[00:12:33] So let's do this.
[00:12:35] Let's move this, the database in the auth into in progress so we can track this.
[00:12:41] We also have the model racer in the prompt library.
[00:12:45] Now in our to do list.
[00:12:47] So we're going to move these over after we complete these two.
[00:12:49] And this using this is just a really good way to track your work, track your ideas, come
[00:12:54] up with new ideas and stay organized.
[00:12:56] So let's go back here.
[00:12:58] Let's see if we have any other ideas here that we really like.
[00:13:00] Shareable run link read only page for any saved race, private by default toggle to shareable
[00:13:05] via hash URL.
[00:13:07] Maybe, maybe later on.
[00:13:09] So let's just add that to to do share chats with other people.
[00:13:15] I'm going to move that kind of down the list.
[00:13:17] I don't think that's quite as important for what we're building out.
[00:13:20] Let's see here prompt optimizer.
[00:13:21] I like this deterministic rewrite with a rubric.
[00:13:24] So it optimize our prompt.
[00:13:26] I like this idea.
[00:13:27] We can put in a prompt hit optimize and then the AI optimizes the prompt for us to make it
[00:13:32] even better.
[00:13:33] So let's do prompt optimizer right in AI still working.
[00:13:37] We're still getting better here.
[00:13:38] We're doing our part.
[00:13:40] And I think that says complete back there.
[00:13:42] Superbase integration complete added off added persistent conversation database added message
[00:13:46] persistence added conversation sidebar added delete conversations protected routes and
[00:13:52] users can only see their conversations love that created some new files.
[00:13:56] You can quickly look through that.
[00:13:59] Now let's see next steps for you.
[00:14:00] This is important create our project.
[00:14:02] We did that copy the sequel from migration.
[00:14:05] Okay.
[00:14:06] So this is going to be very important here.
[00:14:07] So what law is going to do every time it makes changes that require a database change
[00:14:14] is it's going to create what's called a migration file.
[00:14:18] This migration file includes sequel.
[00:14:21] Let me show you what that looks like.
[00:14:23] So if you open up the super base folder in our file section over here on the left and you
[00:14:27] click there and you see this migration file.
[00:14:30] This is sequel code.
[00:14:31] This is basically code for the database.
[00:14:34] It programs the database.
[00:14:35] It creates the tables.
[00:14:37] It creates the columns.
[00:14:38] It can create rows.
[00:14:40] It can create security policies.
[00:14:42] It can do a whole bunch of things.
[00:14:43] This is basically the language your database speaks and what Claude is going to do as it
[00:14:49] makes changes to your database is it's going to write this sequel code.
[00:14:53] And what you're going to do is literally just copy the whole thing.
[00:14:57] So I do command a command C to copy the whole thing.
[00:15:00] And you're going to be doing this a lot here.
[00:15:02] Then you're going to go into your database.
[00:15:04] We're going to go to SQL editor over on the left hand side.
[00:15:08] This is where we can paste in SQL code that will change our database.
[00:15:12] So if you look at table editor right now, there's no tables.
[00:15:14] This is where you'll see all your tables and all your I'm going to go to SQL editor.
[00:15:18] I'm going to paste in what we just copied and I'm going to hit run over here on the
[00:15:22] right hand side success.
[00:15:23] No rows return beautiful.
[00:15:25] That's exactly what you want to see when you run SQL code that creates tables.
[00:15:29] Now if we go and we click table editor, you'll see two new tables.
[00:15:33] The conversation and messages that is brilliant.
[00:15:36] And then if you click in, you can actually see the columns.
[00:15:40] So for all conversations as an ID for the conversation and as an ID for the user, it has
[00:15:45] a title created at updated at all of that.
[00:15:48] The reason you don't see a users table is we actually because we're doing super based authentication,
[00:15:55] you can actually click authentication.
[00:15:57] And this is basically your users table and you'll see all your users as they sign up here.
[00:16:02] So they're going to have user IDs that will actually link back to the conversations where
[00:16:07] you see user ID and message ID.
[00:16:09] So that's all set up.
[00:16:10] That's excellent.
[00:16:11] What we're going to need to do now is actually hook up our app to this database, right?
[00:16:16] And that is done through environment variables.
[00:16:19] So let's take a look here.
[00:16:20] If we go into .env.example, you will see three new environment variables in here.
[00:16:28] So the AI is going to maintain this .env.example.
[00:16:31] You are maintaining .env.local.
[00:16:34] .env obviously means environment variables.
[00:16:37] So example, that is just the AI saying, hey, here's the variables you need.
[00:16:42] Local is what you maintain where you have to copy and paste these in.
[00:16:46] And here's the thing.
[00:16:47] We have three different environment variables we need for super based.
[00:16:53] So what you're going to need to do is copy these three and then go into .env.local and
[00:16:59] paste them in.
[00:17:00] Then what you're going to need to do is go into super base and find these three variables,
[00:17:07] which I will show you how to do right now.
[00:17:09] So we need the URL, the a non key and the service role key.
[00:17:13] So if we go in here and you go to project settings, then you go into data API, you will
[00:17:19] see your URL.
[00:17:21] So we're going to copy that.
[00:17:22] So go back in here.
[00:17:23] I'm doing this in .env.example, but make sure you do this in .env.local and you're going
[00:17:28] to paste that in where the URL is.
[00:17:32] Then we need the a non key.
[00:17:33] And just as a side note, you're not going to want to share this with anyone.
[00:17:36] Nothing in these environment variables are meant to be shared.
[00:17:40] These are all private.
[00:17:41] These are basically your passwords for open AI and super based on it.
[00:17:44] So do not share any of them.
[00:17:46] Next you want to go into API keys.
[00:17:48] And what you're going to see is your a non key and your service role key.
[00:17:53] These are going to be the other two variables you need in here.
[00:17:56] So do yourself a favor, copy this, then reveal this and copy that to and paste them both into
[00:18:01] here again in your .env.local, not the .example.
[00:18:06] Do not put it in your .example because these are actually going to be public.
[00:18:09] This is going to go into your GitHub.
[00:18:11] So you want to keep them blank with the your your super based service role key.
[00:18:16] You want to keep it like it is.
[00:18:17] I'm just doing this as an example.
[00:18:18] So I don't because I don't want to show you all my passwords.
[00:18:21] So again, copy this, put in .env.local and take your keys and put that in .env.local as well.
[00:18:28] Once you do that, you have all those in there in your .env.local.
[00:18:31] You're good to go.
[00:18:32] We can actually start testing this to see how this works here.
[00:18:36] So let's do this.
[00:18:37] I'm going to go back in here.
[00:18:38] NPM run dev.
[00:18:39] If you already have it running, you won't need to do it again.
[00:18:42] Let's go here local host 3000.
[00:18:44] Let's pop this open.
[00:18:45] See what we get.
[00:18:46] So we go straight to the login screen.
[00:18:48] This is the brand new login screen.
[00:18:50] You're going to have to hit sign up for your first time.
[00:18:52] Put in your email.
[00:18:53] Click sign up there once you put in your email and password.
[00:18:57] Now we can sign in.
[00:18:59] Let's sign in.
[00:19:00] You're going to need to confirm your email.
[00:19:02] Superbase will automatically send you an email to confirm your email.
[00:19:05] Let's click confirm.
[00:19:06] Boom.
[00:19:07] There we go.
[00:19:08] Now we can log in.
[00:19:09] I'm going to click sign in.
[00:19:10] It looks like we are getting an error.
[00:19:12] This is good.
[00:19:13] Now I can start showing you how to debug.
[00:19:16] So I'm just clicking sign in.
[00:19:18] It isn't doing anything.
[00:19:19] It isn't working.
[00:19:20] So here's how we start debugging things.
[00:19:23] Right.
[00:19:24] First thing you're going to want to do is check the console logs.
[00:19:27] So if you right click and hit inspect, it will pop open a bar on your right hand side if you're in chrome.
[00:19:33] Then you can click console and check to see if there are any errors in there.
[00:19:38] It doesn't look like we're getting any errors in here.
[00:19:40] The other place we can look is inside the network logs and the network logs are inside
[00:19:47] a visual studio code and looking at the network logs.
[00:19:51] This is going to be in your terminal where you ran npm run dev.
[00:19:54] These are going to be the logs you get in the communication from your front end to your back end.
[00:20:00] It doesn't look like there's any errors there as well.
[00:20:02] So we're getting zero errors despite this not working.
[00:20:05] So what this is telling me is this was just not set up the right way by cloud.
[00:20:09] So we can do this.
[00:20:10] Here's what we're going to do.
[00:20:11] We're going to say to Claude, okay, I connected to super bass and I created all the tables.
[00:20:20] I created my account.
[00:20:23] All right.
[00:20:24] And actually let's verify if we create the account.
[00:20:26] All right.
[00:20:27] I'm going to go back into super bass.
[00:20:28] I'm going I'm going to go back into super bass.
[00:20:31] I'm going to click on authentication.
[00:20:33] Let's see if we have a user here.
[00:20:34] Okay.
[00:20:35] Boom.
[00:20:36] There's the user.
[00:20:37] It's going to be a 27 a gmail.
[00:20:38] So the user is created.
[00:20:39] So this is just a front end issues.
[00:20:41] What that this is telling me because we're not getting any errors from the back end.
[00:20:44] So this is a front end issue.
[00:20:45] So let's go back here.
[00:20:47] Okay.
[00:20:48] I connected to super bass and as you go like you'll build the muscles to be like to start recognizing where these errors might be coming from.
[00:20:55] Right.
[00:20:56] You'll, you'll start to automatically check.
[00:20:57] Okay.
[00:20:58] Are there any errors in the console log and then you'll go.
[00:21:01] Okay.
[00:21:02] There are any errors in network log?
[00:21:03] No, there aren't.
[00:21:04] Okay.
[00:21:05] This must be a front end issue.
[00:21:06] Okay.
[00:21:07] I connected to super bass.
[00:21:08] I create all the tables.
[00:21:09] I create my account.
[00:21:10] All right.
[00:21:11] I see it in the authentication tab in super bass.
[00:21:15] But when I click login and type my credentials, nothing happens.
[00:21:21] I see no errors in any of my logs.
[00:21:26] Enter.
[00:21:27] And so we just told Claude exactly what happened.
[00:21:29] This is our senior developer.
[00:21:30] Right.
[00:21:31] It's like you're talking to developer.
[00:21:32] Hey, not working.
[00:21:33] Can you help me out here?
[00:21:34] It's going to investigate the login issue.
[00:21:36] Check the console for errors.
[00:21:38] It sees the issue.
[00:21:39] The handle login functions being called.
[00:21:41] But since there are no errors showing the issue is likely that the form submission isn't firing.
[00:21:46] Okay.
[00:21:47] So now it is writing a bunch of code to fix our issue, which is awesome.
[00:21:50] All right.
[00:21:51] It also says we need to restart the dev server and try again.
[00:21:53] So let's do that.
[00:21:54] Control C.
[00:21:55] So you hit control C on your keyboard to stop the operation in your console.
[00:22:00] And we're going to hit up on the number pad to do npm run dev again.
[00:22:04] Then I hit enter.
[00:22:06] Let's go back in here.
[00:22:08] Let's pop it open.
[00:22:09] Let's see what we got here.
[00:22:10] Let's try this again.
[00:22:11] Type in my password.
[00:22:12] I hit sign in loading a little bit longer than before.
[00:22:14] That's a good thing.
[00:22:15] And boom.
[00:22:16] We're logged in.
[00:22:17] There we go.
[00:22:18] Oh, let's see this.
[00:22:19] Let me put this back in the view there.
[00:22:20] You can see it.
[00:22:21] There's my email.
[00:22:22] I'm logged in new logout button.
[00:22:24] That's great.
[00:22:25] That's awesome.
[00:22:26] We're working here.
[00:22:27] All right.
[00:22:28] Let's do this.
[00:22:29] We got new new chat here.
[00:22:31] So create a new chat and let's say, hey, are you there?
[00:22:36] Hit send.
[00:22:38] Let's see what happens here.
[00:22:39] Let me make sure this still works.
[00:22:40] Yes, I'm here.
[00:22:41] Can I assist you today?
[00:22:42] All right.
[00:22:43] Now let's check our database.
[00:22:44] If I come in here, we go to table editor messages.
[00:22:47] Boom.
[00:22:48] There's our two messages.
[00:22:49] The one from me, the user, the one from the assistance.
[00:22:52] Let's say to the database is our conversation there.
[00:22:55] Boom.
[00:22:56] There it is.
[00:22:57] Title new chat created at updated at.
[00:22:59] You created your first database.
[00:23:02] That's amazing.
[00:23:03] It works.
[00:23:04] You can log in.
[00:23:05] The user is in the auth table.
[00:23:07] You send messages.
[00:23:08] You create conversations.
[00:23:09] They automatically go into the proper tables.
[00:23:13] If this is your first time building an app that has a database, this was a very good
[00:23:19] feeling the first time I used super based and it actually worked and data started flowing.
[00:23:23] I actually went, yes, and started clapping.
[00:23:25] I was so pumped.
[00:23:26] You did it too.
[00:23:27] You just did something that 99% of people on Planet Earth have never done their life,
[00:23:31] which is create an actual working app with a database.
[00:23:35] That is amazing.
[00:23:36] In the next sections, we are going to start getting dirty here.
[00:23:41] We're going to start adding in a bunch of features.
[00:23:43] We're going to add it all on top.
[00:23:44] We're going to make this app really, really special.
[00:23:46] Add a ton to it.
[00:23:47] Then eventually we'll get to pricing and payments and all that.
[00:23:51] And that'll be a lot of fun too.
[00:23:52] But let's dig in here.
[00:23:53] Let's start adding features.
[00:23:55] We'll walk through advanced prompting techniques.
[00:23:57] We'll walk through debugging, although we just did some debugging here.
[00:24:00] We'll do a lot of really cool things.
[00:24:02] Can't wait to get into it.
[00:24:03] You see in the next module.