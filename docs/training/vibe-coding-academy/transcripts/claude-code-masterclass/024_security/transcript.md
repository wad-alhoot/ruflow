[00:00:00] All right, so real quick, I wanted to go over security. This is very, very important. I'm going
[00:00:04] to go over some of the basics here. At the end of the day, it's going to be impossible for me to cover
[00:00:09] every single aspect of security in an app and one course. I mean, that could take up like a 40-hour
[00:00:15] course by itself. But I will put you on the path for making sure your app is as secure as humanly
[00:00:22] possible. I'm going to go over the basics of the things you can quickly fix and control right now.
[00:00:27] And then I'm going to leave you with some prompts you can use to work with the AI to make your app
[00:00:31] as secure as humanly possible. This is what I did with Creator Buddy, which I haven't had a single
[00:00:37] security issue since it's launched a year ago. And I've had many experts go through and tell me
[00:00:42] it's looking really, really good from a security perspective. So we'll cover that right now. A few
[00:00:46] things. Number one, no API keys in the front ends. We talked about this earlier. You have your environment
[00:00:52] variable file, the dot ENV dot local. Those are all your environment variables. Those are basically
[00:00:58] your passwords to open AI in your database and everything you use. Those are a highly, highly,
[00:01:05] highly secret. You don't want to share those anywhere. So you need to make sure in your app,
[00:01:12] all your environment variables are in your dot ENV and not actually in any of your code, right?
[00:01:21] You can have the variable names in your code, but you shouldn't have the actual values in your code.
[00:01:27] And one way you can do this is you can go to the AI, you can say, Hey, can you check to make sure I
[00:01:32] don't have any environment variables in my front end front end? And they're all in my dot ENV dot
[00:01:37] files. Once you do that, you are good to go. You don't want any of the values of your environment
[00:01:42] variables in your code, all that should all be in the dot ENV files. Next, RLS on every table,
[00:01:49] RLS is row level security. This is the security that's going to be on all of your super base
[00:01:57] tables. And this is what's going to make sure that users can't hack your database. They can't get
[00:02:02] data from other rows that don't belong to them. And so you're going to want to make sure row level
[00:02:08] security is on every single table. The way you're going to do that is this, you're going to work
[00:02:13] with the AI again, because again, it's impossible for me to cover every aspect of row level security
[00:02:18] in one course. But what you can do is you can go to your AI and you're going to want to write this
[00:02:23] down. And you can say, Claude code, say, Hey, I want to make sure my super base is secure. I want to
[00:02:29] make sure we have role level security everywhere that's necessary. Can you please walk through with
[00:02:34] me? Give me the SQL queries I need to show you what my current role level security policies are
[00:02:40] and work with me to make sure my database is as secure as possible. If you do that, the AI will
[00:02:46] work with you to make sure you have proper role level security on your database. Next,
[00:02:50] API route protection. This is so you have API's as we talked about throughout your app. This is a
[00:02:57] vector for bad actors to hack your app. So what you're going to want to do is again,
[00:03:01] go to your AI, go to Claude code, say, Hey, I want to make sure we have proper API route protection
[00:03:06] across the board. Can you check that for us? Claude code will go through every single one of your
[00:03:11] APIs, make sure they're secure and make any changes needed to make sure they're secure.
[00:03:16] We have rate limiting rate limiting is the amount of times people can hit your APIs. So say someone
[00:03:22] wanted to take down your app if you have no rate limiting, they could go into your prompts,
[00:03:27] race your app and automate it so they rapidly create thousands of conversations in a second
[00:03:34] to take down your app. They can overload your app with requests. So what you want is rate limiting
[00:03:40] on all your API routes so that they can't overload your app. So they only can use your APIs a safe
[00:03:48] amount of time. So again, go to your Claude code to Hey, I want to make sure a rate limited everywhere
[00:03:52] we need to be. Can you check for that prompts in the back end, not in the front end. So you don't
[00:03:57] want any of your system prompts in the front end. You want them all in the API's in the back end.
[00:04:03] What are your system prompts? These are the prompts, for instance, in our prompt racer app,
[00:04:08] when we say optimize a prompt, it goes and it tells the AI API, hey, take this prompt the user put in
[00:04:14] and optimize it for us. That's a system prompt. We don't want any of those in the front end because
[00:04:19] we don't want the users to know how our AI works. So again, go to the Claude code to Hey, I want to
[00:04:25] make sure none of our prompts are in the front end. We want to make sure they're in the back end and
[00:04:29] it will move it around for us. And then lastly, again, I can't cover every single security aspect
[00:04:35] and of course, I mean, people pay hundreds of thousands dollars for degrees on security.
[00:04:40] But the last thing I would say here is go to the AI after you've done all this, go to Claude code
[00:04:46] and say, Hey, I want to make sure this is production ready. Can you go in and do a security check across
[00:04:52] our app to see if there are any vulnerabilities and then work with the AI to see what it found and
[00:04:56] fix any of the vulnerabilities. If you do all these things, you will be in good shape. It's what
[00:05:02] I did for my app and I've had zero security issues since. Go through these things, make sure you're
[00:05:07] secure, make sure you're safe and you'll be in a good spot. Any security questions or issues
[00:05:11] you have, go to the AI, ask the questions it will cover for you and knows your code inside and out.
[00:05:16] If you do these, you should be good for launch. So we covered building out the app, we covered
[00:05:21] pricing, covered the back and architecture security, everything that's involved, your app is ready
[00:05:27] to go. It is ready to launch the next section. We're going to start getting into marketing. We're
[00:05:33] going to start getting into getting users, getting customers, trials, feedback, all that fun stuff.
[00:05:38] Congrats on building your first app. If this is your first one, or if you've built apps or I
[00:05:43] congrats on mastering Claude code, the next section will start getting into the marketing stuff. See you
[00:05:48] there.