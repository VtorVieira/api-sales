import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    const parseTempate = handlebars.compile(templateFileContent);

    return parseTempate(variables);
  }
}
