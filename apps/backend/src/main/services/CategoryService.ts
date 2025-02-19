import { CategoryRepository } from "../repository/CategoryRepository"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async getAllAsync() {
    return this.categoryRepository.getAllAsync()
  }
}
