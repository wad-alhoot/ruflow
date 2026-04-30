[00:00:00] The next video in this linear series I want to do is on integrating linear with open cloud.
[00:00:06] Now this is some next level stuff.
[00:00:08] This is some stuff that if you do this, you set this up.
[00:00:11] You're doing things that point zero zero zero one percent of people do.
[00:00:15] So follow along with me here.
[00:00:16] This is going to be really cool.
[00:00:18] What we're going to do is we're going to add our open claw as an agent or as a team member
[00:00:25] inside linear so that we can go in and we can actually assign issues to our open claw.
[00:00:33] So for me, Lola is one of my open claws on my other Mac studio that I, when assigned,
[00:00:38] can go in and actually start building out these issues and write code for me based on
[00:00:43] the issues in linear.
[00:00:44] So this is really cool.
[00:00:46] The first thing you're going to want to do is make a new linear account for your agent.
[00:00:50] So what you're going to want to do is you're going to want to go down here, click invite
[00:00:53] people and invite one of your alternate email addresses.
[00:00:57] So whatever email address you're not using for linear, send an invite for that one.
[00:01:02] That account is going to be used by your open claw to manage and create code for your issues.
[00:01:09] Once it has its own account, you're going to want to create an API key for it.
[00:01:14] And basically what the API key in linear is going to allow it to do is access and edit
[00:01:19] your linear from telegram or your computer or whatever by using that API key.
[00:01:25] So what you're going to want to do is you're going to want to go to your settings.
[00:01:29] So the top left, you click settings, you scroll down, you go to API, then you can click on security
[00:01:35] and access settings.
[00:01:37] From here, you can scroll down and you can see new API key, you click new API key in your
[00:01:42] agent's account, not your main account, your agent's account.
[00:01:46] That will give you an API key.
[00:01:47] You want to keep that safe.
[00:01:48] So copy and paste it in the notepad and have that ready for the next step.
[00:01:52] So next we're going to want to go to our agent and tell them about this.
[00:01:56] So you can go to your open claw and say something like this, I have a linear setup right now
[00:02:01] with all the task and issues in it.
[00:02:03] I want to somehow plug you in and build a system where you're my 24 7 AI engineer.
[00:02:10] Please integrate with my linear account.
[00:02:12] It's going to start off.
[00:02:13] It's going to go.
[00:02:15] It's going to ask for an API key for linear.
[00:02:17] You're going to paste in your API key and it's going to be all set up for you.
[00:02:21] What you're then going to want to do is set expectations for how you want it to work.
[00:02:25] You're going to say I set up an account for you.
[00:02:28] And when I assign your account to an issue, I want you to then take that issue and write
[00:02:36] code for it in a new branch and create a pull request.
[00:02:41] So what you're going to want to do is you're actually going to want to have it pull every
[00:02:45] five minutes for an issue assigned to it.
[00:02:49] So polling and cron jobs are very different things.
[00:02:53] It can set up a script where it pulls where it's going to automatically check linear for
[00:02:59] tasks assigned to it.
[00:03:00] And then it's going to alert the agent that it has tasks.
[00:03:03] So these aren't cron jobs.
[00:03:05] It's doing this actually separate cron jobs cost tokens like the AI actually doing things
[00:03:10] over and over again.
[00:03:11] Polling is just scripts that run every so often that will check to see if any tasks are assigned
[00:03:16] to it.
[00:03:17] What I would do here, my recommendation would be is just say, hey, here's the system on you
[00:03:22] to build out.
[00:03:23] I want you to be able to, when I assign a task to you for you to actually go and do the
[00:03:29] task, how do you recommend we do this?
[00:03:32] See what its recommendation is because you might have different systems in me.
[00:03:36] Your agent might be customized in different ways than me.
[00:03:38] So I would kind of reverse prompt here and see what it wants to do as best practices for
[00:03:44] this system.
[00:03:45] And then it will set it up for you and it will check every five minutes or so or whatever
[00:03:49] decides is best if it has any tasks assigned to it.
[00:03:53] Now you kind of have the system set up just as a side note, by the way, I also gave it further
[00:03:58] instructions and you can instruct it on this too.
[00:04:01] Whenever I have it work on a task, I actually have it first before writes the code for that
[00:04:07] task actually reply in the comment section of the issue with a plan for that task.
[00:04:13] This is just kind of a starter thing I want to do so I can make sure I trust my open claw.
[00:04:17] I want to see how it thinks.
[00:04:18] But what it's going to do is before writing code, it's going to put in the comment section
[00:04:22] of an issue, the plan for what it wants to do, then I can just reply, yes, that looks good.
[00:04:27] And then it will go and build it out.
[00:04:29] You can do something similar if you want to build trust with it as well, totally up to
[00:04:33] you.
[00:04:34] One last thing you want to integrate into this too is GitHub.
[00:04:36] If you haven't already, you want to make sure your open claw has GitHub access so that
[00:04:42] it can do things like create new branches, create new pull requests, things like that.
[00:04:46] So also prompt your open claw so that it has it, it'll walk you through this access to
[00:04:53] your GitHub.
[00:04:54] So that when it writes this code for you issues, it'll put it in a brand new branch so that
[00:04:57] it's not stepping on the toes of your other agent to a writing code or anything like that.
[00:05:02] It'll have its own branches.
[00:05:03] And you can then just go into those branches, test the code, pull it down and test it to
[00:05:08] make sure it works.
[00:05:09] I understand that's a little complex.
[00:05:11] If you're not a GitHub expert, that might seem complex, totally fine.
[00:05:14] What you can do is it'll do all that for you.
[00:05:16] Then you say, Hey, how do I test this code?
[00:05:19] And it will pull down the code for you and say, Hey, you can test it.
[00:05:22] Anything that sounds too complex, just tell your open claw to do it and they'll do it for
[00:05:25] you.
[00:05:26] Just say, walk me through the system you're doing for writing this code.
[00:05:30] How do I test it?
[00:05:31] And it will walk it through for you.
[00:05:33] It's pretty simple.
[00:05:34] It really isn't too complicated.
[00:05:35] And now you have a multi agent set up.
[00:05:37] And what I do here is I'll typically work out of Claude code.
[00:05:41] That will be my main driver.
[00:05:43] And as Claude code's working and I'm waiting for it to do something, then I go in a linear
[00:05:47] and I assign a task to open claw so that it can do that work for me.
[00:05:51] Then I just go back and forth testing the code that both my agents are writing.
[00:05:56] And what's really great here is you can go on the go, you can assign tasks on the
[00:05:59] go and you'll just constantly be getting worked on and constantly getting code written.
[00:06:04] It's really, really sick.
[00:06:05] You implement the Claude code stuff I went through and the open claw stuff I went through
[00:06:09] with linear and you get used to linear and how it works.
[00:06:12] You're going to be a vibe coding machine.
[00:06:15] Hope this was helpful way more videos on different Claude code and open claw workflows coming
[00:06:19] soon.
[00:06:20] Keep it locked into the vibe coding academy.
[00:06:22] See you soon.