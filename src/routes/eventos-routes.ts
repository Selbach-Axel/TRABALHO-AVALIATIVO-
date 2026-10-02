import { FastifyInstance } from "fastify";
import {z} from 'zod';
import {prisma} from '../lib/prisma'

const eventoSchema = z.object({
    titulo: z.string().min(3),
    local: z.string().min(2),
    data: z.coerce.date(),
    vagas: z.number().int().positive()
})

export async function eventosRoutes(app:FastifyInstance){
    app.get('/eventos', async ()=>{
        return prisma.evento.findMany({orderBy: {data: 'asc'}})
    })

    app.post('/eventos', async (req, rep)=>{
        const dados = eventoSchema.parse(req.body)
        const evento = await prisma.evento.create({data: dados})
        return rep.status(201).send(evento)
    })
}