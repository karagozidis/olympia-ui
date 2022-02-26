export class MasterPanel {
    public pkid: number;
    public memberid: number;
    public settingsid: number;
    public name: string;
    public adminPassword: string;
    public techInfo: string;
    public techTelephone: string;
    public modbusByPanel: string;
    public isSystem: number;
    public member: any;
    public dimmingTimers: [];
    public faultsHistories: [];
    public floorPlans: [];
    public gateways: [];
    public keyValues: [];
    public modbusDevs: [];
    public receivedEvents: [];
    public uidDevs: [];
}
