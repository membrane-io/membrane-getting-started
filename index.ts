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
 * This hands-on tutorial will guide you through Membrane's core concepts and features.
 * You might also want to open our docs https://docs.membrane.io in a separate tab.
 * We recorded a video of the tutorial, too: https://share.descript.com/view/Smb0rEUzMkk
 *
 * To start, make sure the Membrane Navigator (left sidebar) and Logs (bottom panel) are open in your IDE.
 * Open your command palette (ctrl/cmd+shift+P) and type:
 * 1. "Focus on Membrane Navigator View"
 * 2. "Focus on Membrane Logs View"
 *
 * We'd love to hear your feedback: shoot an email to contact@membrane.io with any questions/suggestions/etc.
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
state.updates = state.updates ?? 0;
state.updates++;

// When you save this file, Membrane will instantly deploy and execute your program.
// Save your file and see your name and update count printed to Membrane Logs (in the getting-started tab).
// You can also view state in the Config panel (bottom left, below the Navigator).
console.log(`Hello, ${state.name}!`);
console.log(`Update count: ${state.updates}`);

// 🔗 To learn more about persistence in Membrane, visit: https://docs.membrane.io/features/state

/**
 * ========================================================================================================================
 * STEP 2 | Membrane actions and fields
 * ========================================================================================================================
 */

// A Membrane program can export _actions_ that you invoke. 
// Actions can be thought of like POST requests.
// This program includes a `run` action, exported as a function. Let's invoke it by doing one of:
// 1. Click `Invoke ►` directly above the function signature.
// 2. With your cursor in the function body, type ctrl/cmd+enter.
// 3. In the Navigator, click "getting-started", then click "Invoke" to the right of "run".
export async function run() {
  state.hasRun = true;
  console.log("Invoking `run` action...");
}

// Membrane programs can also export _fields_ that resolve to values. 
// Fields can be thought of like GET requests or GraphQL fields.
// Fields can also contain subfields instead of pointing to a value directly.
// This program contains a `progress` field that resolves to a string.
export function progress() {
  return state.hasRun ? "underway!" : "waiting..."
}

// 💡 Note: there's nothing special about the names `run` and `progress`.
// We'll cover editing names and types for a program's actions and fields (aka its schema) in step 8 of this tutorial.
// 🔗 To learn more about actions and fields in Membrane, visit: https://docs.membrane.io/concepts/schema

/**
 * ========================================================================================================================
 * STEP 3 | Membrane `sms` and `email`
 * ========================================================================================================================
 */

// Membrane comes with a few built-in programs that your programs can use, like `sms` and `email`.
// This `getting-started` program already includes `sms` and `email` as connections (similar to npm dependencies).
// You can see those connections in the Config panel.
// We'll cover how to add new connections in step 7 of this tutorial.

// You can access a connection by importing the `nodes` object.
import { nodes } from "membrane";

// Go ahead and invoke the `ping` action below, then check your email! (Also check Logs 👀).
// 💡 Tip: go back to step 2 for a reminder on how to invoke an action.
export async function ping() {
  await nodes.email.send({
    subject: "Getting started with Membrane",
    body: `Hello, ${state.name}!`,
  });

  // 👋 Try uncommenting the `nodes.sms.send()` invocation below.
  // Before invoking `ping` again, configure your phone number in the Navigator by clicking "sms" then "configure".
  // await nodes.sms.send({ message: `Hello, ${state.name}!` });
}

// 💡 Note: you can only send emails and texts to yourself in Membrane right now, but that'll change in the future!
// 🔗 To learn more about connections in Membrane, visit: https://docs.membrane.io/features/connections
// 🔗 To learn more about `sms` and `email` in Membrane, visit: https://docs.membrane.io/features/email

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
// In the Navigator, click on "getting-started" then click the clock icon to the right of "ping".
// Select the type of timer you want (e.g. "Invoke after delay...") and when you want it to run (e.g. "10s").
// After clicking the green check to confirm, your timer will appear in the Config panel.
// For crons, you can see upcoming scheduled invocations by hovering over the timer.
// You can delete any timer by right clicking it and selecting "Delete".

// 🔗 To learn more about timers in Membrane, visit: https://docs.membrane.io/features/timers

/**
 * ========================================================================================================================
 * STEP 5 | Membrane HTTP endpoints
 * ========================================================================================================================
 */

