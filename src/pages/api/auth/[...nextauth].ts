import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export default NextAuth({
  // Configure one or more authentication providers
  providers:
    process.env.VERCEL_ENV === "preview"
      ? [
          CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: {
                label: "Username",
                type: "text",
                placeholder: "jsmith",
              },
              password: { label: "Password", type: "password" },
            },
            async authorize() {
              return {
                id: 1,
                name: "J Smith",
                email: "jsmith@example.com",
                image:
                  "https://lh3.googleusercontent.com/a/AATXAJwCDUo1jIT5HDujh9XXrPfV-1Vnj64VvCtSu7MQUrE=s96-c",
              };
            },
          }),
        ]
      : [
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
  secret: process.env.SECRET,
});
