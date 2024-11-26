import { expect, describe, it, beforeEach, vi, afterEach }  from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInHistoryUseCase(checkInsRepository)

        // await gymsRepository.create({
        //     id: 'gym-01',
        //     title: 'JS Gym',
        //     description: '',
        //     phone: '',
        //     latitude: -27.2092052,
        //     longitude: -49.6401091,
        // })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to fetch check-in history", async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
            validated_at: new Date()
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
            validated_at: new Date()
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' }),
        ])
    })

    it("should be able to fetch paginated check-in history", async () => {
       for(let i = 1; i<=22; i++) {
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
                validated_at: new Date()
            })
       }

        
        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' }),
        ])
    })
})
