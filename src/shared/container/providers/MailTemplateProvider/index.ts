import { container } from 'tsyringe';
import IMailtemplateProvider from './models/IMailtemplateProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailtemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
