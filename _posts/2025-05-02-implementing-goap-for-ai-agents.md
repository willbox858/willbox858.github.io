---
layout: post
title: "Implementing GOAP For AI Agents"
date: 2025-05-02
tags: ["Game AI", "GOAP", "Unity"]
image: "images/goap-debug-demo.gif"
read_time: "5 min read"
excerpt: "GOAP is most widely known for it's use in the F.E.A.R series, where (when combined with clever level design and audio queues) it became famous for having the 'smartest AI in games.'"
---

GOAP is most widely known for it's use in the F.E.A.R series, where (when combined with clever level design and audio queues) it became famous for having the "smartest AI in games." But, the interesting things about GOAP extends to outside the realm of games. In here, we'll be discussing GOAP, Behavior Trees, what they do, why GOAP is so neat, and take a look at my GOAP implementation in Unity.

AI agents are the spice that bring many games to life. They provide a reactive challenge to players, forcing them to be adaptive and smart in how they pick fights. In the best case scenarios at least. At their worst, enemy AI can be boring and actually detract from a game's fun. So, how do we build fun, reactive, and intelligent AI for our games?

## What's a GOAP?

GOAP is an acronym that stands for Goal Oriented Action Planning, and it's that last word that makes GOAP so interesting, even some 20 years after the technology was unveiled for the game F.E.A.R.

## Why is Planning Special?

Unlike GOAP, most AI systems are actually incapable of forming plans. This is because they're built using what are known as "Behavior Trees." These systems utilize fixed connections between the actions an agent can perform in order to accomplish its goals, these action/goal pairings are also called Behaviors. As an easy example, let's say we have an AI agent with a sword. When it sees the player, it will likely trigger its "Attack_With_Melee" behavior, which tells the agent to run up to the player and hit them with their sword. Within a Behavior Tree, these are fixed. So, unless a different behavior is triggered, that exact sequence of actions is what the AI will do.

## This is where Planning comes in.

GOAP on the other hand, is capable of planning, and is actually one of a variety of AI systems known as "planning systems." When a GOAP agent decides to do something, it goes through several steps. First, it determines what it needs to do (it finds a goal). Then, the agent looks at what is supposed to happen when it reaches its goal, and compares that against what things are like currently (it looks at the world-state, and compares it to the current world-state). Finally, the AI then looks over all the things it can do (actions), and builds a plan that uses its actions to incrementally accomplish its goal. Kind of like a person! What's really cool about this though, is that it means agents have totally free reign to accomplish their goals, within the limits of the software obviously.

## Oh yeah, this is also about A*

One of the unique things about GOAP is that it actually understands Action as a navigable space that it "moves" through in order to build its plans. Below is a snippet of code from my A* (A-Star) implementation I made to use for GOAP specifically. This is what allows the system to be so flexible. A designer just has to give an agent a bunch of actions and goals, then the agent figures the rest out on its own!

```csharp
foreach (var action in availableActions)
{
    if (!action.Effects.Any(unsatisfiedBeliefs.Contains))
    {
        continue;
    }
    
    var newRequiredEffects = new HashSet<Belief>(unsatisfiedBeliefs);
    
    newRequiredEffects.ExceptWith(action.Effects);
    
    newRequiredEffects.UnionWith(action.Preconditions);
    
    var newAvailableActions = new HashSet<Action>(availableActions);
    newAvailableActions.Remove(action);
    
    var newNode = new Node(current, action, newRequiredEffects, current.Cost + action.Cost);
    
    openSet.Add(newNode);
    
    current.Leaves.Add(newNode);
}
```

## A* and GOAP: A Match Made in AI Heaven

So what's actually happening in that code? Well, A* is typically used for pathfinding - you know, getting your character from point A to point B without running into walls. But in GOAP, we're using it to find a path through possible actions instead of physical space.

Think of it like this: each action is a "node" in our search space. The "distance" between nodes is the cost of taking that action. And the "destination" is a world state where our goal is satisfied. A* helps us find the cheapest (most efficient) sequence of actions to reach our goal.

What makes A* special is that it's both complete (it will find a solution if one exists) and optimal (it will find the best solution). It does this by using a heuristic function to estimate how close each potential action gets us to our goal. In GOAP, this heuristic is often just the number of unsatisfied conditions remaining.

The code above is exploring each possible action, checking if it helps satisfy our goal, and then creating new nodes for the search to continue. It's building a tree of possible action sequences, and A* helps us navigate that tree efficiently.

## But How Do We Know What's Going On?

Here's the thing about GOAP - it's super powerful, but it can also be a total nightmare to debug. When your AI is doing something weird (and trust me, it will), how do you figure out what's going on in its digital brain? Is it choosing the wrong goal? Is it building a bad plan? Is it executing the plan incorrectly?

This is where good debug tools become absolutely essential. Without them, you're basically flying blind, trying to guess why your carefully crafted AI is running in circles or staring at walls instead of doing something useful. Below is a simple debugger I made for my own GOAP implementation, and while it isn't much, something is way better than nothing when dealing with systems like this.

<div class="gif-container">
    <img src="/images/goap-debug-demo.gif" alt="GOAP Agent with Debug UI">
    <p class="gif-caption">GOAP agent navigating its environment with the debug UI showing its current goal, action, and beliefs. Notice how the beliefs change as the agent runs around and does his thing.</p>
</div>

GOAP is a powerful AI system that gives your agents the ability to form dynamic plans to achieve their goals. By leveraging A* for plan generation and adding a robust debug UI, you can create intelligent, adaptable agents that are actually manageable to work with.

The next time you're working on an AI system, remember that visibility into your agent's decision-making process is just as important as the intelligence of the system itself. Good debug tools don't just make development easier - they make it possible to create more complex and interesting AI behaviors.

And isn't that what we all want? AI that surprises us, adapts to player actions, and creates those memorable gameplay moments that players will talk about long after they've put the game down.