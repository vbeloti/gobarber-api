import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailtemplateProvider from '../models/IMailtemplateProvider';

class FakeMailTemplateProvider implements IMailtemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
