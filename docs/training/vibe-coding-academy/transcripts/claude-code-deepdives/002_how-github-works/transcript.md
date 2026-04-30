[00:00:00] Let's real quick before we go into the workflow, just make sure we're on the same page when it comes to what GitHub is and how it works.
[00:00:06] GitHub is an online repository for your code. It is the most popular online repository for code in the entire world.
[00:00:13] It's owned by Microsoft. It makes it super easy to edit back up and make changes to your code.
[00:00:18] If you put any code live or shipped an app or anything, your code right now probably lives in GitHub.
[00:00:23] If you went through the previous course, you put your code on GitHub and then on to Versailles.
[00:00:28] And so you have your code here. One thing you'll notice here is we have the main branch.
[00:00:33] So this is where the true version of your app lives, right?
[00:00:36] This is your source of truth is your main branch. When people go to your website, this is the code they see.
[00:00:42] But you can also have what's called branches. Branches are basically alternative timelines of your code.
[00:00:49] So if you create separate branches, it basically makes a copy of your main branch and branches off from there like a tree.
[00:00:56] These are all tree metaphors, but they're tree metaphors for a reason because they literally branch off like branches on a tree from your main branch.
[00:01:04] This is great for ensuring that when you make code changes, the changes don't conflict with each other.
[00:01:10] You make the changes in separate branches. And then when you're ready to ship it live, you merge those changes into main.
[00:01:17] This is a great way of working because if you're doing multiple things at one time or you have multiple people working on a project,
[00:01:24] they're not going to step on each other's toes.
[00:01:26] This also in the age of AI allows you to have multiple AI agents working on an app.
[00:01:32] So before these branches were really for around having entire software teams working on an app,
[00:01:37] but now you can have multiple agents working on an app.
[00:01:41] And that is the basis of the workflow we're about to go through, which is showing you how to spin up branches for each feature you're going to make each bug fix
[00:01:48] and then spin up work trees, which are going to be the local code you're working on on your computer.
[00:01:53] You want to do branches if you're adding new features, if you're making tiny tweaks, tiny changes, if you're fixing bugs,
[00:01:59] any type of code changes you're going to make, you want to do it on its own branch so that when you're done,
[00:02:06] you can merge it onto main and make sure there are no conflicts.
[00:02:09] We create work trees as a way to separate code on our computer.
[00:02:13] So we make a work tree on our computer, which is basically just copying the code onto our computer in its own workspace.
[00:02:19] You make the changes there, you commit it to the branch, which is on GitHub, and then you merge it into main.
[00:02:24] Again, so many benefits to this.
[00:02:26] It's going to allow you to be faster and more efficient because you can use multiple agents.
[00:02:30] Gives you a paper trail allows you to rewind if you make any mistakes.
[00:02:34] These are all big wins.
[00:02:35] And even if you work by yourself, you want to match this workflow about to show you, because it's going to allow you to be more efficient.
[00:02:41] So the next video, we're going to get more practical.
[00:02:43] I'm going to spin up a project.
[00:02:45] We're going to create branches for work trees.
[00:02:47] And I'll show you how to actually do this inside of Claude code.
[00:02:51] I'll see you in that next video.