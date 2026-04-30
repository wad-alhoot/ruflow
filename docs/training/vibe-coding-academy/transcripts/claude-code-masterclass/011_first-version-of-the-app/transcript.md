[00:00:00] So let's do this. Let's get the party started. Let's build it out. We are in
[00:00:03] Claude code, pull it open. As long as you got the Claude code extension installed,
[00:00:09] all you have to do is hit the little button up here, the little Claude symbol,
[00:00:12] that will open up Claude code like you see here. And you are good to go.
[00:00:17] What we're going to do is we're going to create a brand new project inside a
[00:00:21] visual studio here. We are going to click open right here.
[00:00:24] Then we're going to go in, create a new folder for the app. I'm going to call
[00:00:27] as prompt racer. I'm going to hit enter. I'm going to open that up. Now it is inside
[00:00:33] of our folder that we just created. This is where the project will live. I will
[00:00:37] open up Claude code again by hitting that button. And we are good to go. Now we are
[00:00:42] in Claude code here. What we are going to do, and this is a very important concept
[00:00:46] to learn, is we are going to put this in plan mode. Plan mode is a critical,
[00:00:53] critical thing to learn, to learn when to use inside Claude code. This is the mode
[00:00:59] where Claude doesn't write any code. It just builds a plan. It just builds a plan
[00:01:04] out for your app. And what this does is you're able to review the plan of what it's
[00:01:08] going to do. And it most of the time ends up making so Claude builds a lot higher
[00:01:14] quality code, which leads to a lot less bugs and a lot better of an app. So what
[00:01:18] we're going to do is we are going to hit shift tab. And then we're going to hit shift
[00:01:21] tab again. And that puts us in plan mode, which you see right there. We are going to open up our
[00:01:27] co-pilot again. We are going to take the initial prompt it gave us here. We are going to we're
[00:01:34] going to go into our AI co-pilot here. We are going to copy the initial prompt it built for us.
[00:01:41] And we are going to paste it into Claude code. And we are going to make sure we are in plan mode.
[00:01:47] And you are about to send your first prompt in Claude code. And we are going to do
[00:01:51] send. And now what Claude code will do is it will build out the plan for us. It will ask us any
[00:01:56] questions it might have on exactly what we want to build here. It will do research on the web for
[00:02:02] the latest way to build everything we wanted to build. And we will get our first app. And we will
[00:02:08] get the first version of our app built. So what's great about Claude code here is you can see
[00:02:12] it's entire thought process over here and boom, just like that, the plan is built. So let's quick
[00:02:17] review it. Like listen, do you need to go through every plan review every character and sentence
[00:02:22] in every single plan? No, sometimes all you need to do is just quickly go over it and make sure it
[00:02:27] looks mildly good. But for this first one, let's go through and let's make sure we understand what
[00:02:32] it's going to do. So it's going to build prompt racer V zero. So the first version of the app,
[00:02:37] minimal child application, create a single page next JS TypeScript app with Chi GPT five integration
[00:02:42] from scratch, initialize the next JS project. So it's going to create our next JS project. It's going to
[00:02:48] install dependencies. It's going to do tailwind for styling. It's going to set up the basic project
[00:02:52] structure. So all the files and install the technologies we need, it's going to create the main chat app
[00:02:59] page. It's going to build the chat API route. And for those that are super new and not as technical,
[00:03:05] an API, all an API is, is the way for two pieces of software to communicate with each other. So an
[00:03:13] API for chat GPT would be a way for our app to communicate with chat GPT, send it prompts, get
[00:03:19] a response back. An API for our database would be a way for our front end to communicate with our
[00:03:24] database. Hey, can you give me this data and the database gives it back through the API. So it's
[00:03:29] going to set up API routes for us. What API routes are basically just the code that defines
[00:03:35] the communication in the API. It's going to implement the client side chat logic. So all the logic of
[00:03:42] getting the chat from the AI, putting it on your screen, making it look nice and pretty,
[00:03:48] is going to add UI stage super technical. You don't need to dive deep into that styling and
[00:03:53] responsiveness will make it look good and configure our environment variables, which I will go into
[00:03:58] that in a second. That's basically like the passwords for our API and database and all that.
[00:04:02] So it's not going to build out the database, the authentication analytics, multiple models just yet
[00:04:08] or advanced features. These are all things we are going to build out separately after this step
[00:04:13] by step by step by step so we can dive into super detail. All right, this looks good. And what I'm
[00:04:19] going to do is click Yes and auto accept that might sound risky to say, Hey, yes, and just write out
[00:04:24] all the code without oversight. But trust me, again, I use Claude code for like 12 hours a day every day
[00:04:30] of the week. It is very trustworthy. And if it doesn't introduce any bugs, we can fix them very,
[00:04:34] very quickly. So let's hit Yes and auto accept on that. And what is going to happen is it is going
[00:04:41] to start building out our application along the way it's going to ask us for permission for different
[00:04:47] things. Allow this bash command npx create blah, blah, blah, blah. What this is is the command
[00:04:54] to install the next JS TypeScript tailwind all the tech behind the scenes into our project,
[00:05:01] into our application, it just asks for permission for all the bash commands bash commands, just the
[00:05:07] commands that run in like our terminal to install that technology, it explains what's doing install
[00:05:12] the next JS project with TypeScript. And we say yes, it is going to start building that out for us.
[00:05:18] Along the way, if this is your first next JS application you've ever built out, it might say
[00:05:23] things like oh, next JS isn't on your computer yet or oh, you don't have these technologies on
[00:05:29] your computer yet or anything like that. If it does that, just give it permission to install those
[00:05:34] technologies on your computer that will make it so it can get everything up and running. If you run
[00:05:39] into any errors, if it crashes out or breaks again, just pull open your AI copilot say hey, this is
[00:05:45] what's going on. How do I approach this one off error? Listen, I'm going to try to cover as many bugs and
[00:05:51] errors as I can during this. I'm going to show you how to debug and fix things. It is impossible for me
[00:05:56] to cover every single potential error and bug that might happen. So in those edge cases where bugs
[00:06:02] and errors happen, again, make sure you have your AI copilot good to go, you can go in there,
[00:06:08] screenshot whatever you're seeing in Claude code, paste it into your copilot and say hey,
[00:06:12] what the heck's going on here? How do I handle this? I don't know what this is and it will explain you
[00:06:17] how to approach all those challenges. So as you can see here, all the files and the code are
[00:06:21] starting to pop up over here on the left hand side. Again, this is our project structure over here on
[00:06:27] the left hand side. If you click in, you click on any of the files, you can see the code in there
[00:06:31] and all the code that's being written inside of our project. Very exciting, very fun. We can track
[00:06:37] what is going over here on the right hand side. So it is creating the main chat page with the UI
[00:06:42] and client side logic. Now it's creating the environment variables. And you can see the to-do
[00:06:47] list. It keeps a to-do list there of every single thing it needs to do. And now it's going to install
[00:06:52] all that tech for us with npm install. I hit yes on that. Again, feel free to hit yes. If you get
[00:06:57] confused or if you're concerned about anything you're seeing, again, pull open your AI copilot and
[00:07:03] just say, Hey, this is what's asking me to do. I'm concerned. What does this mean? And it will
[00:07:07] explain it to you. So I'm going to keep hitting yes on the commands installed. This is the most
[00:07:12] permissioning and hitting yes you're going to have to do in the entire project because I also install
[00:07:16] every technology one by one. I love that you get to track in Claude Code all the to-do items. And boom,
[00:07:21] there it is. Perfect. Prompt Racer V zero is ready to go. Summary. I've built a minimal next JS
[00:07:28] TypeScript chat app with the exact scope you requested. What's included core files, features,
[00:07:34] and now it gives us the explanation of how to run it locally. So let's do this. Let's test it out.
[00:07:41] The AI functionality is not going to work yet because we haven't put in our open AI API key,
[00:07:46] but let's just make sure the code worked. What I'm going to do is I'm going to hit control till day.
[00:07:53] That's the bottom left key and the top left key on your keyboard if you're on Mac. If you're on PC,
[00:07:58] just say, how do I open up the terminal on PC or you can just do view terminal in the top left of
[00:08:03] your PC. And then we're going to type in npm run dev as it says here to start the dev server,
[00:08:11] npm run dev. And what this is going to do is start our development server. It's going to take all
[00:08:16] our code and run it locally on our computer so we can test the app out. I'm going to hit enter on that.
[00:08:21] As you can see, the server has started running. We can see the exact address of the server, local host
[00:08:26] 3000. If you command click on that, it will open up local host 3000 in a browser. And if I pull this
[00:08:34] over here, you can see our app is open. It is running and it is set. There it is prompt racer.
[00:08:41] New chat, start a conversation with chat GPT. It has the text box. It has a send. Hey, there,
[00:08:47] I'm not going to hit send because there is no AI functionality just yet. But as you can see,
[00:08:52] the app has been created. I mean, this is V zero, right? This isn't even V one. This isn't even like a
[00:08:57] beta. This is as framework as it possibly gets. We are going to be adding so many more features.
[00:09:04] We're going to be adding the database. We're going to be adding authentication payments. We're going
[00:09:09] to add a landing page, we're going to add marketing, we're going to add saving prompts, we're going to
[00:09:12] add optimizing price. We're adding so much more to this. But V zero is created. The bones of our app
[00:09:19] are here. What we're going to do in the next module is we're going to get the AI hooked up.
[00:09:24] We're going to grab the API key for open AI. I'm going to show you how to do that. We're going to
[00:09:27] test out the AI functionality. And then we're going to start adding so many more features. I'll go over
[00:09:32] best practices for prompting. I'll set up. I'll show you how to set the database and all the other
[00:09:37] functionality. Now the fun begins. See you in the next video.