[00:00:00] Awesome. So our code is on GitHub. We are ready to get the party started here. We have our database
[00:00:06] set up. We have auth set up. We basically have all the important pillars of the app set up. So now
[00:00:13] we can start having some fun, having some fun, getting creative, trying new things, experimenting,
[00:00:19] and just building out this is the creative part. This is where you become an artist.
[00:00:23] And you start the vibe code of vibe coding comes in. So let's do this. Let's check out our project
[00:00:31] management app to see where we are with functionality. I'll pull this over here. We finished auth. We
[00:00:38] finished the database. Let's do the prompt optimizer. Let's pull that in. So in progress prompt optimizer.
[00:00:44] Let's build this out. Here's another thing when it comes to cloud code. So context is important.
[00:00:52] Context is basically all the information that gets sent to the AI model when you make prompts.
[00:01:00] So for instance, if I was to say something like build me out the prompt optimizer right now,
[00:01:06] it would also send the entire chat history. So it would send everything we've done in this chat up
[00:01:11] to this point with the prompt. And there's only so much context the AI model can handle
[00:01:17] when you send a message. And so one thing you notice right here is the amount of context
[00:01:23] that is being used right now in our messages. So right now, 46% of context remaining until auto
[00:01:29] compact. So every message you send everything you have cloud do, it uses up more context. And then
[00:01:35] once the context is full, it kind of simplifies your context where it deletes a lot of the details and
[00:01:40] just has like a high level explanation. So a couple of things you can do here. Whenever I am working
[00:01:47] on something new, a brand new feature that's not really related to other things we built out so far.
[00:01:52] So for instance, this prompt optimizer, it's not really related to the database. It's not really
[00:01:58] like interconnected with everything else. So there's a couple of things you can do. You can do slash
[00:02:06] clear. So when you do slash, these are your slash commands, and you get a whole bunch of different
[00:02:11] commands you can do automatically here. Slash clear clears out all your context. So it'll clear
[00:02:18] the conversation. You want to use this when appropriate. I mean, you have a couple different
[00:02:23] things you can do. You can do slash clear. Sometimes what I'll do is I will just do a new chat. So if
[00:02:29] you click the plus, this new chat is clear context, right? So if I ever want to go back, I can do that
[00:02:36] and continue the chat. There probably is no reason I'd want to go back to this chat. There's no like,
[00:02:41] I think our strand of work we've been doing here is pretty finished. Right, we uploaded a
[00:02:46] GitHub and we got the database app. I don't see any reason why we want to go back and make changes
[00:02:50] to uploading a GitHub. So we could be safe here. If we were working on a feature and we came up with
[00:02:56] a new idea for a feature and like we weren't finished this one yet, we would probably want to start a
[00:03:01] new chat so we can come back to this and finish that functionality at a later point. But we're
[00:03:07] pretty much done here. We set up the database. We set up GitHub. So there really is no reason to
[00:03:14] come back to this. So I'm just going to clear it. I'm going to clear the conversation. Boom,
[00:03:17] it's basically like a brand new chat right now for this. So let's start working on our feature. So
[00:03:24] we're going to do the prompt optimizer. Let's do this. Let's say, let's go into a plan mode first.
[00:03:32] So this is a brand new feature. It's not like a simple little change. We're like, we're adding
[00:03:36] pretty good functionality here. So let's do this. Go to plan mode. So shift tab twice. Now you can
[00:03:40] see plan mode right here. And let's say I want to build a prompt optimizer. Anytime I have a prompt
[00:03:49] in the chat before I hit send, I want the option to optimize the prompt. There should be a button.
[00:04:00] I can click on that does this. It should take the prompt and send it to AI to optimize
[00:04:09] to make it way better. So a couple of things to note here as we start to get into, you know,
[00:04:14] advanced prompting here with Claude code. Everyone has a different opinion on prompting techniques,
[00:04:19] this and that. I don't like to over complicate things here. Right. If you don't have a full
[00:04:28] picture into exactly what you want to build out, like we don't have a full picture now. We know we
[00:04:34] want a prompt optimizer. We don't know exactly how the AI is going to optimize the prompt. But we know
[00:04:39] we want the capability for the AI to optimize the prompt. So I just go into plan mode. And when
[00:04:44] you're in plan mode, you don't need to be like sending super specific prompts with advanced prompt
[00:04:49] engineering techniques. Just describe in detail exactly what it is you want to build. And you also
[00:04:57] want to keep it minimal in scope. This is something else that's important as well. And what I mean
[00:05:01] by that is like, keep it to one building block. You don't want to go in here and say, hey, build up
[00:05:06] a prompt optimizer and a model compare and this and that and give it like 10 things to build
[00:05:11] out at once. You don't want to do that. When prompting Claude code, you don't have to use advanced
[00:05:17] prompting techniques. But what you really want to do is you want to just keep it simple. Be
[00:05:21] specific about what you want. And if you don't know everything involved exactly how it works
[00:05:27] step by step, just go into plan mode and Claude, if necessary, will ask you questions on what you
[00:05:32] want. And you can answer the questions and we'll build it out. If you're not, if you don't know
[00:05:37] the details, you can be honest to hey, I don't really know. Can you give me recommendations around
[00:05:41] that? Right. So for instance, for this we can do, I don't know how I want the AI to optimize it.
[00:05:51] I'm going to lean on you for that. Right again, we're just talking to it like it's a human being.
[00:05:58] That's it. You don't need to talk to it like it's a robot or something crazy. You don't need to use
[00:06:01] advanced prompt engineering techniques. Just talk to it like it's a human being. Be honest about
[00:06:06] what you do or don't know. Be honest about where you need help. Right. If you were installing that
[00:06:11] database and you weren't going along with me in this course, you would probably want to go in there
[00:06:17] and say, Hey, by the way, this is my first database I've ever built out in my life. I've never used
[00:06:22] super base before. So please be super specific on each step for someone who's brand new to this stuff
[00:06:28] on how to set this up. Right. So be honest, include as much detail as you can. Don't be afraid to say,
[00:06:34] Hey, I'm leaning on you for this because I don't really know what we're supposed to be doing here.
[00:06:39] And that's really all the prompting techniques you need. But I'm going to be building out a lot
[00:06:43] more from here. So you'll be able to see new things I do when it comes to prompting from there. But
[00:06:47] let's hit answer on this on plan mode and see what Claude comes up with for this feature. Again,
[00:06:53] it's just like a coworker. Right. Hey, here's what I want. The coworker comes up with some ideas
[00:06:58] ago. I actually like that idea. Go ahead with that. You move a lot faster, you'll get a lot more done.
[00:07:02] So it's going in there. It's searching for context. And basically what it's doing is it's looking at
[00:07:07] all the other code in the app just to see how our app works. Since we have fresh new context here,
[00:07:11] it doesn't have context around how the app works or anything. So it's basically going through and
[00:07:16] searching for through all our code for how it works, how the app is set up, things like that.
[00:07:21] Once it has that context set, it's going to start building a plan for this prompt optimizer
[00:07:26] feature. And then it is going to run that through us to see what we think. While it does that,
[00:07:31] let us do this. I think this could be a fun idea. Let's go back into our co-pilot. Let's just check
[00:07:36] the rest of the recommendations. I'll move this over here so you can track what Claude's doing
[00:07:41] while we read this. Run history and filters list of past races with sortable columns, date models,
[00:07:46] latency, cost, winner. Oh, that's interesting. So if we do the prompt racer where it does multiple
[00:07:52] models for one prompt, maybe we can mark a winner. I actually like that idea a lot. We can mark a
[00:07:57] winner and then maybe we have a stat section of the app where it shows the stats around which
[00:08:04] models we've given the win the most to. And this is the brilliant part about having the co-pilot.
[00:08:10] And I just saw an ad on Twitter for a new IDE called brain rot ID where they actually
[00:08:17] give you video games to play while the AI is good. That's so stupid. You want to be doing
[00:08:21] productive things. We just came up with a new idea. Let's go back into our project management
[00:08:25] app. And this is exactly how I built creator body by the way. I just started building. And
[00:08:30] then I chow out the AI and we come up with new ideas as we go. Be able to mark a response slash
[00:08:38] model as a winner when comparing outputs, then be able to see stats around which models are
[00:08:49] winning. I like that. We'll move that down the list because it has to come in after the prompt
[00:08:55] racing section. Okay, cool. I like that. All right, let's see. All right, we got our plan ready.
[00:08:59] So it built it built out the plan while it was building out the plan, we were being productive
[00:09:03] and finding out and figuring out new features. Prompt Optimizer plan. Add an optimize button next
[00:09:08] to the send button that uses AI to enhance the user prompts before sending to the chat.
[00:09:12] Okay, so it's going to use the open AI API with a specialized system prompt that makes prompts
[00:09:17] clear more specific as well than context constraints improves the structure, removes ambiguity and
[00:09:23] vaguity and vagueness and maintains the user's original intent. Use GPT 4.0. So I mean,
[00:09:29] clog just a little behind. If you're watching this at the time of me filming,
[00:09:33] 4.0 is not the latest model. The latest model is 5. So we're just going to have it afterwards.
[00:09:39] We're going to say use GPT 5. We're going to have an implement that then we'll add it, have it a
[00:09:43] do GPT 5 after. It's got the UI components of the optimize button. It's going to update the message
[00:09:49] flow when optimized click disable inputs buttons. Call the new API route again, API. It is going to
[00:09:55] be our backend where it will reach out to open AI, say, hey, here's a prompt. Can you please optimize
[00:10:00] for it for us and then bring it back to our front end. User chooses version to send.
[00:10:06] Send chosen version through. Okay, interesting. I didn't think of that.
[00:10:10] Actually giving the user options of which one to send. I like that optimization prompt strategy.
[00:10:15] The AI will optimize prompts using these principles. Clarity structure context completeness.
[00:10:19] How's it going to figure out context? Add relevant constraints and requirements. Okay,
[00:10:24] styling, use existing talent for consistency, optimize the button, purple, indigo accent color.
[00:10:30] I don't know why the AI always goes purple, but whatever. Well, we can change it after.
[00:10:34] Model clean white background, subtle shadow, green for addition, subtle grade background. All right,
[00:10:40] this looks good. I'm going to hit yes and auto accept. And Claude is going to get to work on
[00:10:44] building our feature for us. It updates the to do's like we asked it to do in the
[00:10:49] Claude rules file. So create the optimization endpoint, add the UI component to chat and then
[00:10:55] test the feature out end to end. So it's building that out. And is writing all the code, you can see
[00:11:00] it generating right here, which is amazing. And then once it's done, we will test out this function and
[00:11:05] move on a new feature. So while that's going, you know, we were going, you know, we're going
[00:11:09] right back at it. You're not going on a Twitter, you're not going on tickety talk,
[00:11:14] you ain't going on Instagram. We're going right back to our copilot here and seeing other things
[00:11:21] it has. What not to build yet? Folders, complexity, val harnesses, payments. Yeah, we're leaving
[00:11:27] that all to the end. Okay, so let's do this. A lot of the time when doing this, like it doesn't always
[00:11:34] have to be you can be very free form with how you use this AI copilot. It doesn't always have to be
[00:11:42] what should we build next? What should we build next? What should we build next? You can just kind
[00:11:46] of be broad and nonspecific sometimes and see where the conversation goes. I like the idea of the prompt
[00:11:54] optimizer functionality. I just gave it to Claude to build out. This should be awesome. And I'm going
[00:12:05] to hit enter. I don't even have an ask for it. I just want to see where this conversation goes,
[00:12:10] right? When you're on a good date, you don't always have to keep asking questions like an interview.
[00:12:15] Sometimes on the date, the conversation just flows. You don't think about it. You say things,
[00:12:19] they say things. And it's just a really good conversation. That's what we're doing with chat
[00:12:23] GPT right now. We're just having good conversation. Hey, working on it. This should be cool. Let's see
[00:12:27] what GPT says. Maybe we can bounce off of it. Good call. The optimizer just one feature that
[00:12:31] actually feel magical. If we do it right, here's exactly what V zero should be and how we'll judge
[00:12:36] so it's giving us recommendations around the function that we're optimizing. But we don't need
[00:12:42] to use all this. We can read about what its opinion is on what the prompt optimizer should be. And
[00:12:49] listen, if maybe we find something interesting in here, we can then give to Claude code. We have two
[00:12:53] AIs working for us now. Looks like Claude finished. Let's see what we got here. Perfect. Your prompt
[00:12:58] optimizer feature is now complete and built successfully. Here's what I've implemented. An optimized
[00:13:02] button prompt optimization API comparison model in a smart integration. Shall we test this? Let's
[00:13:09] test it. Let's see how this goes. So I'm going to pull open local host window here. By the way,
[00:13:14] as I do this, sometimes depending on your changes, you will have to stop your development server and
[00:13:21] restart it again to get them to work. Sometimes you won't. If they are simple UI changes, you
[00:13:27] probably won't have to restart your server. If they are more complex changes, I'd consider this
[00:13:32] complex because there is a new backend component, a new API. You're going to want to restart your
[00:13:38] server. So just as a reminder, again, all I have to do is go to your terminal where the server is
[00:13:42] running. It's running here. You just hit ctrl C if you're on Mac. If you're on Windows, I would
[00:13:48] Google risk real quick or ask the AI, hey, how do I stop a terminal process on Windows? Excuse me.
[00:13:55] And you do that and you're good to go. And so you restart npm run dev starts the server again.
[00:14:00] And here we go. Boom. Optimize right there. Okay. Let's test out optimize here. Let's think of a
[00:14:06] prompt we can optimize. I'm building out a advanced chat bot app where you can do things like optimize,
[00:14:18] optimize prompts, save prompts to a history, and even send one prompt to multiple models to compare.
[00:14:30] And so for the record here, I don't like the way this UI looks, right? It should be, it should be
[00:14:35] making it so it's multiple lines when it goes to one line, and then you can scroll. So I'm going to,
[00:14:41] we're going to fix this right after this is good. I'm going to show you how to you can kind of spot
[00:14:44] little things like this and fix it. But anyway, don't want to get distracted here and even send one
[00:14:48] prompt to multiple models to compare what other features should we add. And before hitting send to
[00:14:55] the AI, let's click optimize and see what happens here. Optimizing the little electric bolt spinning,
[00:15:01] I like that. Let's see what the AI comes back with here. And let's test this function. Oh, look at this.
[00:15:07] Prompt optimization. So here's the original, here's the original promptly put. Here's the optimize
[00:15:12] prompts. This is what the AI optimize user authentication profiles allow users to create accounts
[00:15:17] and personalize their experience. Oh, it's okay. So it is not optimizing it. It basically sent the
[00:15:26] prompt to the AI and just putting the response in the optimize section. So it's not working. Well,
[00:15:32] it is working. It's just not doing what we wanted to do. So let's do this. Let's screenshot this. And
[00:15:38] this is going to happen. Sometimes cloud is going to build out features of functionality. It's not
[00:15:41] going to do exactly what you want to do. And that's fine. Let's fix it. Right. So for those who kind of
[00:15:47] not didn't follow what just happened here, the optimize section is just the response to our
[00:15:52] prompt. It's not actually the optimized prompt. So clearly, somewhere along the way, the system
[00:15:58] prompt that Claude wrote is not good, because it's not actually optimizing the prompt, just
[00:16:03] getting a response back. So let's do this, go back. I screenshot it. So I screenshot it what I see.
[00:16:08] Whenever you get errors, bugs, things don't work as expected. screenshot it, paste it in. And I'm
[00:16:14] going to say looks like the optimized prompt section is just a response to my prompt and not an optimized
[00:16:27] prompt. For instance, I asked what features I should add to my app and the optimized prompt
[00:16:38] section is just the response to that question. Right. So I'm just describing exactly what we saw.
[00:16:43] I put in a screenshot so the AI knows what we're talking about. And I'm going to hit enter. And
[00:16:48] it's going to get to work fixing it bad, Claude, naughty Claude. You're absolutely right. That's
[00:16:53] a bug in the optimization logic. Let's see what we got here. The issues that the system prompt
[00:16:57] isn't properly constraining the AI to return only the optimized prompt. Instead, it's treating
[00:17:02] the user input as a normal chat question answering. Let me fix the API endpoint to ensure it actually
[00:17:06] optimizes the prompt. So it's got to fix its system prompt to fix this. Actually, I think the real
[00:17:12] issues deeper the system prompt alone might not be strong. Let me adjust the temperature and add
[00:17:16] more explicit formatting instructions. I think what might be happening here is we might be using
[00:17:22] an older version of four Oh, which is giving us really stupid responses. We might need to ask
[00:17:28] it to update to five. So let's do this. How about we try updating to chat GPT five API. You seem to
[00:17:38] be using an old version of chat GPT, which might be stupid. Please look up the latest version of
[00:17:50] the chat GPT five API hit enter on that. So it is now going to search the web web search for latest
[00:17:58] chat GPT 2025 GPT five open AI. And I'm going to hit yes. And that is going to search the web. It's
[00:18:04] going to do a little research for us to figure out what the latest API version is for GPT five.
[00:18:11] And it's going to implement it for us. And then hopefully it'll work. Great GPT five is now
[00:18:15] available. Let me update your code. Yep, it's updating the GPT five boom. That's good. It's
[00:18:21] updating it all across the board. And every API route that's very good as well. And now it is
[00:18:27] explaining the updates made and why GPT five is better for your use case. You don't need to tell me
[00:18:31] twice why GPT five is better for the use case. Let is let's restart the server. Let's refresh
[00:18:38] local hosts. Let's go in here and loads our chat from the database. I should have just copied
[00:18:44] the master have for I want to build an advanced chatbot at what are some cool features we can add.
[00:18:54] All right, we're just testing out optimize. Let's hit optimize here. Let's see what we get.
[00:18:58] Error failed to optimize prompt. That's fine. Let's keep cooking. Let's keep figuring out. So first
[00:19:03] thing we're going to do is hit inspect. We are going to go to the console. We are going to see what
[00:19:08] the error was. Okay, we got our failed to load resource. The server responded status 400 bad
[00:19:12] request. If I'm and I'm going to guess what it is. If you're newer to this, you probably won't be able
[00:19:18] to guess which is totally fine. I've just do this a lot so I can figure out what it is. My guess is
[00:19:24] it is not talking to the GPT five API. The correct way that as intended talking to GPT four oh you
[00:19:32] probably have to talk to it differently than five so probably needs to look at the documentation a
[00:19:35] little bit more to see the right way to call the API. So I'm going to say this. I clicked optimize
[00:19:42] and got an error. I'm going to paste in the error. And then I see there's an error down here too in
[00:19:47] the network log. I'm just going to copy that and paste that into give them more context and hit enter.
[00:19:52] See what it comes. It looks like GPT five might not be available yet or there's an issue with the model
[00:19:55] name. Let me check what's happening if and fall back to a model that's definitely available.
[00:20:00] So I want to say no to that. I'm going to say GPT five is 100% available. Make it work. And we're
[00:20:08] going to do this. We're going to give it a little help. I'm going to search for chat GPT five API
[00:20:14] docs in here. And I'm going to say oh look there it is right there. Let's click that. Let's take this
[00:20:20] copy and let's give it the address from the docs and hit enter. And it'll look in that website and
[00:20:27] find the docs. Can it fetch this URL? Yes and enter and it is going to go to work and figure out
[00:20:33] how the heck to use these docs. Now let me rebuilding and try again the server log show us
[00:20:37] that the actual error is good. Now try clicking optimize game when you get this error. Can you
[00:20:41] check the browser console and tell me what error message it returns. Okay, so we're doing a little
[00:20:45] debugging now. We're doing a little debugging. Let's reset the servers. NPM run dev. Let's see
[00:20:52] let's see this. I'm going to pull back open prompt racer. We're going to copy this. I don't have to
[00:20:58] type it out again. I'm going to refresh paste it in. Let's hit optimize and let's inspect. Oh there it
[00:21:04] is. Unsupported value temperature does not okay there. Boom. You can't adjust the temperature
[00:21:09] with this model. So now we got the error here is the error I got and I pasted it in and now
[00:21:16] Claude should be able to fix this relatively easy. So let's a little bit of debugging. I'm glad
[00:21:20] we're running into a bug here. I'm glad we're running the bug here. I'm going to show you how to debug.
[00:21:24] Basically what debugging comes down to is just finding errors, copying and pasting the
[00:21:29] clock and describing what you saw and then Claude goes around and either debug it like it just did
[00:21:34] which was it didn't solve the error. It just added more logging so we get more specific errors.
[00:21:39] And then once we have the more specific error we can just feed it back into Claude and then
[00:21:43] it fixes it for us. Perfect. The build succeeded. I removed the temperature. Let's reset this and then
[00:21:49] let's pull this open. Let's make sure we got this copied again, refresh, paste that in, optimize,
[00:21:56] me, baby. Let's see what we got here. I think this one's going to be better. I think we're going to get
[00:22:01] better results this time. I'm feeling it and boom. Okay. Here we go. So the original prompt was I
[00:22:07] want to build an advanced chat bot app. What are some cool cool features we can add? The optimized
[00:22:12] prompt. Let's see how this goes. Act as a product strategist and AI architect. I'm building advanced
[00:22:17] cross platform chat bot app and need a prioritized set of innovative feasible features,
[00:22:22] context and assumptions, target users, knowledge worker students in SMB teams, primary use cases,
[00:22:27] research, writing task automation, customer support and knowledge retrieval. This is amazing.
[00:22:32] Team three engineers, one designer, one PM, but unconscious. Look at all this. This is amazing.
[00:22:37] If you need additional assumptions, state them briefly and proceed deliverables.
[00:22:41] Feature set by category categories, core conversion, okay. So they included an absolute
[00:22:47] tremendous amount of this outside. So MVP recommend a five to seven feature MVP, 98 Robev,
[00:22:51] milestone sequencing, including tech spikes, competitive scan, briefly compared to all the
[00:22:56] competitors and highlight how our features stand out. That is wild. That is a, I would certainly say
[00:23:04] a little bit more of a detailed prompt than our original. Wouldn't you say so? I'd say that's a
[00:23:12] pretty cool feature. I like that a lot. I think there's some UI tweaks I want to make. Let's, I'm
[00:23:17] going to make a couple UI tweaks right after this. So we got two options. The original or
[00:23:22] the optimized, let's test the sound click, use optimize and boom, it auto sends our optimized
[00:23:29] prompt. That is pretty amazing. So there's two UI updates I want to make once we get our response
[00:23:35] back here to ensure it works. Also a side note, it, I like that it basically took the iOS
[00:23:41] styling has the same exact blue and it has the moving dots for when it's typing. That's really cool.
[00:23:47] I like that. This is, this is, I'm going to be honest, rather good clean UI for an app built by AI.
[00:23:53] A lot of times it is not nearly as good and clean as this. Just one thing to note as this loads.
[00:24:00] I edited the load time a little bit just so we don't sit here and stare at the load screen.
[00:24:05] But it is taking quite a bit to load the responses. So one thing we're going to do is we are going
[00:24:12] to go back after this and we're going to shorten the load time a little bit by asking it to switch
[00:24:19] to GPT five mini GPT five mini is their lighter, quicker model, which will give us much faster
[00:24:24] responses. I think for a shot, I think for a chat bot app, we probably want faster responses than this.
[00:24:31] Let's actually just look in here real quick. This is the documentation for GPT five. Let's see,
[00:24:37] let's do overview. Let's see if it gives us, yeah, GPT five mini GPT. Let's use GPT five mini
[00:24:44] and let's go scroll down here. It's much cheaper, much faster and we can do this so we can copy this
[00:24:51] snapshot. Let's go back to prompt for agency. We got our spot. It's still work. I mean, it is a
[00:24:57] rather complex prompt. So it makes sense that it would take a while. But for the sake of the app
[00:25:03] and making it speedier and snappier and if you're working from home, save a little money as well,
[00:25:09] let's change it to GPT five mini. So I'm going to go back into Claude and I'm going to say
[00:25:15] the responses are rather slow from the API. Can we test out GPT five mini? And then I'm going to
[00:25:25] paste in the screenshot of the snapshot from the documentation. By the way, let's check here. Boom,
[00:25:29] we got a response. We no wonder it took so long. This is a quite spectacular response.
[00:25:35] Assumptions, additional model provider, agnostic via plug. Okay. So it just like that is as in
[00:25:41] depth of a response as you possibly can get. That is actually pretty amazing. If you want to
[00:25:46] can turn this to a living PRD architecture, I'm just going to say, yes, please give me a PRd
[00:25:52] and hit send. I'm just curious to see what it sends back. I'm enjoying using our app we're building
[00:25:57] right now. So that's working. But either way, let's let's go back. And for the sake of demonstration
[00:26:05] purposes and just for building out this demo app, we can always change this later on. Let's go back
[00:26:11] in here and say the response are rather slow from the API. Can we test out GPT five mini? I pasted in
[00:26:16] this screenshot of the GPT five mini snapshots right here. So it knows which model to use. And then
[00:26:23] I'm going to hit enter on that again. The more context you can give, the more screenshots you can
[00:26:29] use the better cloth will be and the more time you'll save in the long run. So I'm going to hit enter on
[00:26:33] that. And it's going to switch the model of GPT five mini to save us a little bit of time, a little bit of
[00:26:38] moolah, and get the demo moving. And you know, this is also just one of the really cool parts about vibe
[00:26:43] coding that I enjoy so much is like we're just having fun and experimenting where you can sit here,
[00:26:50] switch out models, maybe we want to switch in anthropic, maybe we want to switch in Google or
[00:26:55] grok or try anything else out here, we can do that, right? We're just experimenting tinkering. It's
[00:27:00] like we have an entire canvas that we're painting here and trying new things out. So it switched it
[00:27:06] out. Let's go back here. Let's go back to prompt racer. Let's actually reset the server because
[00:27:12] we made back end changes. And then let's refresh. Let's see if it actually yet saved our response.
[00:27:19] So let's just try to get in please give me the PRD. I'm going to hit enter. And let's see if this is
[00:27:25] any faster of a response than we were getting before with the normal GPT five model and check the
[00:27:31] console logs, see if it's sent. Yep, sent. Going to come over here. I'm going to check these logs
[00:27:36] as it is going. I'm going to go to console no errors here, everything looking good. So let's see
[00:27:40] how fast this can come back from chat and boom, we get it back. And that's looking like a pretty
[00:27:45] in depth PRD, even though we're using the mini version of chat GPT. So that's pretty awesome. All
[00:27:50] right. So we made some edits there. Let's tweak. So let's do some UI tweaks while we're at it here.
[00:27:56] Let's tweak a couple of things. Actually, let's do this. This is already what a 20, 25 minute module.
[00:28:03] In the next module, we'll do a bunch of UI tweaks. I'll show you how we can search for things we
[00:28:08] want to change screenshot it, send them over, get those things tweaked. So the next module,
[00:28:12] we'll move on to some UI tweaks, then we'll come back to building out the functionality.
[00:28:17] Actually, then we'll come back to building out the functionality. So I'll see you in the next module
[00:28:21] so you can take a get a glass of water, use the bathroom if you want to come back, we do some UI
[00:28:27] tweaks. See you there.