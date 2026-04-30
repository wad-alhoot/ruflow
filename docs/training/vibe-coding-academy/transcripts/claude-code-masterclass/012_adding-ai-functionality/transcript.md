[00:00:00] So let's do this real quick.
[00:00:01] I want to get the AI functionality working in the app.
[00:00:03] Just so you can feel what it feels like to have a working app you built.
[00:00:07] Obviously we're going to add hundreds of more features to this.
[00:00:10] I'm going to go over best practices on Claude rules, best practices on prompting.
[00:00:15] We're going to add database off a hundred million more things.
[00:00:18] But before we do that, let's just do a quick module here where we're going to add
[00:00:22] AI capabilities to the app to power a lot.
[00:00:25] What we're going to do here.
[00:00:26] If you've built AI apps for this will be very self-explanatory.
[00:00:29] If you've never built an AI app before stick with me here.
[00:00:31] But what we want to do is we want to power this chat bot with the chat GPT API.
[00:00:39] And as we talked about earlier in our diagram portion of this, an API is two pieces of
[00:00:44] software communicating with each other, right?
[00:00:46] So we want chat GPT software to communicate with our prompt racer app.
[00:00:51] To do that, we need an API key we need to put into our app.
[00:00:54] So let's do this.
[00:00:55] Let's go to the chat GPT platform.
[00:00:57] That is platform.openai.com.
[00:01:00] Go there.
[00:01:00] Sign up.
[00:01:01] Once you're signed up, you're just going to need to put your credit card number in here
[00:01:04] so you can pay for API credits.
[00:01:06] Depending on the model you use, this is spectacularly cheap for the purposes of the app.
[00:01:10] We're building here.
[00:01:11] This will, this won't cost you more than like a couple dollars to do API stuff.
[00:01:15] So put that in as well.
[00:01:17] Then we're going to grab the API key.
[00:01:19] We do that by going to dashboard API keys and then create a new secret key right here.
[00:01:25] I'm going to name it prompt racer and I'm going to create the secret key.
[00:01:29] Once you have that, make sure you copy that.
[00:01:31] And what we're going to do is we need to put that in our environment variables in our app.
[00:01:36] For those who don't know, environment variables, these are like the secret keys,
[00:01:40] secret passwords that power our app.
[00:01:42] When we hook it up to a database, when we hook it up to the API, when we hook it up to payments,
[00:01:47] they all need different passwords that let the service know we are us and this is our app, right?
[00:01:53] And so open AI needs an API key to know this is us charge our credit card, things like that.
[00:02:00] So if you built the app with me, you probably have a dot ENV.example.
[00:02:05] What we need to do is we need a new file and we call it dot ENV.local.
[00:02:10] Pen enter on that.
[00:02:11] Let's take our dot example here.
[00:02:13] Copy it, paste it into dot local.
[00:02:15] So this is open AI API key equals this.
[00:02:19] You take your API key and you paste it right there.
[00:02:23] I'm not going to show you mine.
[00:02:24] This is a secret password.
[00:02:25] You don't want to show yours to other people either because then they'll be able to use your API
[00:02:29] and charge your account.
[00:02:30] So paste that in there and you are good to go.
[00:02:33] Once you've saved that, let's pull open our app.
[00:02:36] Let's refresh it and let's test it out.
[00:02:39] Hey, are you there?
[00:02:41] I'm going to hit enter.
[00:02:41] Yes, I'm here.
[00:02:42] How can I assist you today?
[00:02:44] Let's say let's make sure this is AI powered and not a demo.
[00:02:48] Who is Elon Musk?
[00:02:50] Enter.
[00:02:50] Let's see if this is truly AI powering this.
[00:02:52] Elon that boom gives us the full answer.
[00:02:55] You now have an AI powered app.
[00:02:56] If you're more advanced and you know API keys and you want to build AI apps,
[00:03:00] you made it through a really simple part.
[00:03:02] If you've never built an AI app before, you never dealt with environment variables.
[00:03:05] Congratulations.
[00:03:05] You just built your first AI app.
[00:03:07] We're going to add so much more to this.
[00:03:08] In the next section, we're going to start covering Claude rules.
[00:03:11] We're going to start covering best practices when it comes to prompting.
[00:03:15] So we're going to get a little bit more advanced.
[00:03:17] Once we cover the basics around that, the Claude rules and we're all on the same page there.
[00:03:21] Then we're going to start adding more advanced functionality database, all of that.
[00:03:25] We're going to make this a really, really cool, awesome built out AI app that you can use
[00:03:30] every single day and you're going to learn a ton along the way.
[00:03:32] See you in the next module.