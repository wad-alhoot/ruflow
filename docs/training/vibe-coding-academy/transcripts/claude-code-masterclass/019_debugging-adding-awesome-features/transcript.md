[00:00:00] Okay, so in this module, we're going to do some more debugging. Very important. We go over that,
[00:00:04] you're going to run into a lot of bugs and errors as you build out your app. We're going to go over
[00:00:07] the debugging, we're going to finish our main feature here, which is kind of the prompt racing,
[00:00:12] we're going to get a whole bunch of API's plugin from the different AI providers. It's going to be
[00:00:16] really cool. So where we left off was we have errors. So we built out the prompt racing
[00:00:22] functionality, where you can choose multiple models. We put in the new migration to the database,
[00:00:28] we got some errors. Let's copy these errors. So we can just highlight it command C back in here,
[00:00:34] got these errors when I ran the app. And actually, let's just validate real quick, I'm going to
[00:00:41] control C, npm run dev again, reset that and just make sure here when we reset that if this works
[00:00:48] or not, right, so we come in here, we're in our new chat, I'll go, are you there? Do race, choose
[00:00:56] two of the models, start race, yep, we got that same error. Okay, cool. We'll paste it. I got these
[00:01:03] errors when I ran the app and I paste in the errors and I hit enter, actually, I'm going to add
[00:01:08] them one more note, just as a side note, a lot of the models listed are out of date in the list.
[00:01:20] Let me know if that's the issue. I'm going to hit enter on that. All right, so we any time you debug
[00:01:26] copy paste the bug in, give it any information you have around the the issue. Okay, so once to
[00:01:33] install the open AI and PM package, that's fine. Let's do that. I will hit yes on that. The app should
[00:01:38] now build and run correctly, the models are now update with open eyes current offerings as of
[00:01:42] January 2025. I'm filming this in November 2025. So it is a little out of date here.
[00:01:51] Let's just see how this works. And then we're going to give it a link to documentation. Clearly,
[00:01:55] it needs a link to documentation. Are you there? Race, let's just choose four oh and four oh, many
[00:02:01] start race. Let's see what happens. All right, well, we just not, at least we're not getting the
[00:02:05] error anymore. Let's just see what happens when it runs. I'm going to hit inspect. I'm going to pull
[00:02:09] the console just to see what we get here. Fail to load resource. The server response has a 500. So
[00:02:16] that is going to be an error that will probably break this entire thing, which I'm very confident
[00:02:20] is going to be the fact that I don't think either of these models exist in the documentation anymore.
[00:02:28] I don't think you can use these models anymore because those are very old. So I'm going to go to
[00:02:31] the docs. Let's see here. Let's pull up in the docs. Models 515, mini and five nano. Yeah, there's
[00:02:39] nothing about the older models there. I don't think you could use those anymore. So actually,
[00:02:44] let's do a view all let's see what we got here. Actually, it looks like Oh, three, oh, one, four,
[00:02:49] Oh, it looks like three, three, three, five turbo. Can you actually still use this? I doubt they had
[00:02:55] have deprecated this. It doesn't matter. We're going to update this anyway with just the latest
[00:02:59] model. So I'm going to screenshot this. I'm going to say getting a 500 error in the race API. I think
[00:03:09] it's because the models you're using are out of date. These are the three latest models in the
[00:03:19] screenshot attached paste, put that in. Now I'm also going to paste in the documentation. So I'm going to
[00:03:28] say, please read the documentation on those three models. And I'm going to literally type out 51 paste
[00:03:39] and type in five mini paste. And then I'm going to type in the final one, which is five nano, five
[00:03:46] nano paste. So it will be able to I hope read through those three pieces of documentation to figure
[00:03:53] out how to get it implemented. And then I'm going to hit enter on that. And it should go through and
[00:04:00] figure out how to implement that. All right, so it looks like it updated the three models here.
[00:04:06] And this is good. We're getting errors because we can now go through the process of debugging,
[00:04:12] which is always fun. It's also very important. It's important we go through that. All right,
[00:04:16] let's try this again. Are you there? Let's do race. Let's choose these three. Let's choose this to
[00:04:23] to here, start race. I'm going to inspect to see if we are getting, yeah, we got the same error. So
[00:04:30] let's do this another place you're going to want to look when you get errors is going to be the
[00:04:34] terminal. So these are your network logs right here. Right. So everything you see in your terminal
[00:04:39] is your network logs. And then everything you see when you right click on your browser and do inspect,
[00:04:48] this is going to be your browser logs. And so these are going to be errors you're getting on the
[00:04:54] front end in the browser log. And then the network logs, those are errors you're getting in the
[00:04:59] back end. And these are like in your API or through the network, right. So errors can happen in either
[00:05:07] place. So when you're running into errors, you want to look both in your network logs, which is going
[00:05:11] to be in your terminal, wherever you ran npm run dev. And you also want to look in your browser,
[00:05:17] which is going to be your browser logs, when you do right click inspect in your browser. So you get
[00:05:22] an error in the browser logs, but you get a more detailed error here in the network logs. So let's
[00:05:28] do this, let's copy all that, we'll say still getting errors, and I'll paste all that in and hit
[00:05:34] enter. And we'll see what we get here. I need to check how the super based server client is setting
[00:05:38] up your project. Okay, so it might be a backend issue with our database. Let's see what happens
[00:05:43] here. Perfect. The import error is now fixed. The function is now exports create client. Okay,
[00:05:48] so it might have been connecting wrong to our database. So let's just control see anything you
[00:05:54] want to do a fresh reset, just do control see on Mac inside your terminal npm run dev,
[00:05:59] you just hit up on your keyboard to find the last command, I'm going to hit refresh on here. So we
[00:06:05] can start this over. All right, let's just see this source are you there, and do race, and then
[00:06:12] choose the two latest models start race. Let's see if we have any errors. Oh, it worked.
[00:06:18] We got it working, we got it working. That's sick. Okay, so let's just see what happens when
[00:06:26] I do okay, so it doesn't when you do it here, it doesn't it doesn't in like a modal, a modal
[00:06:32] for those who knows like a pop up window, it doesn't actually do it here. So let's I want it in like
[00:06:37] the chat box, but I want it like split down the middle. So let's do this, we're going to say great
[00:06:42] that worked. One thing though, one thing though, it does the race in a modal. I want it actually in
[00:06:52] the regular chat window. I want to be able to send follow up messages to each chat. It should be like
[00:07:03] a normal chat, but it just is split down the middle with two models. We might need to change
[00:07:14] the database for this and I'm going to hit enter. So basically, talking to it like it's just a normal
[00:07:19] human being. Hey, this is what it did. This is what I'd like. We may need to make database changes
[00:07:25] for this. I hit enter and it is going to start cooking and get that change for us. Any tweaks you
[00:07:30] want to make any changes you want to make, you just tell the AI and it gets to it and starts building
[00:07:33] it out for you. So it creates the to do list update database schema to support the dual model
[00:07:38] conversations, modify conversation model to track race mode and selected models, update the chat
[00:07:44] UI, modify the message handling and update message display. Glorious. Now it's going through and
[00:07:49] writing that code for us. So it's cool. It finds errors as it goes. Now I need to add the error
[00:07:55] and closing this normal mode section. So it's like it tests itself as it goes, finds errors,
[00:08:00] fixes them. That's why I really love this tool. Very fun tool to use. Um, fixing the UI,
[00:08:06] updating its own to do list looks like it finished its own to do list. All right, looks like the
[00:08:10] redesign is changed database updates. So we have to do a database update here. So we'll go into our
[00:08:16] new migration under our super base migrations folder. I will control. I will come in and see that
[00:08:22] I will go to super base.com. I will go to our dashboard to get into our new database prompt
[00:08:29] racer sequel. Let's run the migration hit run there. I imagine what's happening is they want to
[00:08:37] track the race modes and what models are in the race modes, things like that to support that.
[00:08:42] All right, we'll go back. Let's control see, run this again, go back into our app. Let's refresh.
[00:08:50] I'm going to refresh this. Um, and let's do this. Hey, are you there? Let's do race. I'll be very
[00:08:58] impressive. This works in one shots, be quite honest. This is a pretty complex ask we're doing here.
[00:09:03] Split's down the middle. That's nice. Okay, so that is working. Let's see if we get a response.
[00:09:10] Best. Okay, maybe I have to hit send from here. Yes, I had to hit send from there. Uh, saved a lot.
[00:09:16] Oh, yes, I'm here. Wow. In one shot at that's amazing. That's really cool. That's sick. That's
[00:09:22] really, really, really, really, really cool. I'm actually really impressed. Um, I mean, it's just,
[00:09:27] I don't want to come off as corny or anything like that, but I feel very, very blessed, uh, to live in a
[00:09:34] time with a technology like this where you can just think of things and then it appears in front of
[00:09:39] you. You type a few words and then it just appears in front of you. It really is a blessing. And I'm
[00:09:44] very grateful for you taking this journey with me. Um, let's go in. Let's just check our status and
[00:09:48] our project manager here. Send one prompt to multiple models. I think we can consider that done.
[00:09:54] Let's test actually. Let's test one thing real quick. Um, I wonder, uh, what day of the week is it?
[00:10:01] Just to see if the conversation continues. I'm almost curious how they answer this today is
[00:10:06] Thursday. It's not Thursday. Um, it's interesting how five one seems to be consistently faster than
[00:10:13] five, but whatever Thursday, it's Thursday, November 20th. Maybe it's doing it and you, it's probably
[00:10:18] thinks it's UTC because it is Wednesday right now, but it is late at night on the Pacific coast.
[00:10:24] So it's probably thinks it's UTC. So, uh, maybe it actually is accurate. Okay. So that looks nice.
[00:10:29] That works. I'm curious. Let's just check out the database real quick to see what that looks like.
[00:10:33] Um, prompt races. Hey, are you there? Okay. So it does it stores it in a separate table.
[00:10:39] Has the messages there? Does it, what has it a store, a conversation ID? Let's see. I guess messages
[00:10:46] maybe. Hey, are you there? Race responses. Okay. So it stores the user messages and the race responses
[00:10:52] in two separate tables and the race responses are here with the models you're using. Okay.
[00:10:57] Let's keep working on this though. I like where we're at. This is really fun. Uh, this is where it gets
[00:11:01] fun and creative and you can start doing cool things. I want some stats. So I want next to each message,
[00:11:08] how long it took for me to get that message. And then I want a number up top with how long it's
[00:11:14] took total thinking about its messages. I think that'd be cool. So we can see that compare the
[00:11:20] the total speeds. Excellent. That works great. I always let it know when it did a good job
[00:11:25] and when it would build something well, only because I'm sure they're training the models.
[00:11:29] And when you say things like that was great, that worked, it'll reinforce into the model. Okay.
[00:11:34] We did the right thing. We looked at that the right way. So excellent. That worked great.
[00:11:37] I now like to add stats to each message we get from the model. Things like how long it took and
[00:11:49] how much the message cost is this possible? Can we have like a running number that goes up
[00:11:59] until we get the message? Like I would be cool when we send a message. If like a number started
[00:12:06] going as it was loading and when we finally get the message, it stops and you can see how long it
[00:12:09] took. So let's do this. Let's for this one, I'm going to go into plan mode just because I want a
[00:12:14] little bit more detail on how this is going to work. And I'm going to hit enter. So shift tab,
[00:12:18] go into plan mode and I'm going to hit and enter. We're going to see how this goes. All right. So
[00:12:21] they're doing some searching. I guess I got a search GPT five pricing. Okay. So looking for
[00:12:25] pricing so I can figure out the pricing each model. Let's see how that goes. Doing more web searches,
[00:12:31] token counting. All right. Let's see how that goes. All right. Let's check out this plan here.
[00:12:35] I'm going to zoom out a little bit just so I can see what the text is. Let's just see this real quick.
[00:12:42] Add live statistics. Each AI response showing a lapse time and estimated cost.
[00:12:46] Install token counting library. So it's going to have a library that counts the tokens. Update the
[00:12:52] database schema, update the backend, APLXC completion time, prompt tokens, completion tokens,
[00:12:57] total tokens, estimated cost. That's cool. Update the API, create pricing configurations and update
[00:13:03] the front end message display. Okay. User experience number count up in real time as response streams,
[00:13:09] smooth transitions from estimated actual value, state persistent database and show on conversation
[00:13:13] reload. Each model race mode shows its own stat side by side. I like it. Let's yes and auto
[00:13:18] accept those zoom back in so you can see what I'm looking at here. So it looks like a good plan.
[00:13:21] I think this is going to be cool. We'll be able to see with every prompt we send, how long it takes,
[00:13:26] how much it's going to cost, and we can really get a cool side by side comparison. All right. Real
[00:13:31] time stats implementation complete. We have another migration we need to run here. So let's go to our new
[00:13:37] file right here under super base migrations going to control a that going to prompt, race or database,
[00:13:44] going to the SQL editor, select all paste, run success, no rows return perfect, pricing. And just
[00:13:51] as a side note, the reason why it says success, no rows returned is the command we did didn't
[00:13:57] ask for any information back, right? It added a bunch of new columns, added a bunch of new data,
[00:14:03] but it didn't ask for anything in return. Sometimes when you do SQL queries, you say,
[00:14:07] hey, show me all the rows that are like this or all the tables that are like this. And then it
[00:14:10] returns rows. The reason why it says success, no rows return success, it ran the operation
[00:14:15] without any errors, no rows returned, you didn't ask for any rows information back. So no rows
[00:14:20] returned. So that's good. You like success, no rows return, unless you're querying data, but we
[00:14:25] haven't done that so far. All right, so we ran that pricing configuration complete pricing data
[00:14:29] for the models. Okay, so I guess it added pricing data for the models inside the database,
[00:14:35] if this gets confusing and it is hard to maintain, I might remove the pricing part of this. But I
[00:14:39] think the timing part's important. I think that should be easy to do. Back end updates,
[00:14:44] front end features, how it works. All right, I say we give it a test, huh? Let's control C,
[00:14:50] NPM run dev. We'll go back into local host. Let's get this party started. It is loading up.
[00:14:57] All right, so we are in here, no messages yet. Let's do this. Who won the Super Bowl in 2019?
[00:15:07] Enter. Okay, so the timer is running on both. That's cool. Oh, wow, it showed the tokens and it showed
[00:15:12] the cost. And over here, time tokens cost, that is sick. It worked. I like that. That's really cool.
[00:15:20] That's amazing. I think that's really cool, actually. That's really, really cool. So let's do
[00:15:24] this. Let's look at our project management tool again. And let's see where we're at. For the comparison
[00:15:29] features, display stats like cost and total time. Well, I should have had that in progress. But that
[00:15:34] is done now. API cost estimation. We also did that one too. All right, I like it. We have two more
[00:15:39] features we're going to implement. And then we're going to start implementing pricing with Stripe.
[00:15:44] Then we're going to build out the landing page or the marketing landing page. And we'll get into
[00:15:48] all the marketing and fun stuff around that around getting your first customer. So we're coming to
[00:15:53] the ladder portions of building out our app. Then we're going to do all the fun stuff like pricing
[00:15:58] and marketing and a lot more to go. So I will see you in the next section where we are going to
[00:16:04] wrap up these two last features here.