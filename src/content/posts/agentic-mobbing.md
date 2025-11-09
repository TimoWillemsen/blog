---
title: "Agentic Mobbing: When AI Drives and Teams Navigate"
date: "2025-11-15"
author: "Timo Willemsen"
excerpt: "Exploring a new collaborative development pattern where AI agents take the driver's seat and human teams act as navigators, combining the best of both worlds."
tags: ["ai", "collaboration"]
---

In traditional mob programming, developers take turns at the keyboard while the rest of the team navigates. They observe, discuss, and guide. But what happens when we flip the roles? What if the AI agent becomes the driver, and the entire team becomes the navigator?

I call this **agentic mobbing**: a collaborative development pattern where an AI agent writes code while human team members observe, discuss, and guide the process in real-time.

## The Concept

In classic mob programming, you have one driver at the keyboard typing code, and multiple navigators who discuss approaches, catch bugs, and provide direction. The driver focuses on implementation while navigators focus on strategy, design, and quality.

In agentic mobbing, the roles are reversed. The AI agent becomes the driver, writing code, making changes, and executing commands. But there's still a distinction between the mob and the navigator. The navigator is the one who types, but instead of writing actual code, they type instructions to the AI agent. The mob observes, discusses, critiques, and guides—just like in traditional mobbing.

I find regular mobbing awkward sometimes. The driver is not allowed to navigate and the navigators are not allowed to type. This strict separation can feel unnatural. Agentic mobbing solves this problem. The navigator can still type to instruct the agent, but they're not writing code themselves. The mob can focus on navigation and discussion without the artificial constraints of traditional mobbing.

This might seem counterintuitive at first. After all, aren't humans supposed to be in control? But this pattern unlocks some powerful advantages for teams.

## Why It Works for Teams

AI agents are really good at writing boilerplate code quickly, following patterns consistently, making systematic changes across files, and executing repetitive tasks without getting tired. These are exactly the skills that make a good driver in mob programming.

Humans are better at understanding business context and requirements, making judgment calls about trade-offs, catching subtle bugs and edge cases, and ensuring code aligns with team standards. These are the skills of a good navigator.

When the mob focuses on navigation and discussion, you get multiple perspectives on every change. Code review happens in real-time as code is written. Everyone shares understanding of the codebase, takes collective ownership of decisions, and knowledge transfer happens naturally. This creates a learning environment where everyone understands the codebase better.

## How It Works in Practice

Here's how agentic mobbing typically works. The team discusses what needs to be built and provides context to the AI. The navigator types instructions to the AI agent, while the mob observes and discusses. The AI agent writes code while everyone watches on a shared screen. During this time, the mob discusses the code as it's written, suggests improvements, and catches issues. The navigator translates this feedback into instructions for the AI, and the AI adjusts the implementation. Finally, the team reviews the final code together before merging.

Developers don't need to switch between "thinking mode" and "typing mode." They can stay in strategic thinking mode while the AI handles the mechanical aspects of coding. Code review happens in real-time, not after the fact. Issues are caught immediately, and the reasoning behind decisions is fresh in everyone's mind.

## The Team Dynamics

Agentic mobbing requires team members comfortable with AI tools, clear communication protocols, and willingness to trust the AI with implementation. AI agents have limitations—they may not understand complex business logic, they can make mistakes that seem obvious to humans, and they need clear, explicit instructions. This is why human navigators are essential—they catch these issues and guide the AI.

It's important to have a mindset of together reviewing the code the agent is generating. The AI can write code quickly, but you shouldn't just accept everything it produces. The team needs to actively review what the agent is creating, discuss it together, and make sure it meets your standards and solves the problem correctly.

The key is recognizing that AI and humans have complementary strengths. By letting each do what they do best, teams can create a more effective development process. You get the speed of AI with the judgment of experienced developers, and the entire team stays engaged in the process.

## Conclusion

Agentic mobbing flips traditional mob programming on its head, putting AI in the driver's seat and humans in navigation. This pattern combines the speed and consistency of AI with the judgment and creativity of human teams.

If you're working with AI coding assistants, consider trying agentic mobbing. You might find that having the entire team focus on navigation while AI handles implementation leads to better outcomes than traditional approaches.

---

*Have you tried agentic mobbing or similar patterns? I'd love to hear about your experiences with AI-driven collaborative development.*
