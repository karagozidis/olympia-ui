import {Component, OnInit, Renderer2, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ROUTES} from '../../sidebar/sidebar.component';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {LoadingService} from '../../services/system/loading.service';
import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {ListSearchService} from '../../services/system/list-search.service';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
    private listTitles: any[];
    public sidebarVisibleForDesktop: boolean;
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    public isCollapsed = true;
    @ViewChild('navbar-cmp', {static: false}) button;

    public progressBarInterval;
    public progressBarPercentage = 0;

    constructor(location: Location,
                private renderer: Renderer2,
                private element: ElementRef,
                private loadingService: LoadingService,
                private router: Router,
                private http: HttpClient,
                private listSearchService: ListSearchService,
                config: NgbProgressbarConfig) {
        config.striped = true;
        config.animated = true;

        this.location = location;
        this.sidebarVisibleForDesktop = true;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
        });
        this.listenToLoading();
    }

    startProgressBar() {
        this.stopProgressBar();
        this.progressBarInterval = setInterval(() => {
            if (this.progressBarPercentage < 40) {
                this.progressBarPercentage += 8;
            } else if (this.progressBarPercentage < 60) {
                this.progressBarPercentage += 3;
            } else if (this.progressBarPercentage < 100) {
                this.progressBarPercentage += 1;
            }
        }, 800);
    }

    stopProgressBar() {
        if ( this.progressBarInterval) {
            clearInterval(this.progressBarInterval);
            if (this.progressBarPercentage > 0) { this.progressBarPercentage = 100; }
             setTimeout( () => {
                 if (this.progressBarPercentage === 100) { this.progressBarPercentage = 0; }
             }, 400);
        }
    }

    ngOnDestroy(): void {
        this.stopProgressBar();
    }

    listenToLoading(): void {
        this.loadingService.loadingSub
            .pipe(delay(0))
            .subscribe((loading) => {
                if (loading) {
                    console.log(loading);
                    this.startProgressBar();
                } else {
                    console.log(loading);
                    this.stopProgressBar();
                }
            });
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    updateToggle() {
        if (this.sidebarVisibleForDesktop === true) {
            this.renderer.addClass(document.body, 'sidebar-mini');
            this.sidebarVisibleForDesktop = false;
        } else {
            this.renderer.removeClass(document.body, 'sidebar-mini');
            this.sidebarVisibleForDesktop = true;
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');
        if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
        }
        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
        if (window.innerWidth < 991) {
            setTimeout(function () {
                if (mainPanel !== undefined && mainPanel.style !== undefined) {
                    mainPanel.style.position = '';
                }
            }, 500);
        }
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    collapse() {
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('bg-white');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('bg-white');
        }
    }

    setLanguage(en: string) {
    }

    logout() {
        localStorage.removeItem('login_data');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/pages/login']);
    }

    searchKeyDown(event: KeyboardEvent, value: string) {
        if (event.key === 'Enter') {
            this.listSearchService.listSearchEmmiter.emit(value);
        }
    }
}
