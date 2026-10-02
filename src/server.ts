import Fastify from "fastify";
import {z, ZodError} from 'zod'
import { eventosRoutes } from "./routes/eventos-routes";

const app = Fastify({logger: true})

app.register(eventosRoutes)

app.get('/health', async ()=>{
    return {status: 'ok', time: new Date().toISOString()}
})

app.get('/hello/:name', async(req)=>{
    const paramSchema = z.object({name: z.string().min(3)})
    const {name} = paramSchema.parse(req.params)
    return { mensagem: `Olá, ${name}!` }
})

app.setErrorHandler((error, req, rep)=>{
    if(error instanceof ZodError){
        return rep.status(400).send({erro: 'Dados inválidos', detalhes: error.issues})
    }
    req.log.error(error)
    return rep.status(500).send({erro: 'Erro interno do servidor'})
})

app.listen({port: 3333}).then(()=>{
    console.log('API rodando em http://localhost:3333')
})
