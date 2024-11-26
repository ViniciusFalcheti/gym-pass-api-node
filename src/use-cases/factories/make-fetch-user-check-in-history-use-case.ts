import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

    return useCase
}