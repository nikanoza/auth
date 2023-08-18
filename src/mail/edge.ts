import { Edge } from "edge.js";
import path, { join } from "path";
import gmailTransport from "./index";
import dotenv from "dotenv";

dotenv.config();

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const send = (to: string, subject: string, html: any) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };

  return gmailTransport.sendMail(options);
};

export const sendVerificationLink = async (
  to: string,
  name: string,
  link: string
) => {
  const html = edge.renderSync("verify", {
    name,
    link,
  });

  return send(to, "Verify Email", html);
};
