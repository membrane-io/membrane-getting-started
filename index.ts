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
 * Welcome to Membrane! This hands-on tour will guide you through Membrane's core concepts and features.
 * To open our docs in a split view: open the command palette (cmd/ctrl+shift+p) and type "Open docs.membrane.io".
 *
 * We'd love to hear your feedback: shoot an email to contact@membrane.io with any questions/suggestions/etc.
 * Ok, let's move onto step 1!
 * ========================================================================================================================
 */

/**
 * ========================================================================================================================
 * STEP 1 | Membrane state
 * ========================================================================================================================
 */

// Each Membrane program has its own persistent storage provided by the `state` object.
// Import `state` in your program and use it to store any data specific to that program.
import { state } from "membrane";

// We'll use `state` here to store your name and a count of the updates you've made to this program.
state.name = "[add your name here]";
state.updates = state.updates ?? 0;
state.updates++;

// When you save this file, Membrane will instantly deploy and execute your program.
// Save your file and see your name and update count printed to Membrane Logs (bottombar) in the |• getting-started| tab.
console.log(`Hello, ${state.name}!`);
console.log(`Update count: ${state.updates}`);

// 🔗 To learn more about persistence in Membrane, visit: https://docs.membrane.io/features/state

/**
 * ========================================================================================================================
 * STEP 2 | Membrane actions and fields
 * ========================================================================================================================
 */

// A Membrane program can export _actions_ that you invoke. This program exports a `run` action.
// Let's invoke the `run` action, exported as a function below. Click `Invoke ►` above the fn signature.
export async function run() {
  console.log("Invoking `run` action...");
}

// Membrane programs can also export _fields_ that resolve to scalars (e.g. string/bool) or contain subfields.
// This program contains a `status` field that resolves to a string.
export function status() {
  return state.updates ? "started" : "start your engine";
}

// We'll cover adding/editing/removing a program's actions and fields (aka its schema) in step 8.
// 🔗 To learn more about actions and fields in Membrane, visit: https://docs.membrane.io/concepts/schema

/**
 * ========================================================================================================================
 * STEP 3 | Membrane `sms` and `email`
 * ========================================================================================================================
 */

// Membrane comes with a few built-in programs that your programs can use, like `sms` and `email`.
// This `getting-started` program already includes `sms` and `email` as _connections_.
// You can view CONNECTIONS in the right sidebar. We'll cover how to add new connections in step 7.

// You can access a connection by importing the `nodes` object.
import { nodes } from "membrane";

// Here we have another action, `ping`, exported as a function below. Invoke `ping` to send yourself an email.
// Note: you can only send emails to yourself in Membrane right now, but that will change in the future!
export async function ping() {
  await nodes.email.send({
    subject: "Getting started with Membrane",
    body: `Hello, ${state.name}!`,
  });

  // Membrane's `sms` program works similarly to `email`. Try uncommenting the `sms` invocation below.
  // You'll first have to configure your phone number by clicking "sms" then "configure" in the Explorer (sidebar).
  // /* 👋 HEY! Uncomment me 😃 */ await nodes.sms.send({ message: `Hello, ${state.name}!` });
}

// 🔗 To learn more about connections in Membrane, visit: https://docs.membrane.io/concepts/connections
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
// In the Navigator (left sidebar), click on "getting-started" then click the clock icon to the right of "ping".
// Select the type of timer you want (e.g. "Invoke after delay...") and when you want it to run (e.g. "10s").
// After clicking the green checkmark or pressing Enter, your timer will appear under TIMERS in the right sidebar.
// For crons, you can see upcoming scheduled invocations by hovering over the timer.
// You can delete any timer by right-clicking it and selecting "Delete".

// 🔗 To learn more about timers in Membrane, visit: https://docs.membrane.io/features/timers

/**
 * ========================================================================================================================
 * STEP 5 | Membrane HTTP endpoints
 * ========================================================================================================================
 */

// Every Membrane program comes with its own HTTP endpoint.
// You can export an `endpoint` function to expose a REST API, serve HTML, handle webhooks, etc.
// The `endpoint` function below returns a simple HTML page.
export async function endpoint({ method, path, body, headers, query }) {
  const resHeaders = { "Content-Type": "text/html" };
  const resBody = `<h1>Welcome to Membrane, ${state.name}!</h1>`;

  return JSON.stringify({ headers: resHeaders, body: resBody });
}

// As mentioned, Membrane instantly deploys your program on save, so your HTTP endpoint will be live immediately.
// Try editing the HTML, hit save, and refresh the page. Click `Open Endpoint URL ↗` above the fn signature.
// You have a live website that you can edit and deploy instantly!

// We're using a Membrane program HTTP endpoint to collect feedback on this tutorial:
// 🔗 https://spare-346-sector-257-manner-983-bet.hook.membrane.io
// 🔗 The code for that program is here: https://github.com/membrane-io/membrane-getting-started-feedback-form
// Feel free to send us any feedback you have as you go!

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
// To view and install drivers and examples, click "🔎 SEARCH" in the Navigator (top left).
// Search "membrane" to see the packages shared by our team.

// As an example, install the `membrane/github` driver and add it to your program's connections.
// To add a connection, click `+` next to CONNECTIONS in the right sidebar, or drag 'n drop a program from the Navigator.
// 🔗 For reference: https://docs.membrane.io/concepts/connections/#add-a-program-connection

// Create a personal access token on GitHub and configure it by clicking `github` -> `configure` in the Navigator.
// Uncomment the function body below and invoke the `getGitHubProfile` action to fetch your GitHub profile location.
export async function getGitHubProfile() {
  // const user = await nodes.github.users.one({ name: "[👋 add your username 👋]" }).$query("{ name location }");
  // console.log(`${user.name} | ${user.location}`);
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

// Membrane's core structure is represented as a graph, where each Membrane program is a node in the graph.
// This `getting-started` program is a node with other nodes in its subgraph, like the `ping` action.
// This program also connects to other nodes in the graph, like `email`, `sms`, and `github`.

// A Membrane program's graph is represented by its Schema.
// You can view and update your program's schema in the right sidebar under SCHEMA.
// When you update a program's schema in the explorer, the program's `memconfig.json` file will automatically update.
// You should rarely have to manually edit `memconfig.json` and never `memconfig.lock`.

// 🔗 To learn more about the Membrane graph, visit: https://docs.membrane.io/concepts/the-graph/

/**
 * ========================================================================================================================
 * 🎉 Well done! 🎉
 *
 * Thanks for going through our tutorial!
 * We know there's a lot to wrap your head around, and we want to make learning and using Membrane _way_ simpler.
 *
 * On that note, we'd love your feedback. You can reach us:
 * 1. via this form (powered by a Membrane HTTP endpoint): https://spare-346-sector-257-manner-983-bet.hook.membrane.io
 * 2. via email: contact@membrane.io
 * 3. on Discord: https://discord.gg/sbRcqC7QxE
 *
 * Thanks!
 * ========================================================================================================================
 */
