import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt: ({token, account })=> {
        if (account?.access_token) {
          token.access_token = account.access_token;
        }
        return token;
    },
    async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        session.access_token = token.access_token
        session.user.id = token.id
        return session
    }
    },
});

export { handler as GET, handler as POST };