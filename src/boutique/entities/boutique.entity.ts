import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { ProduitEntity } from '../../produit/entities/produit.entity';
import { AbonnementEntity } from '../../abonnement/entities/abonnement.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { UserTypeEnum } from '../../enums/user.type.enum';
import { BoutiqueDomaineEnum } from '../../enums/boutique.domaine.enum';
@Entity('boutique')
export class BoutiqueEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nom: string;
  @Column()
  adresse: string;
  @Column()
  photo: string;
  @Column()
  horaire: string;
  @Column()
  visite: string;
  @PrimaryColumn()
  @Column({
    unique: true,
  })
  mailprofessionnelle: string;
  @Column({ type: 'enum', enum: BoutiqueDomaineEnum })
  domaine: string;
  @ManyToOne((type) => UserEntity, (user) => user.boutiques, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  user: UserEntity;
  @OneToMany((type) => ProduitEntity, (produit) => produit.boutique, {
    cascade: true,
    nullable: true,
  })
  produits: ProduitEntity[];
  @OneToMany((type) => AbonnementEntity, (abonnement) => abonnement.boutique, {
    cascade: true,
    nullable: true,
  })
  abonnements: AbonnementEntity[];
}
