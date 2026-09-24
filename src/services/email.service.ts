import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import HbsTransporter from "nodemailer-express-handlebars"; // если пока не нужно, можно закомментировать

import { configs } from "../configs/configs";
import { emailConstants } from "../constants/emailConstants";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailTypeToPayload } from "../types/email-type-to-payload.type";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD,
            },
        });

        this.transporter.use(
            "compile",
            HbsTransporter({
                viewEngine: {
                    extname: ".hbs",
                    partialsDir: path.join(
                        process.cwd(),
                        "src",
                        "templates",
                        "partials",
                    ),
                    layoutsDir: path.join(
                        process.cwd(),
                        "src",
                        "templates",
                        "layouts",
                    ),
                },
                viewPath: path.join(process.cwd(), "src", "templates", "views"),
                extName: ".hbs",
            }),
        );
    }

    public async sendMail<T extends EmailTypeEnum>(
        to: string,
        type: T,
        context: EmailTypeToPayload[T],
    ): Promise<void> {
        try {
            const { subject, template } = emailConstants[type];

            const options = {
                to,
                subject,
                template,
                context: { ...context, frontUrl: configs.FRONT_URL },
            };
            await this.transporter.sendMail(options);
        } catch (e) {
            console.error("Email sending error:", e);
        }
    }
}

export const emailService = new EmailService();
