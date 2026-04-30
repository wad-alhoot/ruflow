[00:00:00] All right, so we're on the last step here.
[00:00:02] We committed all our code to get up in all the separate branches.
[00:00:05] Now we want to have the single source of truth, right?
[00:00:08] We want to have all our changes onto the main branch so that if your app is live right
[00:00:14] now, those changes go live, right?
[00:00:16] Let's pretend for a second this project management app is live on the internet, right?
[00:00:20] It's on Vercel, Vercel is connected to your main branch.
[00:00:23] Whatever is on your main branch is what's being seen.
[00:00:26] So these three changes we made because they're on separate branches, not on main, they're not
[00:00:30] actually being seen by anyone now.
[00:00:32] They're just being stored on GitHub, waiting to be merged to main.
[00:00:36] The moment they're merged to main, that's when they're actually live on your website and
[00:00:42] people will see it.
[00:00:43] So there are two ways to do this.
[00:00:44] There are two ways to merge your code to main.
[00:00:48] One way, and this is kind of the best practice way, but it's actually not going to be the
[00:00:51] way we do it, is to create a pull request.
[00:00:55] What pull requests are are basically a process in GitHub where you are merging your branch
[00:01:02] into another branch.
[00:01:04] And pull requests are typical because when you do a pull request, other people can review
[00:01:09] your pull request, right?
[00:01:10] So they can review your code changes, make sure it looks good and approve it.
[00:01:15] And it gives you a nice paper trail of those reviews as well, which is a very good thing.
[00:01:20] But when you're working on your own, there's kind of a faster way to do this.
[00:01:24] And we're going to go through that process.
[00:01:26] So this isn't the best practice way to do it.
[00:01:28] This is more of the, I want to move fast and break things process, which is better if you're
[00:01:33] just working on your own, which is just having the AI review the code changes and merge it
[00:01:39] into main for you.
[00:01:40] So we're not going to do the pull request route, which is better way to do it if you
[00:01:44] have multiple team members on your team so that other people can review your changes before
[00:01:49] you push it.
[00:01:50] If you're working on your own, which I'm going to assume a vast majority of people taking
[00:01:54] this course or doing, we're just going to have the AI do it.
[00:01:57] So let's go in here.
[00:01:58] We have our three AI agents up.
[00:02:00] We are in our notes agent here.
[00:02:02] And we're going to say, please merge this code with the master branch and push it.
[00:02:09] And I'm going to hit enter on that.
[00:02:11] And that is going to command claw to go take the code, switch to main, merge the code from
[00:02:18] notes to main and then push it to main.
[00:02:21] So we're going to hit yes on this.
[00:02:23] It's switching to the master branch master and main by the way, are used interchangeably.
[00:02:28] So don't get confused by that.
[00:02:29] We switched to master.
[00:02:31] We pulled in the code from the notes branch.
[00:02:33] We merged it and then we push it into master.
[00:02:36] Now we are going to go into the calendar agent and have the same thing done.
[00:02:42] This is a really good way to do it, right?
[00:02:44] Because we're doing it one at a time.
[00:02:47] No one stepping on each other's toes.
[00:02:49] If it steps on each other's toes, the AI will figure it out and we're going to be in a really
[00:02:53] good place.
[00:02:54] So now we're into the same thing.
[00:02:56] Please merge this code with master and push it.
[00:03:00] And I'm going to hit send on that.
[00:03:02] And now it's going to do the same thing.
[00:03:03] Switch to the master branch, pull in the code from this calendar branch, merge it together
[00:03:07] to make sure there's no conflicts and then push it back to master.
[00:03:11] So I'm going to hit enter on that.
[00:03:12] And actually found conflicts in the merge, right?
[00:03:15] So there is code from the notes branch that actually conflicts with the code in the calendar
[00:03:22] branch.
[00:03:23] And what it's going to do is it's going to figure out how to get both of those in there
[00:03:26] at the same time.
[00:03:27] So it's going to resolve those conflicts.
[00:03:29] It's called conflict errors.
[00:03:31] They're going to resolve it for us.
[00:03:33] So it's going in, as you can see, it's finding the conflicts.
[00:03:36] It's figuring out ways to put the functionality together.
[00:03:38] It is completed the merge for us and it is pushing.
[00:03:41] If you were a developer before AI, this is amazing because this is the type of thing that
[00:03:45] would take you hours and hours and hours to solve these types of conflicts.
[00:03:48] But the AI does it for us.
[00:03:50] So we're going to hit enter on that and it is going to push that now merge change to master
[00:03:55] for us.
[00:03:56] Boom.
[00:03:57] Those are merged.
[00:03:58] If I check GitHub now and pull this over, you can see the other two pull requests are
[00:04:02] gone.
[00:04:03] Now it's just a to-do list.
[00:04:04] So let's do the final thing here for to do.
[00:04:05] So I said the same thing here.
[00:04:07] Please merge as code master and push it.
[00:04:08] I'm going to hit yes.
[00:04:10] It found conflicts, which is totally normal.
[00:04:12] It's going to solve those conflicts and it's going to push this code for us.
[00:04:15] All right.
[00:04:16] So looks like it merged that.
[00:04:17] So everything's merged together.
[00:04:19] Everything is in the master branch.
[00:04:21] Now let's test it out.
[00:04:22] The CEO goes, okay, I'd like to test the master branch now.
[00:04:28] Please run it.
[00:04:30] All right.
[00:04:31] Let's test this.
[00:04:32] Let's see if all the changes went together merged.
[00:04:34] It's going to install and run all the dependencies for us.
[00:04:37] We're going to hit yes on that.
[00:04:38] Boom.
[00:04:39] So running, let's check it out.
[00:04:40] It should have all our features and functionality in it.
[00:04:43] And let me tell you the fact that we did this in what, like, five minutes merged all of
[00:04:47] those branches, figured out all those conflicts is actually incredible.
[00:04:52] If this was before AI, literally that might have been an eight-hour exercise.
[00:04:56] We just did literally like eight-hour exercise merging all that, figuring out all the conflicts.
[00:05:01] The fact that AI did that in legitimate in like three minutes is mind-blowing.
[00:05:05] Okay.
[00:05:06] So here we go.
[00:05:07] Look, calendar, boom.
[00:05:10] That shows up.
[00:05:11] Notes.
[00:05:12] Let's click that, boom.
[00:05:13] That shows up.
[00:05:14] And then the to-do list.
[00:05:15] This is a to-do.
[00:05:16] Boom.
[00:05:17] It works.
[00:05:18] They were all merged together in our master branch.
[00:05:21] If this was a live app at all, now be live in our app, live on the internet.
[00:05:25] That is amazing.
[00:05:26] Let's recap what we just learned here, right?
[00:05:29] We learned this incredible new workflow that allows us to spin up multiple agents at the
[00:05:34] same time, work on many different features at the same time.
[00:05:38] And then when we're done, merge all the code together.
[00:05:40] We did that through work trees and branches, which are basically ways to separate out the
[00:05:46] code and create separate timelines through GitHub.
[00:05:49] We get paper trails.
[00:05:51] We get history.
[00:05:52] If we mess things up, we can rewind.
[00:05:54] You now, by watching this mini course, learned how to manage GitHub, track multiple changes
[00:06:01] and spin up many different agents at once.
[00:06:03] If you want to scale this up and have 100 agents going at the same time, you now can
[00:06:06] do it because you now have a safe way to create and merge code together.
[00:06:10] Hope this was helpful.
[00:06:11] Hope you learned something here and I'll talk to you soon.