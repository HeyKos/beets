import { Auditable } from "interfaces/auditable";

interface Track extends Auditable {
    name: string;
    mute: boolean;
    solo: boolean;
    pan: number;
    /**
     * Note:
     * This is a Foreign Key to `projects.id`.<fk table='projects' column='id'/>
     */
    project_id: string;
    volume: number;
}

export type { Track };
