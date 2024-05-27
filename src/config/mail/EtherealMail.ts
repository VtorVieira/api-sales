import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}
interface ISendEmail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    console.log('account', account);

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Sale Team',
        address: from?.email || 'equipe@sales.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
