import { HandlerData } from "../controllers/user"

export type Route = {
    method: string
    path: string
    handler: (data: HandlerData) => Promise<void>
}