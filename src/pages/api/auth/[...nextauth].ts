import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: `${GOOGLE_CLIENT_ID}`,
      clientSecret: `${GOOGLE_CLIENT_SECRET}`,
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_ID}`,
      clientSecret: `${process.env.FACEBOOK_SECRET}`,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
});
