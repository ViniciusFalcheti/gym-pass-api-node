import { expect, describe, it, beforeEach }  from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)
    })

    it("should be able to search for gyms", async () => {
        await gymsRepository.create({
            title: 'JS Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        await gymsRepository.create({
            title: 'TS Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        const { gyms } = await sut.execute({
            query: 'JS',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JS Gym' }),
        ])
    })

    it("should be able to fetch paginated gym search", async () => {
       for(let i = 1; i<=22; i++) {
        await gymsRepository.create({
            title: `JS Gym ${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })
       }

        
        const { gyms } = await sut.execute({
            query: 'JS',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JS Gym 21' }),
            expect.objectContaining({ title: 'JS Gym 22' }),
        ])
    })
})
