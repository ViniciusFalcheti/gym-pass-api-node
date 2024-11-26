import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-In"
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase() {
    const checkInsRepository = new PrimaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}