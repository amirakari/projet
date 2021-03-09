import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { BoutiqueModule } from './boutique/boutique.module';
import { ProduitModule } from './produit/produit.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { CommandeModule } from './commande/commande.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { ListefavorisModule } from './listefavoris/listefavoris.module';
import * as dotenv from 'dotenv';
import { UserEntity } from './utilisateur/entities/user.entity';
import { AbonnementEntity } from './abonnement/entities/abonnement.entity';
import { BoutiqueEntity } from './boutique/entities/boutique.entity';
import { CommandeEntity } from './commande/entities/commande.entity';
import { CommentaireEntity } from './commentaire/entities/commentaire.entity';
import { ProduitEntity } from './produit/entities/produit.entity';
import { EvaluationproduitEntity } from './evaluationproduit/entities/evaluationproduit.entity';
import { ListefavorisEntity } from './listefavoris/entities/listefavoris.entity';
import { EvaluationproduitModule } from './evaluationproduit/evaluationproduit.module';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        AbonnementEntity,
        BoutiqueEntity,
        CommandeEntity,
        CommentaireEntity,
        ProduitEntity,
        EvaluationproduitEntity,
        ListefavorisEntity,
      ],
      synchronize: false,
    }),
    UtilisateurModule,
    BoutiqueModule,
    ProduitModule,
    AbonnementModule,
    CommandeModule,
    CommentaireModule,
    ListefavorisModule,
    EvaluationproduitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
