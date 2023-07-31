import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ItemAddedModule } from './item-added/item-added.module';
import { SecretDataModule } from './secret-data/secret-data.module';
import { MongoModule } from './mongo/mongo.module';
import { CombinedDataModule } from './combined-data/combined-data.module';

@Module({
  imports: [
    ItemAddedModule,
    SecretDataModule,
    MongoModule,
    EmailModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      template: {
        dir: join(__dirname, 'email'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    CombinedDataModule,
  ],
  providers: [],
})
export class AppModule {}