// Every Membrane program comes with its own HTTP endpoint.
// You can export an `endpoint` function to expose a REST API, serve HTML, handle webhooks, etc.
// The `endpoint` function below returns a simple HTML page.
export async function endpoint(req) {
  const headers = { "Content-Type": "text/html" };
  const body = `<h1>Welcome to Membrane, ${state.name}!</h1>`;

  return JSON.stringify({ headers, body });
}

// Membrane instantly deploys your program on save, so your HTTP endpoint will be live immediately.
// To access your endpoint, right click "getting-started" in the Navigator home and select "Open endpoint URL".
// Try editing the HTML above, hit save, and refresh your endpoint URL tab.
// You have a live website that you can edit and deploy instantly!

// We are using a Membrane program HTTP endpoint to collect feedback on this tutorial:
// 🔗 https://spare-346-sector-257-manner-983-bet.hook.membrane.io
// Feel free to send us any feedback you have as you go!
// 🔗 The code for that feedback program is here: https://github.com/membrane-io/membrane-getting-started-feedback-form

// 🔗 To learn more about HTTP endpoints in Membrane, visit: https://docs.membrane.io/features/endpoints

/**
 * ========================================================================================================================
 * STEP 6 | Membrane observability
 * ========================================================================================================================
 */

// Steps 1-5 illustrate a core feature across all of Membrane: everything gets recorded in Membrane Logs.
// Every action, timer, program update (i.e. deploy on save), endpoint request, etc will be logged.

// For example, in step 5 when you open your endpoint URL in the browser, you'll see the request printed in Membrane Logs.
// Try clicking into that `endpoint` log to view more detail about the request.

// 🔗 To learn more about observability in Membrane, visit: https://docs.membrane.io/features/observability

/**
 * ========================================================================================================================
 * STEP 7 | Membrane API drivers
 * ========================================================================================================================
 */

// Similar to built-in programs like `sms` and `email`, Membrane has an ever-growing collection of API drivers.
// Drivers are Membrane programs that connect to APIs like GitHub, Google Docs, Slack, OpenAI, etc.
// The Membrane team maintains a set of open-source drivers and examples, which anyone can contribute to.
// To view and install drivers and examples, click "NEW" then "Program Registry" in the Navigator.

// Let's install the `github` driver and add it as a connection to this `getting-started` program.
// To add `github` as a connection, drag it from the Navigator home into the Connections section of the Config panel.
// 💡 Tip: a visual might be helpful here—check out our video on https://docs.membrane.io/features/connections

// Create a personal access token on GitHub and configure it by clicking `github` -> `configure` in the Navigator.
// Uncomment the function body below, add your GitHub username, and invoke the `getGitHubProfile` action.
export async function getGitHubProfile() {
  // const user = await nodes.github.users.one({ name: "[add your gh username]" }).$query("{ login name location }");
  // console.log(`${user.login} | ${user.name} | ${user.location}`);
}

// You might have recognized the GraphQL query syntax to read fields `name` and `location` from the user node you fetched.
// The `one` action returns a reference to a node in your Membrane Graph, and `.$query()` allows you to read its fields.
// We'll touch on the Membrane Graph next, in step 8.
// 🔗 To learn more about drivers in Membrane, visit: https://docs.membrane.io/concepts/drivers

/**
 * ========================================================================================================================
 * STEP 8 | The Membrane Graph
 * ========================================================================================================================
 */

// Membrane's core structure is represented as a graph, where each Membrane program is a node in your graph.
// This `getting-started` program is a node with other nodes in its subgraph, like the `ping` action.
// This program also connects to other nodes in your graph, like `email`, `sms`, and `github`.

// A Membrane program's graph is represented by its Schema.
// You can view and update your program's schema in the Config panel.
// When you update a program's schema in the Config, the program's `memconfig.json` file will automatically update.
// You should never have to manually edit `memconfig.json` nor `memconfig.lock`.

// 🔗 To learn more about the Membrane graph, visit: https://docs.membrane.io/concepts/the-graph/

/**
 * ========================================================================================================================
 * 🎉 Well done! 🎉
 *
 * Thanks for going through our getting-started tutorial!
 * We know there's a lot to wrap your head around, and we want to make learning and using Membrane _way_ simpler.
 *
 * On that note, we'd love your feedback. You can reach us:
 * 1. via this form (powered by a Membrane HTTP endpoint): https://spare-346-sector-257-manner-983-bet.hook.membrane.io
 * 2. via email: contact@membrane.io
 * 3. on Discord: https://discord.gg/sbRcqC7QxE
 *
 * Thanks!
 * - Juan & Pete
 * ========================================================================================================================
 */
