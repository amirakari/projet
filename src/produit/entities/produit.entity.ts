import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { BoutiqueEntity } from '../../boutique/entities/boutique.entity';
import { CommentaireEntity } from '../../commentaire/entities/commentaire.entity';
import { EvaluationproduitEntity } from '../../evaluationproduit/entities/evaluationproduit.entity';
import { CommandeEntity } from '../../commande/entities/commande.entity';
import { ListefavorisEntity } from '../../listefavoris/entities/listefavoris.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import { BoutiqueDomaineEnum } from '../../enums/boutique.domaine.enum';
import { ProduitCategorieEnum } from '../../enums/produit.categorie.enum';
@Entity('produit')
export class ProduitEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: ProduitCategorieEnum })
  categorie: string;
  @Column()
  DLC: Date;
  @Column()
  nom: string;
  @Column()
  codeabare: number;
  @Column()
  prixsansremise: number;
  @Column()
  prixavecremise: number;
  @PrimaryColumn()
  @Column({
    unique: true,
  })
  reference: string;
  @ManyToOne((type) => BoutiqueEntity, (boutique) => boutique.produits, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  boutique: BoutiqueEntity;
  @OneToMany(
    (type) => CommentaireEntity,
    (commentaire) => commentaire.produit,
    {
      cascade: true,
      nullable: true,
    },
  )
  commentaires: CommentaireEntity[];
  @OneToMany(
    (type) => EvaluationproduitEntity,
    (evaluationproduit) => evaluationproduit.produit,
    {
      cascade: true,
      nullable: true,
    },
  )
  evaluationsproduits: EvaluationproduitEntity[];
  @OneToMany((type) => CommandeEntity, (commande) => commande.produit, {
    cascade: true,
    nullable: true,
  })
  commandes: CommandeEntity[];
  @ManyToOne(
    (type) => ListefavorisEntity,
    (listefavoris) => listefavoris.produits,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true,
    },
  )
  listefavoris: ListefavorisEntity;
}
