import IMailtemplateProvider from '../models/IMailtemplateProvider';

class FakeMailTemplateProvider implements IMailtemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeMailTemplateProvider;
