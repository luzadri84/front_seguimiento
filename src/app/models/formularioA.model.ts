import { Proponente } from "./proponente.model";
import { Proyecto } from "./proyecto.model";

export class FormularioA {
    constructor(
        public proponente: Proponente,
        public proyecto: Proyecto
    ){}
}