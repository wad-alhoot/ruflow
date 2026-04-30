[00:00:00] All right, we got our agent set up. We're now ready to start multitasking and getting a lot
[00:00:04] more efficiency out of this. So we're in the notes work tree here. We're going to say you're
[00:00:09] working on a project management app. Currently, it's just a can bin board. Let's add a section
[00:00:20] where we can take notes. This needs to be a rich text editor. And I'm going to hit enter on that.
[00:00:28] Well, actually do is we'll do this on plan mode. So that's a plan right there. And like, you can start
[00:00:33] to see the workflow here formulate how what the mindset is is we have our different agents in our
[00:00:39] different work trees. And we're going to start prompt them one by one. We can track their progress
[00:00:44] across the different windows. And we're just going to be really quick adding all of these new
[00:00:48] features in we're working three times as fast here. So now we're in the calendar work tree. Let's go
[00:00:53] to plan mode for this here. I want to add a calendar component to this project management
[00:01:01] tool where I can add events to a small calendar. I'm going to hit enter on that. And then our next
[00:01:09] one, which is our two list, I want to add a simple to do list to our app where I can track
[00:01:18] quick to do items. And I'm going to go into plan mode on that and hit enter. And they get to work. Now
[00:01:25] I'm going to go back to our first agent. And I'm going to hit yes on proceed as it's looking at our
[00:01:29] code. Yes on this. And they're basically all exploring the code base to see what the code is
[00:01:35] and understand how our app works. Then after they understand our code, they'll be able to get to
[00:01:40] work and start writing our features and functionality for us. You just want to keep that in mind,
[00:01:44] whenever you spin up a new agent and create a new work tree, that agent doesn't have any context
[00:01:48] on your app or how it works. So it's going to need to walk through the code and understand it
[00:01:52] first. You want to make sure you're talking to it as if it's an agent that hasn't looked at your
[00:01:57] code yet and doesn't know how anything works. So now it has a good understanding of the code base.
[00:02:00] Before I design the notes feature, I have a few questions to clarify. Okay, how would the user
[00:02:05] navigate from the cam and boards and note section? Let's have some tabs at the top. Let's actually
[00:02:10] have notes in the sidebar, which text which rich rich text features do you need will go basic.
[00:02:16] How should your notes be organized? We're going to make it a simple list. And then we're going to
[00:02:19] hit submit on that. Where should the calendar component be placed in the UI? Let's make it a
[00:02:24] modal pop up should calendar events be linked to can band tasks. I'll make them independent for now.
[00:02:29] What information should each calendar event have? And we're just going to make that basic. And we're
[00:02:33] going to submit that. Where should the do do list live in the app? Let's do this in a sidebar
[00:02:39] panel. What feature do you need for the to do list? We're going to keep it basic and we're going to
[00:02:44] hit submit and now they're going and they're all working on their own features, which is amazing.
[00:02:48] Three times as much speed as you normally have you're just sitting there staring at one agent. And the
[00:02:52] best part is is like you don't have that downtime, right? Typically when you're talking to an agent
[00:02:57] and is doing work, you do a command, you sit there and you watch it for like five minutes,
[00:03:00] do whatever it's doing. Now you don't have that downtime. You don't have those distractions. You
[00:03:06] can keep talking and keep working with different agents. Instead of getting distracted and going
[00:03:10] on Twitter or TikTok or whatever you do while your agent works, you'll have other agents to talk to
[00:03:15] instead. So I'm going to yes an auto accept on all three of these and they're going to get to work.
[00:03:20] They're going to start writing the code and gain these features implemented. Now part of this workflow
[00:03:25] which will be in the next video is how we're going to merge all this together because honestly
[00:03:29] since we're towards beginning this project, it's probably going to step on each other's toes,
[00:03:33] have components on top of each other. But that is totally fine. We will go through merging right
[00:03:37] after this. It won't be too complicated. All right, looks like all three have finished coding
[00:03:42] rather quickly here. They all want to run their own servers. Let's do that so we can test each
[00:03:46] one individually. So first we are going to test the note taking functionality which is in its own
[00:03:52] note taking branch. It's going to run its server which again it's not going to have the other
[00:03:57] functionality from the other two agents. But we'll be able to test it and if it works well we can
[00:04:01] merge it after. So that is working 3003. Let's pop that open. My guess is this is going to work
[00:04:08] because Claude code is excellent. Let's take a look here. Okay, here's our can bin board. We've got
[00:04:12] this new note section. Let's click notes. Okay, we got errors. Let's fix that. So I'm going to copy
[00:04:18] and paste this error in and say I get this error when I click notes. Now I'm going to paste it in.
[00:04:28] All right, looks like it's fixed. Let's pop this open here. Let's click notes. Boom, notes. I like
[00:04:33] that slide out animation. That is nice. Boom, new note. I like that. This is a note and then let's
[00:04:39] click bold. This is a bold note. Love that. That is nice. I like the way that looks. Okay. All right,
[00:04:46] that's looking good. Auto saves. That's good. All right. Now let's move on to the calendar component.
[00:04:52] I'm going to hit yes on this. Let's build this and check out the calendar component to see how that's
[00:04:56] looking. While this is building this calendar component here, let's let's also make sure we do
[00:05:01] something important here. So we test the notes. The notes look good. Let's say commit and push these
[00:05:08] changes to the notes branch. And I'm going to hit answer on that. This is really important to do.
[00:05:15] Anytime you make any changes, you test them and they work. Make sure to push your changes to the
[00:05:20] branch. This is going to make sure your changes are backed up. They're safe and they cannot be lost.
[00:05:25] So you make any sort of little tiny improvements, little tiny changes, you commit it to the branch
[00:05:30] and then you push it to the branch, get a clod can handle all of this for you. You don't need to
[00:05:35] know every single little tiny GitHub commands. It'll do that for you. And what's great is it takes
[00:05:39] all your code changes, it pushes it, it adds its own notes. So it's taking care of all for you before
[00:05:45] AI. This was one of the most time consuming things you possibly can do. AI has made this
[00:05:49] significantly faster, which is great. I'm going to hit yes. And it's going to push those changes.
[00:05:54] What we're going to do in the next video is actually merge them with main. So they're all in
[00:05:57] one place. So we're over here. Let's test out our calendar changes as well done. That is now on the
[00:06:04] notes branch that is great. So that is backed up calendar server is running. Let's test out the
[00:06:08] calendar server. I'll move this. Let's move this over here. Okay, we have a new calendar button up
[00:06:14] here. Let's click that and boom, as you can see, we have a nice little calendar here. I can click on
[00:06:20] days. That is great. The calendar is looking good. So that looks good. I'm going to say looks great.
[00:06:27] Please commit and push this to the calendar branch. I'm going to hit enter on that. And then we're
[00:06:35] going to go to our third AI agent here who's been working, who's adding the to-do list functionality.
[00:06:41] And we're going to test that out in a second here. So as you can see, the second agent is adding this.
[00:06:46] It has our notes, what code change we're going to enter on that. And then we're going to do NPM
[00:06:50] run dev over here. This see this is massive multitasking. This is how you get so much more done. How
[00:06:55] productive are we being right now? We're being really productive. All right. Now let's get this
[00:07:00] up and working for the third AI agent. All right, that's on local host 3005. Let's pop that open.
[00:07:06] And this is for our new to-do list. And we look over here on the right hand side. Quick to-do's,
[00:07:11] add it to-do list ship our code, hit add. We get the to-do with nice animations. Good job,
[00:07:18] Claude. Type that. Oh, nice animation there. That looks good. Let's push and commit that. Looks
[00:07:25] great. Please commit and push our code to the to-do branch and hit enter on that. And that's going
[00:07:33] to push it. This is going to get all our code up onto the GitHub, which is going to be great. If
[00:07:40] we actually look at the GitHub itself, you can see here, there's our notes. There's our calendar.
[00:07:45] They had recent pushes. You can see all our branches here. If you click on branch, that looks great.
[00:07:50] And what we're going to do in the next video is merge this all into main so that all the code
[00:07:55] lives in one place. So that is pushed. That is good to go. In the next video, we're going to merge it all,
[00:08:00] which is going to be the final step of this multitasking process. I will see you in the next video.