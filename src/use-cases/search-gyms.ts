import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface SearchGymUseCaseRequest {
    query: string
    page: number
}

interface SearchGymUseCaseResponse {
    gyms: Gym[]
}


export class SearchGymUseCase {
    constructor(private GymsRepository: GymsRepository ) {}

    async execute({ query, page }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
   
        const gyms = await this.GymsRepository.searchMany( query, page )

        return {
            gyms
        }
    
    }

}
