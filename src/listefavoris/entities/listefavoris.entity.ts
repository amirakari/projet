import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProduitEntity } from '../../produit/entities/produit.entity';
import { BoutiqueEntity } from '../../boutique/entities/boutique.entity';
import { UserEntity } from '../../utilisateur/entities/user.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
@Entity('listefavoris')
export class ListefavorisEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany((type) => ProduitEntity, (produit) => produit.listefavoris, {
    cascade: true,
    nullable: true,
  })
  produits: ProduitEntity[];
  @OneToOne((type) => UserEntity, (user) => user.listefavoris, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  user: UserEntity[];
}
