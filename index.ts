/**
 * ========================================================================================================================
 *
 * ███╗   ███╗ ███████╗ ███╗   ███╗ ██████╗  ██████╗   █████╗  ███╗   ██╗ ███████╗
 * ████╗ ████║ ██╔════╝ ████╗ ████║ ██╔══██╗ ██╔══██╗ ██╔══██╗ ████╗  ██║ ██╔════╝
 * ██╔████╔██║ █████╗   ██╔████╔██║ ██████╔╝ ██████╔╝ ███████║ ██╔██╗ ██║ █████╗
 * ██║╚██╔╝██║ ██╔══╝   ██║╚██╔╝██║ ██╔══██╗ ██╔══██╗ ██╔══██║ ██║╚██╗██║ ██╔══╝
 * ██║ ╚═╝ ██║ ███████╗ ██║ ╚═╝ ██║ ██████╔╝ ██║  ██║ ██║  ██║ ██║ ╚████║ ███████╗
 * ╚═╝     ╚═╝ ╚══════╝ ╚═╝     ╚═╝ ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚══════╝
 *
 * Welcome to Membrane!
 *
 * This hands-on tour will guide you through Membrane's core concepts and features.
 *
 * To get started, open the Membrane Explorer and Membrane Logs in VS Code by opening your command palette and typing:
 * 1. "Membrane: Focus on Membrane Explorer View"
 * 2. "Membrane Logs: Focus on Membrane Logs View"
 *
 * Ok, let's move onto step 1!
 * ========================================================================================================================
 */

/**
 * ========================================================================================================================
 * STEP 1 | Membrane persistence
 * ========================================================================================================================
 */

// Each Membrane program has its own dedicated storage provided by the `state` object.
// Import `state` in your program and use it to store any data specific to that program.
import { state } from "membrane";

// We'll use `state` here to store your name and a count of the updates you've made to this program.
state.name = "[add your name here]";
state.updates ??= 0; // `??= 0` (nullish coalescing assignment) is equivalent to `= state.updates ?? 0`
state.updates++;

// When you save this file, Membrane will instantly deploy and execute your program.
// Save your file and see your name and update count printed to the Membrane Logs console.
console.log(`Hello, ${state.name}!`);
console.log(`Update count: ${state.updates}`);

// To learn more about persistence in Membrane, visit: https://www.membrane.io/durable-programs

/**
 * ========================================================================================================================
 * STEP 2 | Membrane actions
 * ========================================================================================================================
 */

// A Membrane program can export _actions_ that you invoke. This program exports a `run` action.
// Let's invoke the `run` action, defined as a function below. To invoke an action, you can:
// 1. Click on the "Invoke ▶️" button directly above the function signature
// 2. In the Membrane Explorer, click "getting-started" then click "Invoke" to the right of "run"
// 3. Use the Command+Enter keyboard shortcut

export async function run() {
  console.log("Invoking `run` action...");
}

// To learn more about actions in Membrane, visit: https://www.membrane.io/the-graph

/**
 * ========================================================================================================================
 * STEP 3 | Membrane `sms` and `email`
 * ========================================================================================================================
 */

// Membrane comes with several built-in utils that your programs can install, like `sms` and `email`.
// This program already has `sms` and `email` installed as dependencies. We'll cover how to add new dependencies later.

// You can access a dependency by importing the `nodes` object (or add `nodes` to your import statement in STEP 1).
import { nodes } from "membrane";

// Let's invoke the `ping` action below that sends you an email.
export async function ping() {
  await nodes.email.send({
    subject: "Getting started with Membrane",
    body: `Hello, ${state.name}!`,
  });

  // Membrane's `sms` util works similarly to `email`. Try uncommenting the `sms` invocation below.
  // You'll first have to configure your phone number by clicking "sms" then "configure" in the Membrane Explorer.
  // await nodes.sms.send({ message: `Hello, ${state.name}!` });
}

// Membrane `sms` can also handle your responses to texts!
// Try replying to the text from Membrane, and keep an eye on Membrane Logs to see your response printed to the console.

// To learn more about `sms` and `email` in Membrane, visit: https://www.membrane.io/example-sms-reminders

/**
 * ========================================================================================================================
 * STEP 4 | Membrane timers
 * ========================================================================================================================
 */

