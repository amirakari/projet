import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProduitEntity } from '../../produit/entities/produit.entity';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
@Entity('EvaluationProduit')
export class EvaluationproduitEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  note: number;
  @ManyToOne(
    (type) => ProduitEntity,
    (produit) => produit.evaluationsproduits,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true,
    },
  )
  produit: ProduitEntity;
  @ManyToOne((type) => UserEntity, (user) => user.evaluationproduit, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  user: UserEntity;
}
