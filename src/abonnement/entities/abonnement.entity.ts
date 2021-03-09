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
import { BoutiqueEntity } from '../../boutique/entities/boutique.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { BoutiqueDomaineEnum } from '../../enums/boutique.domaine.enum';
import { AbonnementDurEEnum } from '../../enums/abonnement.durée.enum';
import { AbonnementStatusEnum } from '../../enums/abonnement.status.enum';
@Entity('abonnement')
export class AbonnementEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: AbonnementDurEEnum })
  durée: string;
  @Column({ type: 'enum', enum: AbonnementStatusEnum })
  status: string;
  @Column()
  prix: number;
  @ManyToOne((type) => BoutiqueEntity, (boutique) => boutique.abonnements, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  boutique: BoutiqueEntity;
}
