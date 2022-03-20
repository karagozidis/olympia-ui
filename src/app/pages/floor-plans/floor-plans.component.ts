import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FloorPlanService} from '../../services/crud/floor-plan.service';
import {FloorPlanEntry} from '../../dtos/floor_plan/floor-plan-entry';
import {DomSanitizer} from '@angular/platform-browser';
import html2canvas from 'html2canvas';

class Node {
    id;
    code;
    name;
    cssPosition: String;
    userDragged: false;
    cssClass;
    position: Position;
    type;
    icon;
    color;

    constructor() {
        this.id = 0;
        this.code = '';
        this.cssPosition = '';
        this.userDragged = false;
        this.cssClass = '';
        this.position = new Position();
        this.type = '';
        this.icon = '';
        this.color = '';
    }
}

class Position {
    top;
    left;
}

@Component({
    'selector': 'app-floor-plans',
    'templateUrl': './floor-plans.component.html',
    'styleUrls': ['./floor-plans.component.css']
})
export class FloorPlansComponent implements OnInit {
    test = '';
    private floorPlanEntries: FloorPlanEntry[];
    private curFloorPlanEntry: FloorPlanEntry = null;
    url;
    devices: Node[] = [];
    startDragEvent: DragEvent = null;
    startDragNode = null;

    @ViewChild('screen') screen: ElementRef;
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('downloadLink') downloadLink: ElementRef;

    @ViewChild('canvas2') canvas2: ElementRef;

    constructor(private service: FloorPlanService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {

        document.addEventListener('dragover', function (event) {
            event.preventDefault();
        }, false);

        this.service.getFullObjs().subscribe(data => {
            this.floorPlanEntries = data;
            console.log(this.floorPlanEntries);
            if (this.floorPlanEntries.length > 0) {
                this.curFloorPlanEntry = this.floorPlanEntries[0];
            }
        });
    }

    downloadImage() {
        html2canvas(this.screen.nativeElement).then(canvas => {
            this.canvas.nativeElement.src = canvas.toDataURL();
            this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
            this.downloadLink.nativeElement.download = 'marble-diagram.png';
            this.downloadLink.nativeElement.click();
        });
    }

    // constructor(private service: FloorPlanService,
    //             private pservice: PersonService,
    //             private sanitizer: DomSanitizer) {
    //
    //     const appConfig = [];
    //     appConfig['serverUrl'] = 'https://192.168.1.109:8096/api';
    //     appConfig['theme'] = '#ef8157';
    //     appConfig['language'] = 'de';
    //
    //     localStorage.setItem('app_config', JSON.stringify(appConfig));
    //     localStorage.setItem('server_url', 'https://192.168.1.109:8096/api');
    //
    // }
    //
    // ngOnInit(): void {
    //
    //     document.addEventListener('dragover', function( event ) {
    //         event.preventDefault();
    //     }, false);
    //
    //     this.pservice.login('admin', 'adminadmin').subscribe(
    //         pdata => {
    //
    //             localStorage.setItem('login_data', pdata);
    //             localStorage.setItem('login_data', pdata);
    //             localStorage.setItem('token', pdata['token']);
    //             localStorage.setItem('refreshToken', pdata['refreshToken']);
    //
    //             this.service.getFullObjs().subscribe(data => {
    //                 this.floorPlanEntries = data;
    //                 console.log(this.floorPlanEntries);
    //                 if (this.floorPlanEntries.length > 0) {
    //                     this.curFloorPlanEntry = this.floorPlanEntries[0];
    //                 }
    //             });
    //         });
    // }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (evnt: ProgressEvent<FileReader>) => {
                this.url = evnt.target.result;
                alert(this.url);
            }
        }
    }

    trustImageResource(backimage) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + backimage);
    }

    edit(floorPlanEntry: FloorPlanEntry) {
        this.curFloorPlanEntry = floorPlanEntry;
    }

    saveNew() {
    }

    onDragStart(event: DragEvent, node: Node) {
        this.startDragEvent = event;
        this.startDragNode = node;
    }

    onDragEnd(event: DragEvent) {
        event.preventDefault();
        if (this.startDragEvent == null || this.startDragNode == null) {
            return;
        }

        const xDiff = this.startDragEvent.clientX - event.clientX;
        const yDiff = this.startDragEvent.clientY - event.clientY;

        this.startDragNode.position.top = this.startDragNode.position.top - yDiff;
        this.startDragNode.position.left = this.startDragNode.position.left - xDiff;

        this.startDragNode.cssPosition = 'left:' + this.startDragNode.position.left + 'px; top:' + this.startDragNode.position.top + 'px;';


        this.startDragEvent = null;
        this.startDragNode = null;
    }

    addWirelessIo() {
        const node = new Node();
        node.id = 207;
        node.code = 'Wireless Io';
        node.name = 'Wireless Io Id';
        node.cssPosition = 'left: 30px; top: 30px;'
        node.position.left = 30;
        node.position.top = 30;
        node.type = 'WirelessIo';
        node.icon = 'fas fa-wifi';
        node.color = 'border: 4px solid #585fb9;';
        this.devices.push(node);
    }

    addGateway() {
        const node = new Node();
        node.id = 207;
        node.code = 'Gateway';
        node.name = 'Gateway Id';
        node.cssPosition = 'left: 30px; top: 30px;'
        node.position.left = 30;
        node.position.top = 30;
        node.type = 'Gateway';
        node.icon = 'fas fa-ethernet';
        node.color = 'border: 4px solid #518ece;';
        this.devices.push(node);
    }

    addLuminaire() {
        const node = new Node();
        node.id = 207;
        node.code = 'Luminaire';
        node.name = 'Luminaire Id';
        node.cssPosition = 'left: 30px; top: 30px;'
        node.position.left = 30;
        node.position.top = 30;
        node.type = 'Luminaire';
        node.icon = 'fab fa-asymmetrik';
        node.color = 'border: 4px solid #4e9147;';
        this.devices.push(node);
    }

    addExtender() {
        const node = new Node();
        node.id = 207;
        node.code = 'Extender';
        node.name = 'Extender Id';
        node.cssPosition = 'left: 30px; top: 30px;'
        node.position.left = 30;
        node.position.top = 30;
        node.type = 'Extender';
        node.icon = 'fas fa-bezier-curve';
        node.color = 'border: 4px solid #b26fb3;';
        this.devices.push(node);
    }

    removeDevice(node: Node) {
        this.devices = this.devices.filter(item => item !== node);
    }

    print() {
        console.log(this.screen);
        html2canvas(this.screen.nativeElement).then(canvas => {

            this.canvas.nativeElement.src = canvas.toDataURL();
            this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
            this.downloadLink.nativeElement.download = 'marble-diagram.png';
            this.downloadLink.nativeElement.click();
        });
        // const element = document.createElement('a');
        // const myJSON = 'Helloooooo!!';
        // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(myJSON));
        // element.setAttribute('download', 'rmt.json');
        // element.style.display = 'none';
        // document.body.appendChild(element);
        // element.click();
        // document.body.removeChild(element);

        // window.print();
    }

    // print() {
    //         const ctx = this.canvas2.nativeElement.getContext('2d');
    //         const image = new Image();
    //         image.onload = function() {
    //             ctx.drawImage(image, 0, 0);
    //         };
    //         image.src = 'data:image/png;base64,' + this.curFloorPlanEntry.backimage;
    //         this.downloadLink.nativeElement.href = this.canvas2.nativeElement.toDataURL('image/png');
    //         this.downloadLink.nativeElement.download = 'diagram.png';
    //         this.downloadLink.nativeElement.click();
    // }

}
