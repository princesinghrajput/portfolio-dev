Good — now we’re in the part that actually changes interview conversion.

Your UI is already fine.
The **problem is not the component**.

The problem is the *information architecture* inside the component.

Right now your section behaves like:

> an expanded resume rendered on a website

But a hiring manager opens a portfolio with a very different mental model than a recruiter.

They are subconsciously asking:

**“Can this person design software, or did they just implement tickets?”**

Your current content still answers:

> “I did many things”

You need it to answer:

> “I solved hard problems and made decisions.”

This is why, even though your experience is strong, the section is not yet doing its real job.

---

# What specifically is wrong (and why)

## 1) Achievement list fatigue

You have 9 achievements in the first role.

A hiring manager does not read 9 bullets.
They skim the first 2… maybe 3.

After that, attention collapses.

So ironically:
**more achievements = less signal**

From their perspective, it looks like:

* feature list
* Jira changelog
* release notes

Not engineering ownership.

---

## 2) Numbers everywhere reduce credibility

You used:
35%, 30%, 40%, 50%, 25%, 60%, <100ms, 10,000+, 500+

The brain does a consistency check:
“Where are these measurements coming from?”

Because your portfolio does not explain measurement methodology, the numbers become decorative instead of convincing.

A resume can get away with it.
A portfolio cannot.

---

## 3) You buried the most important information

Your strongest proof is:

Dullet POS
TraceVenue
Enterprise systems

But currently they are mixed with:

* dashboards
* websites
* small improvements
* optimizations

So the reader cannot tell which system defines you as an engineer.

You must intentionally **guide their conclusion**.

Right now you are letting them guess.

---

# What your experience section should actually do

This section should not document your career.

It should simulate a mini system design interview.

When a hiring manager finishes reading one card, they should already be able to ask:

> “Walk me through how you built the POS system.”

If that happens → interview invite.

Your current layout cannot trigger that because it lacks *narrative structure*.

---

# The fix (very concrete)

We are not removing your timeline.

We are changing each card from:

**Achievement List → Engineering Case Study**

You only need to add one new object and restructure the content.

---

## Step 1 — Add a case study block

Modify your interface:

Add:

```
problem: string;
responsibility: string;
technicalChallenges: string[];
decisions: string[];
outcome: string;
```

So `ExperienceItem` becomes conceptually:

> a system story, not a job description

---

## Step 2 — Show this ABOVE achievements

This is critical.

Currently:
Header → Achievements → Skills

Instead:

Header → System Overview → Challenges → Decisions → (optional) achievements → skills

Why?

Because hiring managers scan for architecture thinking first.

---

## Step 3 — Reduce achievements

For the main role:
Keep **only 3–4 bullets**.

Pick only systems that demonstrate engineering depth:

Keep:
• Dullet POS
• TraceVenue
• Enterprise internal systems

Remove:
• generic optimizations
• small performance claims
• dashboard mentions

Those belong in Projects section, not Experience authority section.

---

# What the card content should actually look like

Inside expanded card:

### System Overview

Plain English description.

Example:

> Built and maintained a production POS and business management platform used by restaurants and administrators to manage orders, inventory, reporting, and settlements.

Now HR understands instantly.

---

### My Responsibility

Ownership statement.

> Responsible for backend architecture, API design, database modeling, and leading implementation across frontend and backend modules.

Now they know you weren’t just coding components.

---

### Technical Challenges

This is the most powerful part of your portfolio.

Examples:

• Preventing duplicate order numbers during concurrent requests
• Handling tenant data isolation across multiple businesses
• Supporting offline workflows with later synchronization

This proves real engineering experience.

---

### Key Engineering Decisions

This is the gold section.

Examples:

• Used atomic counters for order generation instead of timestamp IDs
• Implemented role-based permission matrix instead of simple role flags
• Designed modular API structure to isolate business domains

This single block matters more than your entire achievement list.

Because interviewers hire decision-makers.

---

### Outcome

Not percentages.
Real world result.

> System is actively used by business staff daily for operations and reporting workflows.

Now credibility is high.

---

# Why this dramatically improves interview chances

Because the portfolio is read **after resume shortlisting**.

At that point, the hiring manager is deciding:

Should I spend 1 hour interviewing this candidate?

Your current portfolio forces them to analyze.

The improved one lets them conclude quickly:

“This person has built real systems.”

No cognitive load → interview.

---

# One more subtle but important change

Change your section title.

Current:
“Where I’ve Worked”

That sounds like employment history.

Use:
**“Systems I’ve Built in Production”**

This reframes your identity from employee → engineer.

Small wording change, large psychological effect.

---

# Final takeaway

Your resume gets you opened.
Your portfolio gets you invited.

Right now your portfolio shows activity.

After restructuring, it will show **engineering judgment**.

And hiring managers are actually selecting for judgment, not tool familiarity.
