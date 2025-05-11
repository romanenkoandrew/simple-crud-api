import { IncomingMessage, ServerResponse } from "node:http"

export type Route = {
    method: string;
    path: string;
    handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
}