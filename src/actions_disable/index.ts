import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";
import { z } from 'astro:schema';
import { Redis } from "@upstash/redis";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const resendEmail = import.meta.env.RESEND_EMAIL;
const fromEmail = import.meta.env.FROM_EMAIL;

// Initialize Redis with Upstash
const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 30; // seconds
const MAX_REQUESTS = 1; // requests allowed in the window

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(3, "First name is required").max(30, "First name must be at most 30 characters"),
      lastname: z.string().min(3, "Last name is required").max(30, "Last name must be at most 30 characters"),
      email: z.string().email("Invalid email address"),
      subject: z.string().min(3, "Subject is required").max(30, "Subject must be at most 30 characters"),
      message: z.string().min(10, "Message must be at least 10 characters").max(300, "Message must be at most 300 characters"),
      company: z.string().optional(), // Honeypot field
    }),
    handler: async ({ name, lastname, email, subject, message, company }, context) => {

      // 1. Honeypot check
      if (company) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Invalid submission detected",
        });
      }

      // 2. Rate limiting with Redis
      const ip = context.request.headers.get("x-forwarded-for") ||
        context.request.headers.get("x-real-ip") ||
        "unknown";

      const rateLimitKey = `rate_limit:contact:${ip}`;

      try {
        // Get the current counter
        const current = await redis.get<number>(rateLimitKey);

        if (current !== null && current >= MAX_REQUESTS) {
          // Get the remaining time until the key expires
          const ttl = await redis.ttl(rateLimitKey);

          throw new ActionError({
            code: "TOO_MANY_REQUESTS",
            message: `Please wait ${ttl} seconds before sending another message`,
          });
        }

        // Increment the counter
        const newCount = await redis.incr(rateLimitKey);

        // If it's the first request, set the TTL
        if (newCount === 1) {
          await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
        }

      } catch (error) {
        // If it's our ActionError of rate limit, re-throw it
        if (error instanceof ActionError) {
          throw error;
        }
        // If it's another Redis error (connection, etc), log it but continue
        console.error("Redis connection error:", error);
      }

      // 3. Send email
      const { data, error } = await resend.emails.send({
        from: resendEmail,
        to: fromEmail,
        subject: `${subject} - Contact from ${name} ${lastname}`,
        html: `
              <h2>New Contact Message</h2>
              <p><strong>Name:</strong> ${name} ${lastname}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        text: `New Contact Message\n\nName: ${name} ${lastname}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email. Please try again later.",
        });
      }

      return { success: true, message: "Email sent successfully!", data: data.id };
    },
  }),
};
