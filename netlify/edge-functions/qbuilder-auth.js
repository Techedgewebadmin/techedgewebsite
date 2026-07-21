export default async (request, context) => {
  const auth = request.headers.get("authorization");

  if (auth && auth.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const sepIndex = decoded.indexOf(":");
    const user = decoded.slice(0, sepIndex);
    const pass = decoded.slice(sepIndex + 1);

    const validUser = Netlify.env.get("QBUILDER_USER");
    const validPass = Netlify.env.get("QBUILDER_PASS");

    if (validUser && validPass && user === validUser && pass === validPass) {
      return context.next();
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Techedge Internal Tools"',
    },
  });
};

export const config = { path: "/qbuilder.html" };
