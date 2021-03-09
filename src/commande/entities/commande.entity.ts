import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoutiqueEntity } from '../../boutique/entities/boutique.entity';
import { CommentaireEntity } from '../../commentaire/entities/commentaire.entity';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { ProduitEntity } from '../../produit/entities/produit.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
@Entity('commande')
export class CommandeEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: Date;
  @Column()
  quantite: number;
  @ManyToOne((type) => UserEntity, (user) => user.commandes, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  user: UserEntity;
  @ManyToOne((type) => ProduitEntity, (produit) => produit.commandes, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  produit: ProduitEntity;
}
