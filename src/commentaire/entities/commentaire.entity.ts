import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoutiqueEntity } from '../../boutique/entities/boutique.entity';
import { ProduitEntity } from '../../produit/entities/produit.entity';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
@Entity('commentaire')
export class CommentaireEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @Column()
  nbrelike: number;
  @Column()
  nbredislike: number;
  @Column()
  nbreemojis: number;
  @ManyToOne((type) => ProduitEntity, (produit) => produit.commentaires, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  produit: ProduitEntity;
  @ManyToOne((type) => UserEntity, (user) => user.commentaires, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  user: UserEntity;
}