// Instead of invoking actions manually, you can invoke them on a timer.
// Membrane supports three main types of timers:
// 1. Delays
// 2. Scheduled
// 3. Crons

// Let's set up the `ping` action to run on a timer.
// In the Membrane Explorer, click on "getting-started" then click the clock icon to the right of "ping".
// Select the type of timer you want (e.g. "Invoke after delay...") and when you want it to run (e.g. "10s").
// After clicking the green check to confirm, your timer will show up in the bottom right panel of the explorer.
// For crons, you can see upcoming scheduled invocations by hovering over the timer.
// You can delete any timer by right clicking it and selecting "Delete".

// To learn more about timers in Membrane, visit: https://www.membrane.io/cron-jobs-and-timers

/**
 * ========================================================================================================================
 * STEP 5 | Membrane HTTP endpoints
 * ========================================================================================================================
 */

// Every Membrane program comes with its own HTTP endpoint.
// You can export an `endpoint` function to expose a REST API, serve HTML, handle webhooks, etc.
// Uncomment the `endpoint` function below that returns a simple HTML page.
export async function endpoint(req) {
  const headers = { "Content-Type": "text/html" };
  const body = `<h1>Welcome to Membrane, ${state.name}!</h1>`;

  return JSON.stringify({ headers, body });
}

// As mentioned, Membrane instantly deploys your program on save, so your HTTP endpoint will be live immediately.
// To access your endpoint, right click "getting-started" in the Membrane Explorer and select "Open endpoint URL".
// Try editing the HTML, hit save, and refresh the page.
// You have a live website that you can edit and deploy instantly!

// To learn more about HTTP endpoints in Membrane, visit: https://www.membrane.io/http-endpoints

/**
 * ========================================================================================================================
 * STEP 6 | Membrane observability
 * ========================================================================================================================
 */

// Steps 1-5 illustrate a core feature across all of Membrane: everything gets recorded in Membrane Logs.
// Every program update, action, timer, endpoint request, etc. will be logged.

// For example, in step 5 when you open your endpoint URL in the browser, you'll see the request printed in Membrane Logs.
// Try clicking into that `endpoint` log to view more detail about the request.

// To learn more about observability in Membrane, visit: https://www.membrane.io/observability

/**
 * ========================================================================================================================
 * STEP 7 | Membrane API drivers
 * ========================================================================================================================
 */

// Similar to built-in utils like `sms` and `email`, Membrane has an ever-growing collection of API drivers.
// Drivers are Membrane programs that connect to APIs like GitHub, Google Docs, Slack, OpenAI, etc.

// The Membrane team maintains a set of open-source drivers and examples, which anyone can contribute to.
// To view and install drivers and examples, click "NEW" then "Program Registry" in the Membrane Explorer.
// Or, visit Membrane's drivers directory on GitHub: https://github.com/membrane-io/directory

// As an example, install the `github` driver and add it to your program's dependencies.
// To add a dependency to a program, drag 'n drop the program from the Membrane Explorer:
// 1. Into the bottom right "CONFIG" panel
// 2. Directly into your code

// Create a personal access token on GitHub and configure it by clicking `github` -> `configure` in the Membrane Explorer.
// Uncomment the function body below and invoke the `getGitHubProfile` action to fetch your GitHub profile location.

export async function getGitHubProfile() {
  // const user = nodes.github.users.one({ name: "[add your username here]" });
  // const location = await user.location;
  // console.log(location);
}

// To learn more about drivers in Membrane, visit: https://www.membrane.io/open-integrations-model

/**
 * ========================================================================================================================
 * STEP 8 | The Membrane Graph
 * ========================================================================================================================
 */

// Membrane's core structure is represented as a graph, where each Membrane program is a node in the graph.
// This program is a node with other nodes in its subgraph, like the `ping` action.
// This program also connects to other nodes in the graph, like `email`, `sms`, and `github`.

// A Membrane program's graph is represented by its Schema.
// You can view and update your program's schema in the bottom right panel of the Membrane Explorer.
// When you update a program's schema in the explorer, the program's `memconfig.json` file will automatically update.
// You should never have to manually edit `memconfig.json` nor `memconfig.lock`.

// To learn more about the Membrane graph, visit: https://www.membrane.io/the-graph
