---
title: "Building a Blog with spec-kit: From Constitution to Code"
date: "2025-11-08"
author: "Timo Willemsen"
excerpt: "A journey through building a modern blog application using spec-kit, from defining project principles to a fully functional markdown-based blog."
tags: ["spec-kit", "development"]
---

I wanted to try **[spec-kit](https://github.com/github/spec-kit)**, a structured approach to software development that focuses on planning, documentation, and clear principles before you start coding. To give it a real test, I decided to build a simple blog application using the spec-kit workflow. This blog you're reading right now is that application.

## Installing spec-kit

Before getting started, you'll need to install spec-kit. The recommended way is using `uv`, a modern Python package and environment manager:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

**Adding spec-kit to your project:**

Once installed, navigate to your project directory and initialize spec-kit:

```bash
specify init .
```

This sets up spec-kit configuration and assets in your project. The initialization process will prompt you to specify which AI coding assistant you're using (e.g., Claude Code, GitHub Copilot, or Gemini CLI).

## The spec-kit Workflow

spec-kit follows a structured workflow that takes you from initial concept to implementation. Each step builds on the previous one, so you have a solid foundation before writing any code.

## Step 1: Establishing Principles

Before writing any code, I started with the constitution command:

```bash
/speckit.constitution Create principles focused on code quality, testing standards, user experience consistency, and performance requirements
```

This generated a project constitution that would guide every decision throughout the project. It became the foundation for evaluating every technical choice.

The constitution gave me clear decision-making criteria and a reference point for discussions. When I later chose technologies or patterns, I could check if they aligned with my principles.

## Step 2: Feature Specification

With principles in place, I moved to specification:

```bash
/speckit.specify Build a simple blog application for Timo Willemsen. The blog will feature stories and insights about engineering management at RTL, with a focus on AI-driven productivity improvements.
```

This generated a detailed feature specification document. During the specification process, I realized I wanted markdown file-based content management instead of a full authoring interface. I just clarified this, and spec-kit updated the specification.

The specification process helped me think through user stories, identify key entities and their relationships, and define success criteria upfront. The spec document became my contract: every feature I built had to satisfy these requirements.

## Step 3: Implementation Planning

Next, I created the implementation plan:

```bash
/speckit.plan The blog uses Vite, Tailwind and ShadCN. Use minimal dependencies, no database, fully stateless from markdown files.
```

This is where spec-kit's constitution checking was useful. The plan command analyzed each technology choice against the constitution, verified alignment with my principles, and generated a structured project layout. The planning phase showed me potential conflicts, missing considerations like accessibility and performance, and dependencies between components.

## Step 4: Research & Design

Before implementation, spec-kit automatically generated supporting documents:

- **`research.md`** - Technology decisions with rationale
- **`data-model.md`** - Data structures and relationships
- **`contracts/components.md`** - Component interfaces and behavior

These documents worked as design contracts. When I started implementing, I knew exactly what each component should do and how it should behave.

This phase saved time by removing guesswork about component interfaces, establishing clear data flow from the start, and documenting technology decisions with reasoning.

## Step 5: Task Generation

With the plan complete, I generated actionable tasks:

```bash
/speckit.tasks
```

This command analyzed the specification and plan, then generated a detailed, dependency-ordered task list. Each task was linked to specific user stories, organized by implementation phase, and clear about dependencies. The task list gave me a clear roadmap for implementation with proper dependency management and progress tracking.

## Step 6: Implementation

Finally, I started implementation:

```bash
/speckit.implement
```

This command guided me through the implementation phases. At each step, it referenced the relevant parts of the specification, checked that implementations matched the contracts, and suggested next steps based on dependencies. The implementation process felt different because I wasn't making decisions on the fly. Every component had a clear contract to follow, and I could focus on writing code rather than designing.

### Iterations During Implementation

During implementation, I discovered bugs and made design improvements. This is where an important aspect of spec-kit's workflow became clear: **modifying the spec and plan during implementation is expected and normal**. The workflow is iterative, not rigid.

When I found issues or wanted to make changes, the workflow looked like this:

```
Issue/Change Identified (during implementation)
    ↓
Update Specification (what should it be?)
    ↓
Update Contracts (how should components behave?)
    ↓
Generate/Update Tasks
    ↓
Implement
    ↓
Verify against Spec & Contracts
```

For example, when I discovered that the `gray-matter` library (used for parsing frontmatter) requires Node.js's `Buffer` API which isn't available in browsers, I would:
1. Update the specification to document browser environment compatibility as a requirement
2. Update the component contracts if needed
3. Add a task for the fix (adding a Buffer polyfill)
4. Implement the fix
5. Verify it works

The same process applied to layout changes: I would update the spec with new design requirements, update component contracts with styling requirements, then implement.

**Important**: The spec and plan are living documents. They evolve as you learn more during implementation. Modifying them during implementation is not a failure of the process. It's the process working as intended. You learn things during implementation that you couldn't know upfront. The value is in documenting those learnings and keeping everything in sync.

## What Made This Process Different

Traditional development often goes: idea → code → refactor → document. spec-kit flips this: idea → principles → spec → plan → research → tasks → code.

The key differences were that decisions were intentional and evaluated against principles, the upfront work prevented architectural mistakes, components had defined interfaces before implementation, and documentation was built into the process rather than being an afterthought.

## The Value of Structure

The spec-kit workflow might seem like overhead, but it actually saves time. Clear contracts mean fewer integration issues and less debugging. There's no decision paralysis during coding, principles guide every line for better code quality, and everything is documented and structured for easier maintenance.

## Lessons from the Process

Start with principles. They make every subsequent decision easier. Use spec-kit before planning because understanding what you're building is crucial. Plan before coding to validate your approach. Document as you go since it's easier than retrofitting later. Trust the process. The structure guides you to better outcomes.


## Conclusion

Using spec-kit resulted in a well-structured, documented project. The process felt slower at first, but the upfront investment paid off with no architectural rewrites, a clear understanding of what I was building, helpful documentation, and code that follows consistent patterns.

The blog application I built is solid, and the process I followed ensures it will be maintainable and extensible. The value of spec-kit lies in how you build, not just what you build. And as I discovered, that value extends to iterations and changes too. The structured approach keeps everything intentional, even when fixing bugs or improving the design.

---

*The spec-kit workflow documentation for this project is available in the `specs/` directory, showing the complete journey from constitution to implementation.*
