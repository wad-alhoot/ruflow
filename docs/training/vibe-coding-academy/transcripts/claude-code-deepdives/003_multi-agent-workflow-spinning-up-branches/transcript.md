[00:00:00] All right, so let's get straight into it for this walk through.
[00:00:02] I'm going to be using its open source project management app I built.
[00:00:06] I'll include a link to the code down below.
[00:00:08] You just want to make sure you copy and paste this into what we're about to do.
[00:00:12] I'm going to be doing everything through the terminal here.
[00:00:14] So you can use terminal.
[00:00:15] You can use ghosty.
[00:00:17] I'm using ghosty, which is basically just a wrapper for the terminal, which makes
[00:00:20] it a little bit easier to use, but you can just use a straight up terminal.
[00:00:22] If you want the reason why we're using the straight up terminal is this is the
[00:00:25] best for multitasking.
[00:00:27] The goal of this workflow I'm walking you through is to help you multitask a lot
[00:00:31] better with the AI coding agents, including cloud code.
[00:00:35] And the best way to do that, the best way to have multiple agents going is to use
[00:00:39] a terminal because the terminal doesn't use up a ton of memory on your computer.
[00:00:43] So you can have multiple terminal windows open without slowing your computer down
[00:00:47] at all.
[00:00:48] So we're going to start out with just one agent.
[00:00:50] I'm going to walk you through setting this up and then we will slowly as we learn
[00:00:55] about branches and work tree spin up multiple agents so we can get maximum
[00:00:59] efficiency here.
[00:01:00] So just to make sure we're all on the same page, we're going to be using this
[00:01:03] demo project.
[00:01:03] Although if you want, you can do this on a project that already exists on your
[00:01:07] computer, I'm just going to use this demo project.
[00:01:09] So if you want to follow on exactly with every single thing I'm doing, you can do it.
[00:01:13] So let's do this.
[00:01:14] We're going to make a new folder for this project.
[00:01:18] So I'm in just kind of my main folder on my Mac.
[00:01:21] I'm going to do MKDIR, make directory, which is basically going to make a new folder
[00:01:26] for us.
[00:01:26] I'm going to call it PM app demo and I'm going to hit enter.
[00:01:30] And now we have the PM app demo.
[00:01:32] I'm going to see the into that.
[00:01:34] So I'm going to do CD, which is going to bring us into that folder.
[00:01:37] I'm going to type in the first few letters here and then I'm going to hit tab,
[00:01:41] which will auto complete for us.
[00:01:43] And then I'm going to hit enter.
[00:01:44] Now we're in our folder.
[00:01:45] And what I'm going to do is I'm going to spin up Claude.
[00:01:48] So I'm going to do Claude and hit enter on that.
[00:01:51] And that's going to open up Claude code in this folder for us.
[00:01:55] So we can start getting to work in the folder.
[00:01:57] Now that's going, we can now start getting to work.
[00:02:00] So what we're going to do is I'm going to copy the link to this code.
[00:02:04] So right here, this GitHub, we're going to go back in here and I'm going to say,
[00:02:10] pull down this code into a new branch and work tree called notes.
[00:02:18] And I'm going to paste it in.
[00:02:19] And basically what we're doing here is we're asking Claude to pull down the code
[00:02:23] from the main branch in this one, it's called master and it's going to pull it down
[00:02:27] and it's going to spin up a new branch and work tree called notes.
[00:02:32] What notes is is basically the name of the branch for what we're going to be doing.
[00:02:36] So we're going to be adding notes functionality to this project management app.
[00:02:40] I'm going to show you what that looks like in a second, but we're going to have
[00:02:43] a pull down the code that make a new branch and work tree again.
[00:02:46] Branch is where the code's going to live, the separate timeline of code in GitHub.
[00:02:52] The work tree is going to be the local code.
[00:02:53] It's going to create a new folder that copies the code into it.
[00:02:56] So I'm going to hit enter on that and it is going to go and it's going to pull down
[00:03:00] the code and spin up a new branch and a new work tree for us.
[00:03:04] One thing you probably actually want to do that I just thought of before you do
[00:03:08] that real quick is make sure you copy the code from this GitHub into your own GitHub.
[00:03:15] So you want to create your own repository of this code.
[00:03:17] There's a few ways to do that.
[00:03:19] I think if you go into GitHub and click for, you can fork it into your own space
[00:03:25] and put it into your own account.
[00:03:26] Otherwise you can pull the code down from GitHub and ask Claude code to commit it
[00:03:30] to a different repo inside GitHub and you just go in and get up and create a new repo there.
[00:03:35] If you have any questions on that, feel free to reach out to me on in the community
[00:03:38] and I'll help you out there.
[00:03:40] But I think that should be pretty straightforward.
[00:03:42] That'll make this a little bit easier to do.
[00:03:43] So I'm going to give permission for Claude to go in and start copying this,
[00:03:48] creating the branches and all that.
[00:03:49] That should only take a minute or two here.
[00:03:51] So you can see here it's going into our new folder.
[00:03:54] It's creating a new work tree and it is creating a new branch called notes.
[00:03:58] And I'm going to hit yes on that.
[00:03:59] Gonna hit yes on it going into that new work tree on the computer.
[00:04:04] So what it did is it created a new folder inside our folder that has a copy of the code.
[00:04:08] Now it is in that new folder.
[00:04:10] And now we are in the notes directory in the notes branch.
[00:04:13] So this is independent from the main repo.
[00:04:15] That's great.
[00:04:16] So now all the changes we make are going to go to this notes repo.
[00:04:19] So what it did was it created a work tree for the main branch, so the master branch here.
[00:04:25] And then it created a work tree for the notes branch.
[00:04:28] So let's take a look at this.
[00:04:29] So I'm in that directory we created the beginning of this video.
[00:04:32] And you can see here, here's the work tree for the main branch.
[00:04:36] And here's the work tree for the new notes branch.
[00:04:38] It has the exact same code in it right now.
[00:04:40] So it's just copies of the code, which is great.
[00:04:42] When we were ready to commit changes, we're going to commit the changes from the branches
[00:04:47] to the main work area.
[00:04:50] So let's do this.
[00:04:51] Let's start multitasking.
[00:04:53] So we have our one branch here.
[00:04:55] I'm going to open up a new window.
[00:04:58] So a new terminal window in ghosty.
[00:05:00] We're in the PM app demo.
[00:05:02] We're going to type an LS.
[00:05:03] What LS does is list all the contents inside here.
[00:05:06] Boom.
[00:05:07] There's our notes branch.
[00:05:08] There's our main one.
[00:05:09] We're going to open up Claude.
[00:05:10] So this branch we had in the other window is to add notes functionality to our project
[00:05:15] management app.
[00:05:16] I at the same time is one add notes functionality.
[00:05:19] Also want to add to do list functionality.
[00:05:22] If you're curious of what the app will work on looks like, here's the app.
[00:05:25] It's your simple.
[00:05:26] It's a simple can bandboard.
[00:05:27] So you have your columns, right?
[00:05:28] You can add your own columns and then you can add tasks to the columns.
[00:05:32] But I want to add a couple of things.
[00:05:33] I want to add a note section where I can just take notes.
[00:05:35] I want to add a to do list section, which is just straight up to do.
[00:05:38] And then I also want to add a calendar section.
[00:05:42] So instead of trying to do all that at once and potentially having code step on each other's
[00:05:46] toes, we're going to do this in separate branches and in separate work trees.
[00:05:49] So I'm going to come in here.
[00:05:50] I'm going to type Claude.
[00:05:51] I'm going to go in here.
[00:05:53] Now we have Claude open in the same project directory.
[00:05:56] I'm going to say copy the code down from this GitHub and create a new branch and work
[00:06:04] tree called to do list.
[00:06:07] And I paste in the link to the code again, and I'm going to hit enter.
[00:06:11] And now it is going to make another work tree for us and another branch for us for the to
[00:06:17] do list.
[00:06:18] And I'm going to hit enter.
[00:06:19] This is going to allow us to have these two agents working at the same time, adding code
[00:06:24] and merging it to main.
[00:06:26] And then we will do this one more time after this is done so that we can have three AI
[00:06:30] agents working at the same time, which is in my opinion, probably the most you want going
[00:06:34] at the same time.
[00:06:35] You really want 20 different going, you can do it.
[00:06:38] My brain, I have a smaller brain can only comprehend three AI agents at the same time.
[00:06:43] So we're just going to do three.
[00:06:45] And then I'm going to show you how we can do those changes and then commit them and merge
[00:06:48] them all in the same place.
[00:06:50] Okay, so boom, we have our second one going.
[00:06:52] Let's open up a third one.
[00:06:54] So I'm going to go file new window.
[00:06:56] I'm going to pull that here.
[00:06:58] I'm going to do LS, make sure in the right place.
[00:07:00] Boom.
[00:07:01] Okay, that looks great.
[00:07:02] Now I'm going to say pull the code down and create a new branch and work tree called calendar.
[00:07:11] So maybe I want to add calendar functionality as well.
[00:07:14] I'm going to paste in the link once again.
[00:07:16] And actually that is on me.
[00:07:17] I forgot to start up Claude.
[00:07:19] So let's do that again.
[00:07:21] Pulled the code down and create a new branch and work tree called calendar and then paste
[00:07:31] and then hit enter.
[00:07:32] And that's going to get our third agent going.
[00:07:34] And now as you can think this through as this is going, we now have three Claude code set
[00:07:38] up all with their own local work tree where we can commit code to the number one question
[00:07:44] I get when I'm like, oh, you should have multiple agents working with each other is what happens
[00:07:48] if there's conflicts?
[00:07:49] What happens if the code steps on each other?
[00:07:51] Isn't that difficult?
[00:07:52] Isn't that complicated?
[00:07:53] Well, this is the solution.
[00:07:54] This is your solution right here having multiple work trees.
[00:07:57] So the code is separate and then merging them all together.
[00:08:01] So boom, there we go.
[00:08:02] Let's make sure we are in the work tree.
[00:08:04] Are we in the calendar work tree right now?
[00:08:09] Any questions you have on GitHub, if you ever get confused, Claude and any AI agent you use
[00:08:15] is going to understand it inside and out.
[00:08:16] So you can just say, Hey, what's going on here?
[00:08:18] I'm confused by this.
[00:08:19] I don't get this.
[00:08:20] What branch we on what work tree we on, you can ask Claude any of those questions.
[00:08:24] So let's do this.
[00:08:25] Let's make sure we're in the calendar work tree.
[00:08:28] Let's switch to the calendar work tree.
[00:08:31] Well that goes.
[00:08:33] Let's go into the to do list work tree here.
[00:08:38] And then in our first AI agent, we spun up, we're going to say, let's go into the notes
[00:08:44] work tree.
[00:08:45] Okay, this is glorious.
[00:08:46] So there we go.
[00:08:48] We now have our three agents ready to go all set up inside their work trees.
[00:08:55] I'm going to move this over so that this is in a nice visual here.
[00:08:59] So you can see all three of the agents at the same time.
[00:09:02] Here we go.
[00:09:03] Let's move this over here a little bit.
[00:09:05] So we have our new branches set up.
[00:09:06] We have our new work tree set up.
[00:09:08] Again, the branches are the different timelines in GitHub of the code changes we're making.
[00:09:14] The work trees are the different local copies of code that our agents will be working in.
[00:09:20] In the next video, we are going to get into actually commanding these agents to make
[00:09:24] changes.
[00:09:25] I will see you in the next video.