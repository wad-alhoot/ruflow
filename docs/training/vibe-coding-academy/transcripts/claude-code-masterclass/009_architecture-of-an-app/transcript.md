[00:00:00] Let's talk about how apps work, how web apps work, specifically the one we are about to build
[00:00:05] and what tools we're going to use for it. I swear this is less confusing than it looks, but just to
[00:00:10] give you a high level explanation of what we're looking at here. This is the basic architecture
[00:00:16] of how a web app works. And this is what we're going to be building during this course. And I
[00:00:20] promise you, you don't need to understand code. You don't need to get super technical. This is
[00:00:25] going to be really simple when we start building it out. I just think it's interesting and important
[00:00:30] to understand kind of what's going on in the background of what you're building. But basically,
[00:00:34] there's different layers to an app. You have your front end, which is everything you see in the browser.
[00:00:38] You have your database, which is where all your data is stored, right? When you create an account
[00:00:43] or if you submit information about yourself or if it's storing bank account balances or whatever,
[00:00:49] any data about you you put in or that you see gets stored in the database right here. The back end
[00:00:56] is basically the layer between the two. So when you load up a website, it talks to the back end
[00:01:01] says, Hey, get this information from the database. Maybe it's a banking site. So you log into your
[00:01:05] banking site says, Hey, can you grab the user's bank account balance from the database in the
[00:01:10] back end calls the database and gets that data. So the database stores all the data about your user.
[00:01:16] This is kind of the core of it right here. But then you have a bunch of whole other different
[00:01:21] services you use to build out your app. So maybe you have AI functionality. The app we're going to
[00:01:26] build during this course has AI functionality. And so sometimes your front end will call an AI
[00:01:32] service like chat GPT or Claude to get AI functionality. You have authentication so a user can log in
[00:01:38] and you'll use an authentication service, which the front end will call. Maybe you're sending
[00:01:42] emails from your application. The front end will call an email service payments. You got to accept
[00:01:46] payments. The front end will use a service like Stripe, for instance, which will be using in our course
[00:01:52] to accept payments. They're basically plugins to the front end that do very specific tasks and make
[00:01:58] them easier. Then you have hosting which hosts all your code and serves it to the user will be hosting
[00:02:03] on a service called Vercel. And the technology behind all this is pretty simple next JS and
[00:02:09] TypeScript power the front end in the back end. Superbase powers the database. And I'm going to be
[00:02:15] going into how you're going to set up all of this and make it really, really easy for you AI. We're
[00:02:19] going to be using chat GPT and Claude off. We're going to be using a service called clerk email.
[00:02:24] We'll be using a service called reset payments will use Stripe. We'll go through all of it. You don't
[00:02:29] need to understand the technical stuff. I just think it's important that as we build you kind of
[00:02:33] understand how everything works. So this is the basic architecture around the app we'll be building
[00:02:38] in this course. And you'll be a master this by the end. You'll be able to understand this chart
[00:02:42] like the back of your hand by the end of this. So the most technical part of this course is done.
[00:02:48] Congratulations. You made it past that. Now we get into the fun part. Now we start building. We're
[00:02:54] going to pull open Claude code. We're going to pull open our AI code pilot. We're going to start
[00:02:58] generating our app. Let's get into it.