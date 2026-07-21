export default async (request, context) => {
  const auth = request.headers.get("authorization");
  const validUser = Netlify.env.get("QBUILDER_USER");
  const validPass = Netlify.env.get("QBUILDER_PASS");

  if (auth && auth.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const sepIndex = decoded.indexOf(":");
    const user = decoded.slice(0, sepIndex);
    const pass = decoded.slice(sepIndex + 1);

    if (validUser && validPass && user === validUser && pass === validPass) {
      return context.next();
    }
  }

  // TEMPORARY diagnostic — reveals only whether the env vars are reachable
  // (true/false), never their actual values. Remove once auth is confirmed working.
  const debug = new URL(request.url).searchParams.get("debug") === "1";
  const body = debug
    ? `Authentication required\n\nDEBUG (temporary):\nQBUILDER_USER reachable: ${!!validUser}\nQBUILDER_PASS reachable: ${!!validPass}`
    : "Authentication required";

  return new Response(body, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Techedge Internal Tools"',
    },
  });
};

export const config = { path: "/qbuilder.html" };
