import { Module } from '@nestjs/common';
import { EvaluationproduitController } from './evaluationproduit.controller';
import { EvaluationproduitService } from './evaluationproduit.service';

@Module({
  controllers: [EvaluationproduitController],
  providers: [EvaluationproduitService]
})
export class EvaluationproduitModule {}
