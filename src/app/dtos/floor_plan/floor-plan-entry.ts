import {MasterPanel} from './master-panel';

export class FloorPlanEntry {
    public pkid: number;
    public masterPanelid: number;
    public isSystem: number;
    public forder: number;
    public name: string;
    public width: number;
    public height: number;
    public backimage: string;
    public code: string;
    public masterPanel: MasterPanel;
    public floorPlanDets: [];
    public image;
}
