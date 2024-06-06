import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './modules/news/news.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { BenefitModule } from './modules/benefit/benefit.module';
import dbConfig from './config/dbConfig';
import { EventModule } from './modules/event/event.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { VolunteerModule } from './modules/volunteer/volunteer.module';
import { MercadoPagoModule } from './modules/mercado-pago/mp.module';
import { StorageModule } from './modules/storage/storage.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { DonationModule } from './modules/donation/donation.module';
import { WorkshopModule } from './modules/workshop/workshop.module';
import { User } from './entities/User.entity';
import { Donation } from './entities/Donation.entity';
import { Event } from './entities/Event.entity';
import { News } from './entities/News.entity';
import { Role } from './entities/Role.entity';
import { Sponsor } from './entities/Sponsor';
import { CommunityKitchensModule } from './modules/communityKitchens/communityKitchens.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { PartnerModule } from './modules/partner/partner.module';
import { CardModule } from './modules/card/card.module';
import { Workshop } from './entities/Workshop.entity';
import { Volunteer } from './entities/Volunteer.entity';
import { Benefit } from './entities/Benefit.entity';
import { CommunityKitchens } from './entities/CommunityKitchens.entity';
import { SubsModule } from './modules/subs/subs.module';
import { ExternalUser } from './entities/ExternalUser.entity';
import { ExternalUsersModule } from './modules/externalUsers/externalUsers.module';
import { ExternalUsersRepository } from './modules/externalUsers/externalUsers.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ExternalUser,
      Donation,
      Event,
      News,
      Role,
      Sponsor,
      Workshop,
      Volunteer,
      Benefit,
      CommunityKitchens,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('dbConfig'),
    }),

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    NewsModule,
    SponsorModule,
    BenefitModule,
    EventModule,
    ExternalUsersModule,
    UsersModule,
    AuthModule,
    MailerModule,
    MercadoPagoModule,
    StorageModule,
    VolunteerModule,
    DonationModule,
    WorkshopModule,
    CommunityKitchensModule,
    ProposalsModule,
    PartnerModule,
    CardModule,
    SubsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
